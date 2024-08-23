import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const editpager = mutation({
  args: {
    id: v.string(),
    status: v.string(),
  },
  handler: async (ctx, { id, status }) => {
    // Create an object only with the fields that are not null
    const projectUpdates = {
      ...(id ? { id } : {}),
      ...(status ? { status } : {}),
    };

    if (Object.keys(projectUpdates).length > 0) {
      await ctx.db.patch(id as any ,projectUpdates);
      return projectUpdates;
    } else {
      return null;
    }
  },
});
