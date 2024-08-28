import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

let cache: any = null;

export const add = mutation({
    args: {
        projectid: v.string(),
        incidentid: v.string(),
        action: v.string(),
        description: v.string(),
        previous: v.optional(v.string()),
        userid: v.optional(v.string()),
    },
    handler: async (ctx, { projectid, userid, incidentid, action, description, previous}) => {
        const reports = {
            projectid,
            incidentid,
            action,
            description,
            previous,
            userid
        };

        const insertedincident = await ctx.db.insert("incidentlogs", reports);

        cache = null; 

        return insertedincident;
    },
});

export const get = query({
    args: {},
    handler: async (ctx) => {
        if (cache === null) {
            cache = await ctx.db.query("incidentlogs").collect();
        }

        return cache;
    },
});