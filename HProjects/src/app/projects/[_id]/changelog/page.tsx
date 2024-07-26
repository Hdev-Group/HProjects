"use client";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import DashboardHeaderProjects from "../../../../components/header/dashboardprojects";
import { api } from '../../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import SideBar from "../../../../components/projectscontents/sidebar";

export default function ChangelogPage({ params }: { params: { _id: string } }) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find(project => project._id === params._id);
  const projectname = project?.projectName;
  const [ownerData, setOwnerData] = useState<{ id: string, firstName: string, lastName: string, imageUrl: string } | null>(null);
  const projectUserId = project?.userId;
  const tasksholder = useQuery(api.tasksget.get);
  const router = useRouter();
  const _id = params._id;
  const [activeSection, setActiveSection] = useState("changelog");
  const [taskAssignee, setTaskAssignee] = useState<string | null>(null);
  const [taskAssigneeCount, setTaskAssigneeCount] = useState(0);

  useEffect(() => {
    if (document.getElementById('changelog')) {
      setActiveSection('changelog');
    }
  }, []);

  useEffect(() => {
    async function fetchProjectOwnerData(assignee: string | null) {
      if (assignee) {
        try {
          const response = await fetch(`/api/get-user?userId=${assignee}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setOwnerData({ id: assignee, ...data });
        } catch (error) {
          console.error('Error fetching assignee data:', error);
          setOwnerData(null);
        }
      }
    }
  
    let currentTaskAssignee: string | null = null;
    let currentTaskAssigneeCount = 0;

    tasksholder?.filter((task: any) => task.projectid === _id && task.taskStatus === "done" && new Date(task.lastupdated).getTime() > new Date().getTime() - 7 * 24 * 60 * 60 * 1000).forEach((task: any) => {
      if (currentTaskAssignee === null) {
        currentTaskAssignee = task.taskAssignee;
        currentTaskAssigneeCount = 1;
      } else if (currentTaskAssignee === task.taskAssignee) {
        currentTaskAssigneeCount += 1;
      } else {
        if (currentTaskAssigneeCount < 1) {
          currentTaskAssignee = task.taskAssignee;
          currentTaskAssigneeCount = 1;
        }
      }
    });

    setTaskAssignee(currentTaskAssignee);
    setTaskAssigneeCount(currentTaskAssigneeCount);
    fetchProjectOwnerData(currentTaskAssignee);
  }, [tasksholder, _id]);

  useEffect(() => {
    if (!isLoaded || !projectsholder) return;

    if (!isSignedIn) {
      router.push('/sign-in');
    } else if (!project) {
      router.push('/projects');
    }
  }, [isLoaded, isSignedIn, projectsholder, project, projectUserId, userId, router]);

  if (!isLoaded || !projectsholder) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Unauthorized</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  if (!(projectUserId === userId || project.otherusers.includes(userId))) {
    return <div>Unauthorized</div>;
  }

  const title = projectname + ' | Changelog';

  const taskFilterThisWeek = tasksholder?.filter(task => task.projectid === _id && task.taskStatus === "done" && new Date(task.lastupdated).getTime() > new Date().getTime() - 7 * 24 * 60 * 60 * 1000)?.length ?? 0;
  const pluralcheck = taskFilterThisWeek === 1 ? 'task' : 'tasks';
  const taskschecker = taskFilterThisWeek === 0 ? 'No tasks have been completed.' : `${taskFilterThisWeek} ${pluralcheck} has been completed.`;
  let performance: string | null = null;
  if (ownerData && taskAssigneeCount > 0) {
    performance = `${ownerData.firstName} has completed the most tasks with ${taskAssigneeCount} total tasks`;
  }

  return (
    <>
      <head>
        <title>{title}</title>
        <meta name="description" content="Plan, Build and Push with confidence" />
        <meta name="keywords" content="HProjects, Projects, Build, Plan, Push" />
      </head>
      <div className="h-screen overflow-hidden  bg-bglight dark:bg-bgdark " id="modal-root">
        <DashboardHeaderProjects projectname={projectname} activeSection={activeSection} />
        <div className="flex mt-[110px] h-full bg-bglightbars dark:bg-bgdarkbars">
          <SideBar _id={params._id} activeSection={activeSection} />
          <div className="flex w-full h-full overflow-y-auto justify-center bg-bglight border dark:border-l-white dark:border-t-white border-t-black mt-0.5 dark:bg-bgdark rounded-l-3xl">
            <div className="max-w-10/12 w-[100%] md:p-5 flex flex-col items-center overflow-y-auto">
              <div className="flex-col w-full px-5 gap-4 justify-between mb-5 mt-5 flex">
                <h1 className="flex text-2xl font-bold text-black dark:text-white" id="changelog">Changelog</h1>
                <div className='w-full h-[1px] gradientedline'></div>
                <div>
                  <div className={`w-full flex flex-col py-5 px-5 gap-3 dark:border-neutral-800 border-neutral-300  ${taskFilterThisWeek === 0 ? 'dark:bg-red-600 bg-red-600/20' : 'dark:bg-green-500/50 bg-green-600/20' } border rounded`}>
                    <h1>This week, {taskschecker} {performance}</h1>
                  </div>
                </div>
                <div className="mt-1 w-full flex flex-col gap-3">
                  <div className="pb-2 w-full bg-neutral-900 p-2 rounded-sm">
                    <h2 className="font-semibold text-xl mb-3">22nd to 28th July</h2>
                    <div className="gradientedline"></div>
                    <div className="mt-2 mb-1">
                      We tracked <code>1</code> task change this week.
                    </div>
                    <div>

                    </div>
                  </div>
                  <div className="pb-2 w-full bg-neutral-900 p-2  rounded-sm">
                    <h2 className="font-semibold text-xl mb-3">15th to 21st July</h2>
                    <div className="gradientedline"></div>
                    <div className="mt-2 mb-1">
                      We tracked no changes this week
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}