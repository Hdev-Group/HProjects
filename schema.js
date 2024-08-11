import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  comments: defineTable({
    CommenterMessage: v.string(),
    ProjectId: v.id("project"),
    taskId: v.id("tasks"),
    userId: v.string(),
  }),
  project: defineTable({
    otherusers: v.array(v.string()),
    pinned: v.boolean(),
    projectDescription: v.string(),
    projectName: v.string(),
    projectStatus: v.string(),
    userId: v.string(),
  }),
  replys: defineTable({
    CommenterMessage: v.string(),
    commentId: v.id("comments"),
    taskId: v.id("tasks"),
    userId: v.string(),
  }),
  tasks: defineTable({
    lastupdated: v.optional(v.string()),
    projectid: v.id("project"),
    taskAssignee: v.string(),
    taskDescription: v.string(),
    taskPriority: v.string(),
    taskStatus: v.string(),
    taskTitle: v.string(),
    userId: v.string(),
  }),
  logs: defineTable({
    taskId: v.id("tasks"),
    action: v.optional(v.string()),
    taskPriority: v.optional(v.string()),
    taskAssignee: v.optional(v.string()),
    timestamp: v.string(),
  }),
  users: defineTable({
    userid: v.string(),
    jobtitle: v.string(),
  }).unique("userid"), 
});