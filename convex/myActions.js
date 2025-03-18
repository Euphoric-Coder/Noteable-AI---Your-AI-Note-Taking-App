"use server";

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { api } from "./_generated/api.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";


export const ingest = action({
  args: {
    docOutput: v.any(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    // Retrieve the API key securely
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in Convex environment.");
    }

    console.log("Using API Key:", apiKey); // Debugging

    await ConvexVectorStore.fromTexts(
      args.docOutput || ["Default test text"],
      args.fileId || "default_id",
      new GoogleGenerativeAIEmbeddings({
        apiKey,
        model: "text-embedding-004",
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
  },
});

