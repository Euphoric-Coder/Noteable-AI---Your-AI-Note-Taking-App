import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action, internalQuery } from "./_generated/server.js";
import { api, internal } from "./_generated/api.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { jsonToConvex, v } from "convex/values";

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

    // ✅ FIX: Fetch file chunks through runQuery
    const allChunks = await ctx.runQuery(api.files.getFileChunks, {
      fileId: args.fileId,
    });

    if (!allChunks || allChunks.length === 0) {
      console.warn(`⚠️ No chunks found for fileId: ${args.fileId}`);
      return JSON.stringify({
        fileId: args.fileId,
        context: "",
        chunkCount: 0,
        message: "No chunks found for this fileId.",
      });
    }

    // Perform similarity search
    const searchResults = await vectorStore.similaritySearch(
      args.query,
      allChunks.length
    );

    console.log(
      `🔍 Search for "${args.query}" | Found ${searchResults.length} chunks out of ${allChunks.length} total chunks for fileId ${args.fileId}`
    );

    const relevant = searchResults.filter(
      (r) => r.metadata?.fileId === args.fileId
    );

    console.log("Relevant Chunks:", relevant);

    const finalChunks = relevant.length ? relevant : allChunks;

    const ranked = finalChunks
      .map((chunk) => ({
        text: chunk.pageContent || chunk.text || "",
        score: chunk.score ?? 0,
        fileId: chunk.metadata?.fileId || args.fileId,
      }))
      .sort((a, b) => b.score - a.score);

    const combinedText = ranked.map((r) => r.text.trim()).join("\n\n");
    const safeText =
      combinedText.length > 30000 ? combinedText.slice(0, 30000) : combinedText;

    console.log(
      `Built RAG context for fileId ${args.fileId} | Chunks: ${ranked.length} | Length: ${safeText.length} chars`
    );

    console.log(safeText);

    return JSON.stringify({
      fileId: args.fileId,
      chunkCount: ranked.length,
      context: safeText,
    });
  },
});
