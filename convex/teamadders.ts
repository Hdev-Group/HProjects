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
export const remove = mutation({
  args: {
    _id: v.string(),
    otherusers: v.string(), // The user to be removed from the array
  },
  handler: async (ctx, { _id, otherusers }) => {
    
    // Fetch the project document
    const project = await ctx.db.get(_id as any);

    if (!project) {
      throw new Error(`Project with id ${_id} not found`);
    }

    // Remove the user from the otherusers array
    const updatedOtherUsers = project.otherusers.filter((u: string) => u !== otherusers);

    // Update the database with the new array
    await ctx.db.patch(_id as any, {
      otherusers: updatedOtherUsers,
    });

    return updatedOtherUsers;
  }
});
