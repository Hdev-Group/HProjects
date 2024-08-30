import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
    args: {
        projectid: v.string(),
        chatId: v.string(),
        userId: v.string(),
        message: v.string(),
    },
    handler: async (ctx, { projectid, chatId, userId, message }: {projectid: string, chatId: string, userId: string, message: string}) => {
        const comment = {
            projectid,
            chatId,
            userId,
            message,
        };

        await ctx.db.insert("directmsg", comment);

        return comment;
    },
});