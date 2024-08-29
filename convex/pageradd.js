import { mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { api } from "./_generated/api";

export const deletePager = mutation({
    args: { 
        _id: v.optional(v.id('pager')),
        userId: v.optional(v.string()),
    },
    handler: async (ctx, args) => {


        if (!args._id) {
            throw new Error('Missing required field: _id');
        }
        await ctx.db.delete(args._id);
    },
});

export const add = mutation({
    args: {
      projectid: v.string(),
      userId: v.string(),
      time: v.string(),
      status: v.string(),
      calctime: v.any(),
    },
    handler: async (ctx, { projectid, userId, time, status, calctime }) => {
      const pager = {
          projectid,
          userId,
          time,
          status,
          calctime,
      };
      const response = await ctx.db.insert("pager", pager);
      console.log(calctime);
      console.log(time)
      await ctx.scheduler.runAfter(calctime, api.pageradd.deletePager, { _id: response, userId: pager.userId });
      return pager;
    },
});
