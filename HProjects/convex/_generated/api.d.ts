/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.12.2.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as commentsender from "../commentsender.js";
import type * as deleteProject from "../deleteProject.js";
import type * as deleteTask from "../deleteTask.js";
import type * as getcomments from "../getcomments.js";
import type * as idgetprojects from "../idgetprojects.js";
import type * as pinProject from "../pinProject.js";
import type * as projects from "../projects.js";
import type * as projectsget from "../projectsget.js";
import type * as tasks from "../tasks.js";
import type * as tasksget from "../tasksget.js";
import type * as taskssender from "../taskssender.js";
import type * as taskupdate from "../taskupdate.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  commentsender: typeof commentsender;
  deleteProject: typeof deleteProject;
  deleteTask: typeof deleteTask;
  getcomments: typeof getcomments;
  idgetprojects: typeof idgetprojects;
  pinProject: typeof pinProject;
  projects: typeof projects;
  projectsget: typeof projectsget;
  tasks: typeof tasks;
  tasksget: typeof tasksget;
  taskssender: typeof taskssender;
  taskupdate: typeof taskupdate;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
