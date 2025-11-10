import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/* ---------- CREATE WORKSPACE ---------- */
export const createWorkspace = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    createdBy: v.string(),
    fileIds: v.optional(v.array(v.string())),
  },

  handler: async (ctx, args) => {
    // Generate unique workspace ID
    const workspaceId = crypto.randomUUID();

    // Prepare workspace document
    const workspaceDoc = {
      workspaceId,
      name: args.name,
      description: args.description || "",
      createdBy: args.createdBy,
      fileIds: args.fileIds || [], // store linked files
      fileCount: args.fileIds ? args.fileIds.length : 0,
      status: "active",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // Insert workspace record
    await ctx.db.insert("workspaces", workspaceDoc);

    console.log(
      `Workspace created: ${workspaceId} (${args.name}), linked files: ${workspaceDoc.fileIds.length}`
    );

    return { workspaceId, fileCount: workspaceDoc.fileCount };
  },
});

/* ---------- FETCH USER WORKSPACES ---------- */
export const fetchUserWorkspaces = query({
  args: { createdBy: v.string() },
  handler: async (ctx, args) => {
    const workspaces = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("createdBy"), args.createdBy))
      .collect();

    // Also count files linked to each workspace
    const enriched = await Promise.all(
      workspaces.map(async (ws) => {
        const fileCount = await ctx.db
          .query("pdfFiles")
          .withIndex("by_workspace", (q) => q.eq("workspaceId", ws.workspaceId))
          .collect();

        return {
          ...ws,
          fileCount: fileCount.length,
        };
      })
    );

    return enriched;
  },
});

/* ---------- DELETE WORKSPACE ---------- */
export const deleteWorkspace = mutation({
  args: { workspaceId: v.string() },
  handler: async (ctx, args) => {
    // Remove workspace
    const ws = await ctx.db
      .query("workspaces")
      .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
      .first();
    if (!ws) throw new Error("Workspace not found");

    // Optionally unlink files
    const linkedFiles = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("workspaceId"), args.workspaceId))
      .collect();

    for (const file of linkedFiles) {
      await ctx.db.patch(file._id, { workspaceId: null });
    }

    await ctx.db.delete(ws._id);
    return { success: true };
  },
});
