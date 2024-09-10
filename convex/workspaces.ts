import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { auth } from "./auth";

const generatedCode = () => {
  const code = Array.from(
    { length: 6 },
    () => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]
  ).join("");
  return code;
};

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      return [];
    }

    const memebers = await ctx.db
      .query("members")
      .withIndex("by_user_id", (q) => q.eq("userId", userId))
      .collect();

    const workspaceIds = memebers.map((m) => m.workspaceId);

    const workspaces = [];

    for (const id of workspaceIds) {
      const workspace = await ctx.db.get(id);
      if (workspace) {
        workspaces.push(workspace);
      }
    }
    return workspaces;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const joinCode = generatedCode();

    const workspaceId = await ctx.db.insert("workspaces", {
      name: args.name,
      joinCode,
      userId,
    });

    await ctx.db.insert("members", { userId, workspaceId, role: "admin" });
    return workspaceId;
  },
});

export const getById = query({
  args: { id: v.id("workspaces") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const memeber = await ctx.db
      .query("members")
      .withIndex("by_workspace_id_user_id", (q) =>
        q.eq("workspaceId", args.id).eq("userId", userId)
      )
      .unique();

    if (!memeber) return null;

    return await ctx.db.get(args.id);
  },
});
