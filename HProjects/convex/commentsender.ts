import { mutation } from "./_generated/server";
import { v } from "convex/values";


export const add = mutation({
    args: {
        taskId: v.string(),
        userId: v.string(),
        ProjectId: v.string(),
        CommenterMessage: v.string(),
    },
    handler: async (ctx, { taskId, userId, ProjectId, CommenterMessage }) => {
        const comment = {
            taskId,
            userId,
            ProjectId,
            CommenterMessage,
        };

        await ctx.db.insert("comments", comment);

        return comment;
    },
});