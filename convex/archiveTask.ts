import { mutation } from './_generated/server'; 
import { v } from 'convex/values';

export const Task = mutation({
  args: {
    _id: v.optional(v.string()),
    projectid: v.optional(v.string()),
    archived: v.optional(v.boolean()),
  },
  handler: async (ctx, { _id, projectid, archived }) => {

    // Create an object only with the fields that are not null
    const taskUpdates = {
        ...(_id ? { _id } : {}),
        ...(projectid ? { projectid } : {}),
        ...(archived ? { archived } : {}),
    }

    // Only call the db.patch method and return if there are actual fields to update
    if (Object.keys(taskUpdates).length > 0){
        await ctx.db.patch(_id, taskUpdates); 
        return taskUpdates;
    } else {
        return null;
    }
  },
});
