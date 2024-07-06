import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const deleteProject = mutation({
  args: {
    id: v.id('project'),
  },
  handler: async (ctx, args) => {
    const tasks = await ctx.db.query('tasks')
      .filter(q => q.eq(q.field('projectid'), args.id))
      .collect();

    for (const task of tasks) {
      await ctx.db.delete(task._id);
    }

    await ctx.db.delete(args.id);
  },
});
