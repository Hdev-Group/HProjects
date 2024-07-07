import { mutation } from './_generated/server'; 
import { v } from 'convex/values';

export const editTask = mutation({
  args: {
    taskId: v.string(),
    taskName: v.optional(v.string()),
    taskPriority: v.optional(v.string()),
    taskStatus: v.optional(v.string()),
    taskAssignee: v.optional(v.string()),
    taskDescription: v.optional(v.string()),
  },
  handler: async (ctx, { taskId, taskName, taskPriority, taskStatus, taskAssignee, taskDescription }) => {

    // Create an object only with the fields that are not null
    const taskUpdates = {
        ...(taskName ? { taskName } : {}),
        ...(taskPriority ? { taskPriority } : {}),
        ...(taskStatus ? { taskStatus } : {}),
        ...(taskAssignee ? { taskAssignee } : {}),
        ...(taskDescription ? { taskDescription } : {}),
    }

    // Only call the db.patch method and return if there are actual fields to update
    if (Object.keys(taskUpdates).length > 0){
        await ctx.db.patch(taskId, taskUpdates); 
        return taskUpdates;
    } else {
        return null;
    }
  },
});