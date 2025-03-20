import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action, internalQuery } from "./_generated/server.js";
import { api, internal } from "./_generated/api.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";
import { countDocuments } from "./appQueries.js";

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
    // Retrieve the API key securely from Convex Environment
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in Convex environment.");
    }

    const vectorStore = new ConvexVectorStore(
      new GoogleGenerativeAIEmbeddings({
        apiKey,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    // Step 1: Fetch Total Number of Documents Using the Query
    const totalDocuments = await ctx.runQuery(internal.myActions.pdfCount);
    console.log("Total Documents in Schema:", totalDocuments);

    const resultOne = (
      await vectorStore.similaritySearch(args.query, totalDocuments)
    ).filter((doc) => {
      let result = "";
      for (const key in doc.metadata) {
        // Ensure accessing fileId
        result += doc.metadata[key]; // Concatenate characters into string
      }
      return result == args.fileId; // ✅ Return the boolean result
    });

    return resultOne;
  },
});
