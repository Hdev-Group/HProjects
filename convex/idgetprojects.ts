import { query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { _id: v.any() },
  handler: async (ctx, { _id }) => {
    const project = await ctx.db.query("project").filter(q => q.eq(q.field("_id"), _id)).first();
    if (!project) return null;

    // Fetch the project owner
    const projectOwner = await ctx.db.query("project").filter(q => q.eq(q.field("userID"), project.userId)).first();

    return {
      ...project,
      projectOwner,
    };
  },
});
