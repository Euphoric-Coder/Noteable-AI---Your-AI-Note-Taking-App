import { eachHourOfInterval } from "date-fns";
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
  args: {
    createdBy: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // 1️⃣ Fetch workspaces created by this user (or all if admin/debug)
    const workspaces = await ctx.db
      .query("workspaces")
      .filter((q) =>
        args.createdBy ? q.eq(q.field("createdBy"), args.createdBy) : true
      )
      .order("desc")
      .collect();

    // 2️⃣ Normalize + enrich workspace data for frontend display
    const enriched = workspaces.map((ws) => {
      const fileCount =
        ws.fileCount ?? (Array.isArray(ws.fileIds) ? ws.fileIds.length : 0);

      return {
        id: ws.workspaceId,
        name: ws.name,
        description: ws.description || "No description provided.",
        createdBy: ws.createdBy,
        fileCount,
        status: ws.status || "active",
        createdAt: ws.createdAt
          ? new Date(ws.createdAt).toISOString()
          : new Date(ws._creationTime).toISOString(),
        updatedAt: ws.updatedAt
          ? new Date(ws.updatedAt).toISOString()
          : new Date(ws._creationTime).toISOString(),
      };
    });

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
