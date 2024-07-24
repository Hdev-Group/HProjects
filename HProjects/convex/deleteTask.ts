import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const deleteTask = mutation({
  args: { 
    id: v.id('tasks'),
  },
  handler: async (ctx, args) => {

    const comments = await ctx.db.query('comments')
      .filter(q => q.eq(q.field('taskId'), args.id))
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

    await ctx.db.delete(args.id);
  },
});