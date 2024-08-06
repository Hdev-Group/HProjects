import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const pinProject = mutation({
  args: { id: v.id('project'), pinned: v.boolean() },
  handler: async (ctx, args) => {
    const { id, pinned } = args;
    await ctx.db.patch(id, { pinned });
  },
});
