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

  workspaces: defineTable({
    workspaceId: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
    createdBy: v.string(),
    fileIds: v.optional(v.array(v.string())), // links to pdfFiles.fileId
    fileCount: v.optional(v.number()),
    status: v.string(), // e.g., "active", "archived"
    createdAt: v.optional(v.number()),
    updatedAt: v.optional(v.number()),
  }),

  documents: defineTable({
    text: v.string(),
    metadata: v.any(),
    embedding: v.array(v.number()),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 768,
  }),
});
