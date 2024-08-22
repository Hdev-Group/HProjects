import { mutation } from './_generated/server'; 
import { v } from 'convex/values';

export const editProject = mutation({
  args: {
    _id: v.string(),
    projectName: v.optional(v.string()),
    projectDescription: v.optional(v.string()),
    projectStatus: v.optional(v.string()),
    userId: v.optional(v.string()),
    otherusers: v.optional(v.array(v.string())),
  },
  handler: async (ctx, { _id, projectName, projectDescription, projectStatus, userId, otherusers}) => {

    // Create an object only with the fields that are not null
    const ProjectUpdates = {
        ...(projectName ? { projectName } : {}),
        ...(projectDescription ? { projectDescription } : {}),
        ...(projectStatus ? { projectStatus } : {}),
        ...(userId ? { userId } : {}),
        ...(otherusers ? { otherusers } : {}),
    }

    // Only call the db.patch method and return if there are actual fields to update
    if (Object.keys(ProjectUpdates).length > 0){
        await ctx.db.patch(_id, ProjectUpdates); 
        return ProjectUpdates;
    } else {
        return null;
    }
  },
});
