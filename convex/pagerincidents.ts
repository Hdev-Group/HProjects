import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";
import { LRUCache } from "lru-cache";


export const add = mutation({
    args: {
      projectid: v.string(),
      incidentid: v.string(),
      userid: v.string(),
      acknowledged: v.boolean(),
      pagerid: v.string(),
    },
    handler: async (ctx, { projectid, incidentid, userid, acknowledged, pagerid }) => {
      const pager = {
          projectid,
          incidentid,
          userid,
          acknowledged,
          pagerid,
      };
      await ctx.db.insert("pagercalls", pager);
      return pager;
    },
});

const cache = new LRUCache<string, any>({ max: 100 });

export const get = query({
    args: {},
    handler: async (ctx) => {
        const cacheKey = "get_pagercalls";
        const cachedResult = cache.get(cacheKey);
        if (cachedResult) {
            return cachedResult;
        }
      const result = await ctx.db.query("pagercalls").collect();
      cache.set(cacheKey, result);

      return result;
    },
});

export const deletepage = mutation({
    args: { 
        _id: v.optional(v.id('pagercalls')),
    },
    handler: async (ctx, args) => {


        if (!args._id) {
            throw new Error('Missing required field: _id');
        }
        await ctx.db.delete(args._id);
    },
});