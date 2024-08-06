import { time } from "console";
import { mutation } from "./_generated/server";
import { v } from "convex/values";


export const add = mutation({
    args: {
        projectid: v.string(),
        userId: v.string(),
        time: v.string(),
        status: v.string(),
    },
    handler: async (ctx, { projectid, userId, time, status }) => {
        const pager = {
            projectid,
            userId,
            time,
            status,
        };

        await ctx.db.insert("pager", pager);

        return pager;
    },
});