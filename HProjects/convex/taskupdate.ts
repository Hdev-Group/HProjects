import { mutation } from './_generated/server'; 
import { v } from 'convex/values';

export const editTask = mutation({
  args: {
    taskId: v.string(),
    taskPriority: v.optional(v.string()),
    taskStatus: v.optional(v.string()),
    taskAssignee: v.optional(v.string()),
    taskDescription: v.optional(v.string()),
    lastupdated: v.optional(v.string()),
  },
  handler: async (ctx, { taskId, taskPriority, taskStatus, taskAssignee, taskDescription, lastupdated }) => {

    // Create an object only with the fields that are not null
    const taskUpdates = {
        ...(taskPriority ? { taskPriority } : {}),
        ...(taskStatus ? { taskStatus } : {}),
        ...(taskAssignee ? { taskAssignee } : {}),
        ...(taskDescription ? { taskDescription } : {}),
        lastupdated: new Date().toISOString(),
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