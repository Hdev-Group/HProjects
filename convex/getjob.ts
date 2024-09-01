import { query } from "./_generated/server";
import { LRUCache } from "lru-cache";

const cache = new LRUCache<string, any>({ max: 100 });

export const get = query({
    args: {},
    handler: async (ctx) => {
      const cachedResult = cache.get("jobget");
      if (cachedResult) {
        return cachedResult;
      }
      const result =  await ctx.db.query("users").collect();

      cache.set("replys", result);

      return result;
    },
});
