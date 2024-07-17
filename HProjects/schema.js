import { defineSchema, defineTable, defineIndex } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  project: defineTable({
    otherusers: v.array(v.any()),
    pinned: v.boolean(),
    projectDescription: v.string(),
    projectName: v.string(),
    projectStatus: v.string(),
    userId: v.string(),
  }),
  comments: defineTable({
    CommenterMessage: v.string(),
    ProjectId: v.id("project"),
    taskId: v.id("tasks"),
    userId: v.string(),
  }),
  pager: defineTable({
    projectid: v.id("project"),
    status: v.string(),
    time: v.string(),
    userId: v.string(),
  }),
  tasks: defineTable({
    projectid: v.id("project"),
    taskAssignee: v.string(),
    taskDescription: v.string(),
    taskPriority: v.string(),
    taskStatus: v.string(),
    taskTitle: v.string(),
    userId: v.string(),
  }).index("by_project", ["projectid"]),
});
