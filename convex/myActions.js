"use server";

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { api } from "./_generated/api.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

const apiKey = `${process.env.NEXT_PUBLIC_GEMINI_API_KEY}`;

export const ingest = action({
  args: {
    // docOutput: v.any(),
    // fileId: v.string(),
  },
  handler: async (ctx) => {
    await ConvexVectorStore.fromTexts(
      //   args.docOutput,
      //   args.fileId,
      ["This is a test", "This is another test", "This is a third test"],
      "123",
      new GoogleGenerativeAIEmbeddings({
        apiKey: apiKey,
        // apiKey: "AIzaSyDC_OAitLaxBdJMTwSIduCdEtBy7jSj-Y0",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );
  },
});
