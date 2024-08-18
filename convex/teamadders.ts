import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: {
    projectid: v.string(),
    teamadderid: v.string(),
    hasaccepted: v.optional(v.boolean()),
  },
  handler: async (ctx, { projectid, teamadderid, hasaccepted}) => {
    const task = {
      projectid,
      teamadderid,
      hasaccepted,
      lastupdated: new Date().toISOString(),
    };

    // Insert the task and return it
    const insertedTask = await ctx.db.insert("addtoteam", task);
    return insertedTask;
  },
});