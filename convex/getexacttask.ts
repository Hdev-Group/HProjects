import { query } from "./_generated/server";
import { v } from "convex/values"; // Import the validator

export const get = query({
  // Use the validator to validate the arguments
  args: {
    _id: v.id("tasks"), // Validator for a document ID in the "tasks" table
  },

  // Define the handler function that will be executed when this query is run
  handler: async (ctx, { _id }) => {
    try {
      // Fetch the task with the specific _id from the "tasks" collection
      const task = await ctx.db.get(_id);

      // Return the task, or null if not found
      return task;
    } catch (error) {
      console.error('Failed to fetch task:', error);
      throw new Error('Failed to fetch task');
    }
  },
});
