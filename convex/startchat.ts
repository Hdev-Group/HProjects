import { mutation } from "./_generated/server";
import { v } from "convex/values";


export const create = mutation({
  args: {
    userId: v.string(),
    otherchatter: v.string(),
    projectid: v.string(),
    chatupdated: v.string(),
  },
  handler: async (ctx, { userId, otherchatter, projectid, chatupdated}) => {
    // Business logic to add a project
    const chats = {
    userId,
    otherchatter,
    projectid,
    chatupdated,
    };

    // Insert the project into the "project" table
    await ctx.db.insert("chats", chats);

    return chats; // Optionally return the newly created project
  },
});