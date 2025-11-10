import { v } from "convex/values";
import { query } from "./_generated/server";

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
