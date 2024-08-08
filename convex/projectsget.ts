import { query } from "./_generated/server";
import { LRUCache } from "lru-cache";

// Create an LRUCache instance
const cache = new LRUCache<string, any>({ max: 100 });

export const get = query({
  args: {},
  handler: async (ctx) => {
    // Check if the result is already in the cache
    const cacheKey = "get_project";
    const cachedResult = cache.get(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    // If not in cache, fetch the result from the database
    const result = await ctx.db.query("project").collect();

    // Store the result in the cache
    cache.set(cacheKey, result);

    return result;
  },
});