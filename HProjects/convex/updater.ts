import { mutation } from "./_generated/server";
import { v } from "convex/values";
export const logger = mutation({
    args: {
        ProjectId: v.string(),
        taskId: v.string(),
        action: v.optional(v.string()),
        taskPriority: v.string(),
        taskAssignee: v.string(),
        usercommited: v.string(),
        added: v.optional(v.boolean()),
        timestamp: v.string()
    },
    handler: async (ctx, { taskId, action, taskPriority, taskAssignee, ProjectId, usercommited, added }) => {
        const logData = {
            ProjectId: ProjectId,
            taskId: taskId,
            action: action,
            taskPriority: taskPriority,
            taskAssignee: taskAssignee,
            usercommited: usercommited,
            added: added,
            timestamp: new Date().toISOString()
        };

        await ctx.db.insert("logs", logData);

        return logData;
    },
});