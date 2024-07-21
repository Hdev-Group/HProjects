import { comment } from "postcss";
import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
    args: {
        commentId: v.string(),
        taskId: v.string(),
        userId: v.string(),
        CommenterMessage: v.string(),
    },
    handler: async (ctx, { commentId, taskId, userId, CommenterMessage }) => {
        const comment = {
            commentId,
            taskId,
            userId,
            CommenterMessage,
        };

        await ctx.db.insert("replys", comment);

        return comment;
    },
});
