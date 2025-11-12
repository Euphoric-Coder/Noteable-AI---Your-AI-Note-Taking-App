import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action, internalQuery } from "./_generated/server.js";
import { api } from "./_generated/api.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

// Define an internal query that performs the actual database access
export const pdfCount = internalQuery({
  handler: async (ctx) => {
    // Here you can use ctx.db to query the database
    const fileCount = await ctx.db.query("pdfFiles").count();

    return fileCount;
  },
});

export const ingest = action({
  args: {
    docOutput: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    // Retrieve the API key securely from Convex Environment
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in Convex environment.");
    }

    await ConvexVectorStore.fromTexts(
      args.docOutput,
      { fileId: args.fileId },
      new GoogleGenerativeAIEmbeddings({
        apiKey,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
    return "completed";
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey)
      throw new Error("Missing GEMINI_API_KEY in Convex environment.");

    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    // Fetch all chunks (for global search context)
    const allChunks = await ctx.runQuery(api.files.getAllChunks);

    // Fetch chunks belonging to this fileId
    const fileChunks = await ctx.runQuery(api.files.getFileChunks, {
      fileId: args.fileId,
    });

    console.log(`📄 Total Chunks in DB: ${allChunks.length}`);
    console.log(`📁 Chunks for FileID ${args.fileId}: ${fileChunks.length}`);

    if (!fileChunks || fileChunks.length === 0) {
      console.warn(`⚠️ No chunks found for fileId: ${args.fileId}`);
      return JSON.stringify({
        fileId: args.fileId,
        context: "",
        chunkCount: 0,
        message: "No chunks found for this fileId.",
      });
    }

    // Perform semantic similarity search across ALL chunks
    const searchResults = await vectorStore.similaritySearchWithScore(
      args.query,
      allChunks.length
    );

    console.log(searchResults);

    console.log(
      `🔍 Search for "${args.query}" → ${searchResults.length} total matches`
    );

    // Filter for this fileId
    const relevant = searchResults.filter(
      ([doc, score]) => doc.metadata?.fileId === args.fileId && score > 0.51
    );

    console.log(`🎯 Relevant Chunks Found: ${relevant.length}`);

    // If no relevant chunks, fall back to all chunks of this file
    const finalChunks = relevant.length
      ? relevant
      : fileChunks.map((c) => [c, 0]);

    // Rank and map into a uniform structure
    const ranked = finalChunks
      .map(([doc, score]) => ({
        text: doc.pageContent || doc.text || "",
        score: score ?? 0,
        fileId: doc.metadata?.fileId || args.fileId,
      }))
      .sort((a, b) => b.score - a.score);

    // Combine top chunks into a single context string
    const combinedText = ranked.map((r) => r.text.trim()).join("\n\n");
    const safeText =
      combinedText.length > 40000 ? combinedText.slice(0, 40000) : combinedText;

    console.log("Ranked Chunks:", ranked);

    console.log(
      `🧩 RAG context built for fileId ${args.fileId} | ${ranked.length} chunks | ${safeText.length} chars`
    );

    return JSON.stringify({
      fileId: args.fileId,
      chunkCount: ranked.length,
      context: safeText,
    });
  },
});
