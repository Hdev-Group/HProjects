// schema.js

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    project: defineTable({
        projectDescription: v.string(),
        projectName: v.string(),
        projectStatus: v.string(),
        userId: v.string(),
        otherusers: v.array(v.string())
    }),
});
