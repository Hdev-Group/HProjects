import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const deleteProject = mutation({
  args: { id: v.id('project') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});