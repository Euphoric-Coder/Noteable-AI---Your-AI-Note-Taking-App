import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Fetch files with optional filtering by creator or file ID
export const fetchUserFiles = query({
  args: {
    createdBy: v.optional(v.string()),
    fileId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let fileData;

    if (args.fileId) {
      fileData = await ctx.db
        .query("pdfFiles")
        .filter((q) => q.eq(q.field("fileId"), args.fileId))
        .collect();
    } else if (args.createdBy) {
      fileData = await ctx.db
        .query("pdfFiles")
        .filter((q) => q.eq(q.field("createdBy"), args.createdBy))
        .collect();
    } else {
      fileData = await ctx.db.query("pdfFiles").collect();
    }

    // Return with size and public URL
    const filesWithMeta = await Promise.all(
      fileData.map(async (file) => {
        try {
          const metadata = await ctx.storage.getMetadata(file.storageId);
          const fileURL = await ctx.storage.getUrl(file.storageId);

          return {
            ...file,
            fileURL,
            storageSizeBytes: metadata?.size ?? 0,
            storageSizeMB: metadata?.size
              ? (metadata.size / (1024 * 1024)).toFixed(2)
              : "0.00",
          };
        } catch (err) {
          console.error("Metadata fetch failed:", err);
          return {
            ...file,
            fileURL: "",
            storageSizeBytes: 0,
            storageSizeMB: "0.00",
          };
        }
      })
    );

    return filesWithMeta;
  },
});

// Rename a file by its fileId
export const renameFile = mutation({
  args: {
    fileId: v.string(),
    newName: v.string(),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .first();

    if (!file) throw new Error("File not found");

    await ctx.db.patch(file._id, { fileName: args.newName });
    return { success: true };
  },
});

// Delete a file by its fileId
export const deleteFile = mutation({
  args: {
    fileId: v.optional(v.string()),
    storageId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // 🔹 Find file either by fileId or storageId
    let file = null;

    if (args.fileId) {
      file = await ctx.db
        .query("pdfFiles")
        .filter((q) => q.eq(q.field("fileId"), args.fileId))
        .first();
    } else if (args.storageId) {
      file = await ctx.db
        .query("pdfFiles")
        .filter((q) => q.eq(q.field("storageId"), args.storageId))
        .first();
    }

    if (!file) throw new Error("File not found for given ID");

    // 🔹 Delete from Convex storage
    try {
      await ctx.storage.delete(file.storageId);
    } catch (err) {
      console.error("Storage deletion failed:", err);
    }

    // 🔹 Delete the file record
    await ctx.db.delete(file._id);

    // 🔹 Delete all related embeddings (documents)
    const relatedDocs = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("metadata.fileId"), file.fileId))
      .collect();

    for (const doc of relatedDocs) {
      await ctx.db.delete(doc._id);
    }

    console.log(
      `Deleted ${relatedDocs.length} embedding documents for fileId: ${file.fileId}`
    );

    return { success: true, deletedEmbeddings: relatedDocs.length };
  },
});


export const getFileChunks = query({
  args: { fileId: v.string() },
  handler: async (ctx, args) => {
    const chunks = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("metadata.fileId"), args.fileId))
      .collect();
    return chunks;
  },
});
