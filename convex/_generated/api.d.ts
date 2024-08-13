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
import type * as archiveTask from "../archiveTask.js";
import type * as commentsender from "../commentsender.js";
import type * as deleteProject from "../deleteProject.js";
import type * as deleteTask from "../deleteTask.js";
import type * as draganddrop from "../draganddrop.js";
import type * as getchat from "../getchat.js";
import type * as getcomments from "../getcomments.js";
import type * as getdm from "../getdm.js";
import type * as getexacttask from "../getexacttask.js";
import type * as getjob from "../getjob.js";
import type * as getlogs from "../getlogs.js";
import type * as getreplys from "../getreplys.js";
import type * as idgetprojects from "../idgetprojects.js";
import type * as messagesender from "../messagesender.js";
import type * as pageradd from "../pageradd.js";
import type * as pagerdelete from "../pagerdelete.js";
import type * as pagerget from "../pagerget.js";
import type * as pagerupdate from "../pagerupdate.js";
import type * as pinProject from "../pinProject.js";
import type * as projects from "../projects.js";
import type * as projectsget from "../projectsget.js";
import type * as replysender from "../replysender.js";
import type * as startchat from "../startchat.js";
import type * as tasks from "../tasks.js";
import type * as tasksget from "../tasksget.js";
import type * as taskssender from "../taskssender.js";
import type * as taskupdate from "../taskupdate.js";
import type * as updater from "../updater.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  archiveTask: typeof archiveTask;
  commentsender: typeof commentsender;
  deleteProject: typeof deleteProject;
  deleteTask: typeof deleteTask;
  draganddrop: typeof draganddrop;
  getchat: typeof getchat;
  getcomments: typeof getcomments;
  getdm: typeof getdm;
  getexacttask: typeof getexacttask;
  getjob: typeof getjob;
  getlogs: typeof getlogs;
  getreplys: typeof getreplys;
  idgetprojects: typeof idgetprojects;
  messagesender: typeof messagesender;
  pageradd: typeof pageradd;
  pagerdelete: typeof pagerdelete;
  pagerget: typeof pagerget;
  pagerupdate: typeof pagerupdate;
  pinProject: typeof pinProject;
  projects: typeof projects;
  projectsget: typeof projectsget;
  replysender: typeof replysender;
  startchat: typeof startchat;
  tasks: typeof tasks;
  tasksget: typeof tasksget;
  taskssender: typeof taskssender;
  taskupdate: typeof taskupdate;
  updater: typeof updater;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
