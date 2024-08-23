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

export const edit = mutation({
    args: {
        _id: v.string(),
        role: v.string(),
        jobtitle: v.optional(v.string()),
        projectID: v.optional(v.string()),
        userid: v.optional(v.string()),
    },
    handler: async (ctx, { _id, role, jobtitle, projectID, userid }) => {
        // Validate the _id

        console.log(_id, role, jobtitle, projectID, userid);

        // Create an object only with the fields that are not null
        const userUpdates = {
            ...(role ? { role } : {}),
            ...(jobtitle ? { jobtitle } : {}),
            ...(projectID ? { projectID } : {}),
            ...(userid ? { userid } : {}),
        };

        if (Object.keys(userUpdates).length > 0) {
            await ctx.db.patch(_id as any, userUpdates);
            return userUpdates;
        } else {
            return null;
        }
    },
});
