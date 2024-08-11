"use client";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from '../../../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import { Critical, High, Medium, Low, Security, Feature } from '../../../../../components/dropdowns/priorities/critical';
import { BackLog, Todo, InProgress, Done } from '../../../../../components/dropdowns/status/status';
import SideBar from "../../../../../components/projectscontents/sidebar";
import NoChanges from "../../../../../components/noitems/nochanges";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../../components/ui/hover-card";


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
  const [changelogfilter, setChangelogFilter] = useState('');
  const [weekBlocks, setWeekBlocks] = useState<Record<string, any[]>>({});
  async function fetchData(assignees: string[]) {
    if (assignees && assignees.length > 0) {
      try {
        const query = new URLSearchParams({ userIds: assignees.join(',') }).toString();
        const response = await fetch(`/api/get-changeloggers?${query}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
            assigneesSet.add(log.taskAssignee);
          }
  
          // Add usercommited if present in the logger entry
          if (log.usercommited) {
            assigneesSet.add(log.usercommited);
          }
        }
      });
  
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
        <div className="flex  h-full bg-bglightbars dark:bg-bgdarkbars">
        <SideBar _id={params._id} activeSection={activeSection} projectname={projectname} />
        <div className="flex w-full justify-center bg-bglight border mt-0.5 dark:bg-bgdark rounded-l-3xl">

            <div className="max-w-10/12 w-[100%] md:p-5 flex flex-col items-center overflow-y-auto">
              <div className="flex-col w-full px-5 gap-4 justify-between mb-5 mt-5 flex">
                <div className="flex flex-row justify-between">
                  <h1 className="flex text-2xl font-bold text-black dark:text-white" id="changelog">Changelog</h1>
                  <input
                    type='text'
                    value={changelogfilter}
                    onChange={e => setChangelogFilter(e.target.value)}
                    placeholder='Filter by changes'
                    className='dark:bg-neutral-800 bg-white border  border-neutral-300 dark:border-neutral-700 w-full max-w-[15rem] rounded px-2 py-1'
                  />
                </div>
                <div className='w-full h-[1px] gradientedline'></div>
                <div className="mt-1 w-full flex flex-col gap-3">
                  <SenderChangelogger 
                    weekBlocks={weekBlocks} 
                    ownerData={ownerData}
                    taskFilterThisWeek={taskFilterThisWeek}
                    _id={_id}
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

function SenderChangelogger({ weekBlocks, ownerData, taskFilterThisWeek, _id }: { weekBlocks: Record<string, any[]>, ownerData: Record<string, any>, taskFilterThisWeek: number, _id: string}) {
  const tasksthatweek = Object.values(weekBlocks).flat();
  const tasksholderunfiltered = useQuery(api.tasksget.get);
  const {userId} = useAuth();
  const tasksholder = tasksholderunfiltered?.filter(task => tasksthatweek.some(log => log.taskId === task._id));
  const jobtitlealready = useQuery(api.getjob.get);

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - 7);
  const filteredTasks = tasksholder?.filter(task => {
    const taskDate = new Date(task.lastupdated);
    return taskDate >= weekStart;
  });

  return (
    <>
{
  Object.entries(weekBlocks).reverse().map(([weekKey, logs]) => (
    <div className="pb-2 w-full bg-neutral-900 border border-neutral-700 p-2 rounded-md" key={weekKey}>
      <div className="flex flex-col mb-3 w-full bg-neutral-400/5 p-1 rounded-md px-2">
        <h2 className="font-semibold text-xl ">
          Week of {new Date(weekKey.split('_')[0]).toLocaleDateString()} to {new Date(weekKey.split('_')[1]).toLocaleDateString()}
        </h2>
      </div>
      <div className="flex flex-col w-full">
        {Object.entries(
          logs.reverse().reduce((acc, log) => {
            const logDate = new Date(log.timestamp);
            const dateKey = logDate.toDateString();
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(log);
            return acc;
          }, {})
        ).reverse().map(([dateKey, dailyLogs]) => (
          <div key={dateKey}>
            <h3 className="font-semibold text-md mb-2 bg-neutral-900/20 my-2 w-full border border-transparent border-b-neutral-300/40 pb-1 ml-2">{new Date(dateKey).toLocaleDateString()}</h3>
            {dailyLogs.map(log => {
              const task = filteredTasks?.find(task => task._id === log.taskId);
              let changes = '';
              if (log.added === true) {
                changes += `${task?.taskTitle} has been created with the assignee ${ownerData[log.taskAssignee]?.firstName} ${ownerData[log.taskAssignee]?.lastName} it is currently`;
              } else if (log.archived === true) {
                changes += `${task?.taskTitle} has been archived by ${ownerData[log.usercommited]?.firstName} ${ownerData[log.usercommited]?.lastName}`;
              } else if (log.action === task?.taskStatus) {
                changes += `${task?.taskTitle} status has changed to `;
              } if (log.taskPriority) {
                  changes += `${task?.taskTitle} priority has changed to ${log.taskPriority}.`;
                }
              let hovercardchanges = '';
              if (log.added === true) {
                hovercardchanges += `created ${task?.taskTitle} with the assignee ${ownerData[log.taskAssignee]?.firstName} ${ownerData[log.taskAssignee]?.lastName} it is currently`;
              } else if (log.archived === true) {
                hovercardchanges += `archived ${task?.taskTitle}.`;
              }
              else if (log.action === task?.taskStatus) {
                hovercardchanges += `changed ${task?.taskTitle} status changed to ${log.action} `;
              } else if (log.taskPriority) {
                  hovercardchanges += `changed ${task?.taskTitle} priority to ${log.taskPriority}.`;
                }
              const assignee = ownerData[log.usercommited];
              return (
                <HoverCard key={log.id}>
                  <HoverCardTrigger>
                    <a href={`/projects/${_id}/${task?._id}`}>
                      <div className="log-entry mt-2">
                        <div className="flex flex-col gap-1 bg-neutral-800/20 p-2 rounded-md cursor-pointer hover:bg-neutral-600/20 transition-all">
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
                            <p className="text-xs text-neutral-400 font-semibold">{new Date(log.timestamp).toLocaleString([], { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</p>
                          </div>
                          <p className="flex flex-row gap-2">{changes}
                          </p>
                        </div>
                      </div>
                    </a>
                  </HoverCardTrigger>
                  <HoverCardContent>
                    <div className="flex flex-row gap-4">
                      <img src={assignee?.imageUrl} className="w-8 h-8 rounded-full mt-2" alt={`${assignee?.firstName} ${assignee?.lastName}`} />
                      <div className="flex flex-col">
                        <div className="flex flex-col">
                          <h1 className="font-semibold">{ownerData[log.usercommited]?.firstName} {ownerData[log.usercommited]?.lastName}</h1>
                          <p className='text-xs text-neutral-400'>{jobtitlealready?.filter(jobtitlealready => jobtitlealready.userid === ownerData[log.usercommited]?.id)[0]?.jobtitle}</p>
                        </div>
                        <div>
                          <p className="flex flex-row gap-2">{ownerData[log.usercommited]?.firstName} {ownerData[log.usercommited]?.lastName} has {hovercardchanges}</p>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  ))}
  {Object.entries(weekBlocks).length === 0 && <NoChanges />}
</>
);

}