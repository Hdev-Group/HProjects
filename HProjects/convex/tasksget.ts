import { query } from "./_generated/server";
import {LRUCache} from "lru-cache";

// Create an LRUCache instance
const cache = new LRUCache<string, any>({ max: 100 });

export const get = query({
  args: {},
  handler: async (ctx) => {
    // Check if the result is already cached
    const cachedResult = cache.get("tasks");
    if (cachedResult) {
      return cachedResult;
    }

    // If not cached, fetch the result from the database
    const result = await ctx.db.query("tasks").collect();

    // Store the result in the cache
    cache.set("tasks", result);

    return result;
  },
});