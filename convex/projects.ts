import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: {
    userId: v.string(),
    projectName: v.string(),
    projectDescription: v.string(),
    projectStatus: v.string(),
  },
  handler: async (ctx, { userId, projectName, projectDescription, projectStatus }) => {
    // Business logic to add a project
    const project = {
      userId,
      projectName,
      projectDescription,
      projectStatus,
    };

    // Insert the project into the "project" table
    await ctx.db.insert("project", project);

    return project; // Optionally return the newly created project
  },
});
