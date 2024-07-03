import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: {
    projectid: v.string(),
    userId: v.string(),
    taskTitle: v.string(),
    taskDescription: v.string(),
    taskPriority: v.string(),
    taskStatus: v.string(),
    taskAssignee: v.string(),
  },
  handler: async (ctx, { projectid, userId, taskTitle, taskDescription, taskPriority, taskStatus, taskAssignee }) => {
    const task = {
      projectid,
      userId,
      taskTitle,
      taskDescription,
      taskPriority,
      taskStatus,
      taskAssignee,
    };

    await ctx.db.insert("tasks", task);

    return task;
  },
});