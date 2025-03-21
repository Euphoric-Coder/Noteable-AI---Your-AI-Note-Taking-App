import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const fetchUserFiles = mutation({
  args: {
    createdBy: v.optional(v.string()),
    fileId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.fileId) {
      const fileData = await ctx.db
        .query("pdfFiles")
        .filter((q) => q.eq(q.field("fileId"), args.fileId))
        .collect();

      return fileData;
    } else {
      const fileData = await ctx.db
        .query("pdfFiles")
        .filter((q) => q.eq(q.field("createdBy"), args.createdBy))
        .collect();

      return fileData;
    }
  },
});
