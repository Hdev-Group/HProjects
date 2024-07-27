"use client";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import DashboardHeaderProjects from "../../../../components/header/dashboardprojects";
import { api } from '../../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import { Critical, High, Medium, Low, Security, Feature } from '../../../../components/dropdowns/priorities/critical';
import { BackLog, Todo, InProgress, Done } from '../../../../components/dropdowns/status/status';
import SideBar from "../../../../components/projectscontents/sidebar";
import NoChanges from "../../../../components/noitems/nochanges";

export default function ChangelogPage({ params }: { params: { _id: string } }) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find(project => project._id === params._id);
  const projectname = project?.projectName;
  const [ownerData, setOwnerData] = useState<Record<string, any>>({});
  const projectUserId = project?.userId;
  const tasksholder = useQuery(api.tasksget.get);
  const logger = useQuery(api.getlogs.get);
  const router = useRouter();
  const _id = params._id;
  const [activeSection, setActiveSection] = useState("changelog");
  const [weekBlocks, setWeekBlocks] = useState<Record<string, any[]>>({});
  async function fetchData(assignees: string[]) {
    if (assignees && assignees.length > 0) {
      try {
        const query = new URLSearchParams({ userIds: assignees.join(',') }).toString();
        const response = await fetch(`/api/getcommentuser?${query}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched user data:', data);
        if (!data || !Array.isArray(data) || data.length === 0) {
          console.warn('No data returned for assignees:', assignees);
          return;
        }
        // Update the state with all user data
        setOwnerData(prevData => {
          const updatedData = { ...prevData };
          data.forEach(user => {
            if (user.id) {
              updatedData[user.id] = user;
            }
          });
          return updatedData;
        });
      } catch (error) {
        console.error('Error fetching assignee data:', error);
        console.error('Assignees:', assignees);
      }
    } else {
      console.warn('No assignees provided to fetch data for.');
    }
  }
  
  

  useEffect(() => {
    if (document.getElementById('changelog')) {
      setActiveSection('changelog');
    }
  }, []);

  function getWeekRange(date: Date) {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);
    return { startOfWeek, endOfWeek };
  }

  useEffect(() => {
    if (logger) {
      console.log('Logger data:', logger);
  
      const newWeekBlocks: Record<string, any[]> = {};
      const assigneesSet = new Set<string>();
  
      // Process logger data
      logger.forEach(log => {
        if (log.ProjectId === _id) {
          const logDate = new Date(log.timestamp);
          const { startOfWeek, endOfWeek } = getWeekRange(logDate);
          const weekKey = `${startOfWeek.toISOString()}_${endOfWeek.toISOString()}`;
  
          if (!newWeekBlocks[weekKey]) {
            newWeekBlocks[weekKey] = [];
          }
  
          newWeekBlocks[weekKey].push(log);
  
          // Add assignee from logger
          if (log.taskAssignee) {
            console.log('Assignee from logger:', log.taskAssignee);
            assigneesSet.add(log.taskAssignee);
          }
  
          // Add usercommited if present in the logger entry
          if (log.usercommited) {
            console.log('User committed from logger:', log.usercommited);
            assigneesSet.add(log.usercommited);
          }
        }
      });
  
      console.log('Unique Assignees:', Array.from(assigneesSet)); // Ensure all unique assignees are present
      setWeekBlocks(newWeekBlocks);
      fetchData(Array.from(assigneesSet));
    }
  }, [tasksholder, _id, logger]);
  
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

  const title = `${projectname} | Changelog`;
  const taskFilterThisWeek = tasksholder?.filter(task => task.projectid === _id && task.taskStatus === "done" && new Date(task.lastupdated).getTime() > new Date().getTime() - 7 * 24 * 60 * 60 * 1000)?.length ?? 0;

  return (
    <>
      <head>
        <title>{title}</title>
        <meta name="description" content="Plan, Build and Push with confidence" />
        <meta name="keywords" content="HProjects, Projects, Build, Plan, Push" />
      </head>
      <div className="h-screen overflow-hidden bg-bglight dark:bg-bgdark" id="modal-root">
        <DashboardHeaderProjects projectname={projectname} activeSection={activeSection} />
        <div className="flex mt-[110px] h-full bg-bglightbars dark:bg-bgdarkbars">
          <SideBar _id={params._id} activeSection={activeSection} />
          <div className="flex w-full h-full overflow-y-auto justify-center bg-bglight border dark:border-l-white dark:border-t-white border-t-black mt-0.5 dark:bg-bgdark rounded-l-3xl">
            <div className="max-w-10/12 w-[100%] md:p-5 flex flex-col items-center overflow-y-auto">
              <div className="flex-col w-full px-5 gap-4 justify-between mb-5 mt-5 flex">
                <h1 className="flex text-2xl font-bold text-black dark:text-white" id="changelog">Changelog</h1>
                <div className='w-full h-[1px] gradientedline'></div>
                <div className="mt-1 w-full flex flex-col gap-3">
                  <SenderChangelogger 
                    weekBlocks={weekBlocks} 
                    ownerData={ownerData}
                    taskFilterThisWeek={taskFilterThisWeek}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SenderChangelogger({ weekBlocks, ownerData, taskFilterThisWeek }: { weekBlocks: Record<string, any[]>, ownerData: Record<string, any>, taskFilterThisWeek: number }) {
  const tasksthatweek = Object.values(weekBlocks).flat();
  const tasksholderunfiltered = useQuery(api.tasksget.get);
  const tasksholder = tasksholderunfiltered?.filter(task => tasksthatweek.some(log => log.taskId === task._id));

  return (
    <>
      {Object.entries(weekBlocks).map(([weekKey, logs]) => (
        <div className="pb-2 w-full bg-neutral-900 p-2 rounded-sm" key={weekKey}>
          <div className="flex flex-col mb-3 w-full">
            <h2 className="font-semibold text-xl">Week of {new Date(weekKey.split('_')[0]).toLocaleDateString()} to {new Date(weekKey.split('_')[1]).toLocaleDateString()}</h2>
            <p className="text-xs text-neutral-400">We tracked <code>{tasksthatweek.length}</code> task change{tasksthatweek.length === 1 ? "" : "s"} this week.</p>
          </div>
          <div className="gradientedline"></div>
          <div className="flex flex-col w-full">
            {logs.map(log => {
              const task = tasksholder?.find(task => task._id === log.taskId);
              let changes = '';
              if (log.added === true) {
                // will add a link to get to the task page easily
                changes += `${task?.taskTitle} has been created with the assignee ${ownerData[log.taskAssignee]?.firstName} ${ownerData[log.taskAssignee]?.lastName}`;
              }
              else if (log.action === task?.taskStatus) {
                changes += `${task?.taskTitle}'s status has changed to `;
              } else if (log.taskPriority === task?.taskPriority) {
                changes += `${task?.taskTitle}'s priority has changed to `;
              }
              const assignee = ownerData[log.usercommited];
                return (
                <div key={log.id} className="log-entry mt-2">
                  <div className="flex flex-col gap-1 bg-neutral-800/20 p-2 rounded-md">
                  <div className="gap-3 flex flex-row items-center">
                    <div className="flex flex-row gap-2 items-center">
                    {assignee ? (
                      <>
                      <img src={assignee.imageUrl} className="w-8 h-8 rounded-full" alt={`${assignee.firstName} ${assignee.lastName}`} />
                      <h2 className="font-semibold">{assignee.firstName} {assignee.lastName}</h2>
                      </>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gray-400"></div> // Placeholder if no image
                    )}
                    </div>
                    <p className="text-xs text-neutral-400 font-semibold">{new Date(log.timestamp).toLocaleString([], {day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                  <p className="flex flex-row gap-2">{changes}
                    {log.action === "critical" ? <Critical /> : log.action === "high" ? <High /> : log.action === "medium" ? <Medium /> : log.action === "low" ? <Low /> : log.action === "security" ? <Security /> : log.action === "feature" ? <Feature /> : log.action === "backlog" ? <BackLog /> : log.action === "todo" ? <Todo /> : log.action === "inprogress" ? <InProgress /> : log.action === "done" ? <Done /> : "" }
                  </p>
                  </div>
                </div>
                );
            })}
          </div>
        </div>
      ))}
      {Object.entries(weekBlocks).length === 0 && <NoChanges />}
    </>
  );
}
