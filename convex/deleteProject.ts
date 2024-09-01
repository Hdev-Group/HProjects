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

    const directmsgs = await ctx.db.query('directmsg')
      .filter(q => q.eq(q.field('projectid'), args.id))
      .collect();

    const logs = await ctx.db.query('logs')
      .filter(q => q.eq(q.field('ProjectId'), args.id))
      .collect();

    const comments = await ctx.db.query('comments')
      .filter(q => q.eq(q.field('projectid'), args.id))
      .collect();
    
    const replies = await ctx.db.query('replys')
      .filter(q => q.eq(q.field('commentId'), comments.map(comment => comment._id)))
      .collect();

    const users = await ctx.db.query('users')
      .filter(q => q.eq(q.field('projectID'), args.id))
      .collect();

    const incidents = await ctx.db.query('incidents')
      .filter(q => q.eq(q.field('projectid'), args.id))
      .collect();

    const incidentlogs = await ctx.db.query('incidentlogs')
      .filter(q => q.eq(q.field('incidentid'), incidents.map(incident => incident._id)))
      .collect();

    const chats = await ctx.db.query('chats')
      .filter(q => q.eq(q.field('projectid'), args.id))
      .collect();

    const addtoteam = await ctx.db.query('addtoteam')
      .filter(q => q.eq(q.field('projectid'), args.id))
      .collect();
    
    for (const reply of replies) {
      await ctx.db.delete(reply._id);
    }

    for (const directmsg of directmsgs) {
      await ctx.db.delete(directmsg._id);
    }

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    for (const task of tasks) {
      await ctx.db.delete(task._id);
    }

    for (const log of logs) {
      await ctx.db.delete(log._id);
    }

    for (const user of users) {
      await ctx.db.delete(user._id);
    }

    for (const incident of incidents) {
      await ctx.db.delete(incident._id);
    }

    for (const incidentlog of incidentlogs) {
      await ctx.db.delete(incidentlog._id);
    }
    
    for (const chat of chats) {
      await ctx.db.delete(chat._id);
    }

    for (const add of addtoteam) {
      await ctx.db.delete(add._id);
    }
    await ctx.db.delete(args.id);
  }
});
