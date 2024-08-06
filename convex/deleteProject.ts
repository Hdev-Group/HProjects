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
    
    const comments = await ctx.db.query('comments')
      .filter(q => q.eq(q.field('projectid'), args.id))
      .collect();
    
    const replies = await ctx.db.query('replys')
      .filter(q => q.eq(q.field('commentId'), comments.map(comment => comment._id)))
      .collect();
    
    for (const reply of replies) {
      await ctx.db.delete(reply._id);
    }

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    for (const task of tasks) {
      await ctx.db.delete(task._id);
    }
    
    await ctx.db.delete(args.id);
  }
});
