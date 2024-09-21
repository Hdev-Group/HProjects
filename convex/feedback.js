import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
    args: {
      projectid: v.string(),
      feedback: v.string(),
      status: v.string(),
      title: v.string(),
      email: v.string(),
      name: v.string(),
      label: v.string(),
    },
    handler: async (ctx, { projectid, feedback, email, name, label,title,status }) => {
      const feedbackadd = {
          projectid,
          feedback,
          email,
          name,
          label,
          title,
          status,
      };
      const response = await ctx.db.insert("feedback", feedbackadd);
      return response;
    },
});

export const get = query({
    args: {
      projectid: v.string(),
    },
    handler: async (ctx, { projectid }) => {
      const feedback = await ctx.db.query("feedback", { projectid }).collect();
      return feedback;
    },
});

export const deleteFeedBack = mutation({
  args: {
    id: v.id("feedback"), // Ensure the ID is of the correct type
  },
  handler: async (ctx, { id }) => {
    const response = await ctx.db.delete(id); // Pass the ID directly
    return response;
  },
});