import { query, mutation } from "./_generated/server";
import { LRUCache } from "lru-cache";
import { v } from "convex/values";
import incident from "../src/components/modals/incident";

// Create an LRUCache instance
const cache = new LRUCache<string, any>({ max: 100 });

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("incidents").collect();
  },
});


export const add = mutation({
  args: {
      projectid: v.string(),
      title: v.string(),
      reporterid: v.string(),
      description: v.string(),
      priority: v.string(),
      status: v.string(),
      process: v.string(),
      leadresponder: v.string(),
      responders: v.array(v.string()),
  },
  handler: async (ctx, { projectid, title, leadresponder, responders, reporterid, description, priority, status, process }) => {
      const reports = {
          projectid,
          title,
          reporterid,
          description,
          priority,
          status,
          process,
          leadresponder,
          responders,
      };

      const insertedincident = await ctx.db.insert("incidents", reports);

      return insertedincident;
  },
});

export const timestamps = mutation({
  args: {
    projectid: v.string(),
    incidentid: v.string(),
    reported: v.any(),
    investigating: v.any(),
  },
  handler: async (ctx, { projectid, incidentid, reported, investigating }) => {
    const timestamp = {
      projectid,
      incidentid,
      reported,
      investigating,
    };

    await ctx.db.insert("incidentlogs", timestamp);

    return timestamp;
  },
})

// edit lead responder
export const editLeadResponder = mutation({
  args: {
    incidentid: v.string(),
    leadresponder: v.string(),
  },
  handler: async (ctx, { incidentid, leadresponder }: {incidentid: any, leadresponder: any}) => {
    const updates = {
      ...(leadresponder ? { leadresponder } : {}),
    };

    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(incidentid, updates);
      return updates;
    } else {
      return null;
    }
  },
});

export const editResponder = mutation({
  args: {
    _id: v.id('incidents'),
    responders: v.array(v.string()),
  },
  handler: async (ctx, { _id, responders }: {_id: any, responders: any}) => {
    const updates = {
      ...(responders ? { responders } : {}),
    };

    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(_id, updates);
      return updates;
    } else {
      return null;
    }
  },
});

export const editPriority = mutation({
  args: {
    incidentid: v.string(),
    priority: v.string(),
  },
  handler: async (ctx, { incidentid, priority }: {incidentid: any, priority: any}) => {
    const updates = {
      ...(priority ? { priority } : {}),
    };

    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(incidentid, updates);
      return updates;
    } else {
      return null;
    }
  },
});

export const editprocess = mutation({
  args: {
    incidentid: v.string(),
    process: v.string(),
  },
  handler: async (ctx, { incidentid, process }: {incidentid: any, process: any}) => {
    const updates = {
      ...(process ? { process } : {}),
    };

    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(incidentid, updates);
      return updates;
    } else {
      return null;
    }
  },
});

export const summaryupdate = mutation({
  args: {
    projectid: v.string(),
    incidentid: v.string(),
    summary: v.string(),
    responders: v.array(v.string()),
  },
  handler: async (ctx, { incidentid, summary, responders }: {incidentid: any, summary: any, responders: any}) => {
    const updates = {
      ...(summary ? { summary } : {}),
      ...(responders ? { responders } : {}),
    };

    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(incidentid, updates);
      return updates;
    } else {
      return null;
    }
  },
});

export const updater = mutation({
  args: {
    incidentid: v.string(),
    process: v.string(),
    priority: v.string(),
    responders: v.array(v.string()),
  },
  handler: async (ctx, { incidentid, process, priority, responders }: {incidentid: any, process: any, priority: any, responders: any}) => {
    const updates = {
      ...(process ? { process } : {}),
      ...(priority ? { priority } : {}),
      ...(responders ? { responders } : {}),
    };

    if (Object.keys(updates).length > 0) {
      await ctx.db.patch(incidentid, updates);
      return updates;
    } else {
      return null;
    }
  },
});
