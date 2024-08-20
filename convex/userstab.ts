import { comment } from "postcss";
import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";


export const add = mutation({
    args: {
        jobtitle: v.string(),
        projectID: v.string(),
        userid: v.string(),
        role: v.string(),
    },
    handler: async (ctx, { jobtitle, projectID, userid, role }) => {
        const users = {
            jobtitle,
            projectID,
            userid,
            role,
        };

        await ctx.db.insert("users", users);

        return users;
    },
});

export const get = query({
    args: {},
    handler: async (ctx) => {
      return await ctx.db.query("users").collect();
    },
});

export const remove = mutation({
    args: { 
        _id: v.optional(v.id('users')),
    },
    handler: async (ctx, args) => {
        if (!args._id) {
            throw new Error('Missing required field: _id');
        }
        await ctx.db.delete(args._id);
    },
});
