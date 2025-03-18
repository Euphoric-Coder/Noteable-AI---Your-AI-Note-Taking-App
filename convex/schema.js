import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userName: v.string(),
    email: v.string(),
    imageURL: v.string(),
  }),

  pdfFiles: defineTable({
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileURL: v.string(),
    createdBy: v.string(),
  }),

  documents: defineTable({
    text: v.string(),
    metadata: v.any(),
    // embedding: v.array(v.number()),
    embedding: v.any(),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 1536,
    // dimensions: 768,
  }),
});
