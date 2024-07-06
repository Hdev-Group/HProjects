import { mutation } from './_generated/server';
import { v } from 'convex/values';

export const deleteProject = mutation({
  args: { 
    id: v.id('project'),
  },
  handler: async (ctx, args) => {
    const { id } = args;

    // Fetch all tasks associated with the project
    const tasks = await ctx.db.query('tasks')
      .withIndex('by_project', q => q.eq('projectid', id))
      .collect();

    // Delete each task
    for (const task of tasks) {
      await ctx.db.delete(task.projectid);
    }

    // Delete the project
    await ctx.db.delete(id);
  },
});