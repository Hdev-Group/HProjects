"use client";
import { Critical, High, Medium, Low, Security, Feature } from '../../../../components/dropdowns/priorities/critical';
import { BackLog, Todo, InProgress, Done } from '../../../../components/dropdowns/status/status';
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from '../../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import SideBar from "../../../../components/projectscontents/sidebar";
import ClientLayout from './ClientLayout'; 
interface Project {
  _id: string;
  userId: string;
  otherusers: string[];
  projectName: string;
}
export default function ProjectPage({ params }: { params: { _id: string } }) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find((project: Project) => project._id === params._id);
  const projectUserId = project?.userId;
  const [activeSection, setActiveSection] = useState("Dashboard");
  const router = useRouter();
  const projectname = project?.projectName;
  const tasks = useQuery(api.tasks.get);

  useEffect(() => {
    if (!isLoaded || !projectsholder) return; // Wait until authentication state and project data are loaded

    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to sign-in page if not signed in
    } else if (!project) {
      router.push('/projects');
    } else if (projectUserId !== userId && !project.otherusers.includes(userId)) {
      router.push('/projects');
    }
  }, [isLoaded, isSignedIn, projectsholder, project, projectUserId, userId, router]);

  useEffect(() => {
    if (document.getElementById('dashboardprojects')) {
      setActiveSection('Dashboard');
    }
  }, []);

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

  if (!tasks) {
    return <div>Loading tasks...</div>;
  }

  const projectTasks = tasks.filter(task => {
    const isProjectMatch = String(task.projectid) === String(params._id);
    const isAssigneeMatch = String(task.taskAssignee) === String(userId);

    if (task.taskStatus === 'done') {
      return false;
    }

    return isProjectMatch && isAssigneeMatch;
  });


  function taskMainMenu(taskId: string) {
    router.push(`${project._id}/${taskId}`);
  }
  const title = projectname + ' | Dashboard';
  return (
    <>
      <head>
        <title>{title}</title>
        <meta name="description" content="Plan, Build and Push with confidence" />
        <meta name="keywords" content="HProjects, Projects, Build, Plan, Push" />
      </head>
      <div className="h-screen flex flex-col">
        <div className="flex flex-grow overflow-hidden bg-bglightbars dark:bg-bgdarkbars" id="modal-root">
          <SideBar _id={params._id} activeSection={activeSection} projectname={projectname} />
          <div className="flex w-full justify-center bg-bglight border mt-0.5 text-black dark:text-white dark:bg-bgdark rounded-l-3xl">
          <div className='flex flex-col w-full'>
            <div className="flex-col w-full dark:border-b-neutral-800 border-b-neutral-900 border-transparent border gap-4 justify-between mb-5 pb-5 mt-5 flex">
              <div className="px-7 flex flex-row items-center gap-2">
                <div className="p-1 dark:bg-neutral-600/20 text-black dark:text-white rounded-md border">
                  <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM7 15V17H17V15H7Z"></path></svg>              
                  </div>
                <h1 className="flex text-2xl font-bold text-black dark:text-white" id="tasksproject">Dashboard</h1>
              </div>
              </div>
              <div className='px-5 w-full mt-2'>
              <div className="w-full flex flex-col py-5 px-5 gap-3 dark:border-neutral-800 border-neutral-300 bg-neutral-300 dark:bg-neutral-900 border rounded">
                <h2 className="text-lg font-semibold ">Hello {user?.firstName}! Your work queue.</h2>
                <div className="overflow-y-auto w-full">
                  <table className="min-w-[40rem] w-full text-sm mt-5">
                    <thead className="border-b border-neutral-100">
                      <tr className="group transition-colors hover:bg-transparent">
                        <th className="py-2 text-left">Task</th>
                        <th className="py-2 text-left">Assigned To</th>
                        <th className="py-2 text-left">Priority</th>
                        <th className="py-2 text-left">Status</th>
                        <th className="py-2 text-left">Due Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100/10 px-2">
                      {projectTasks.map(task => {
                        if (task.archived) {
                          return null; 
                        }
                        return (
                          <tr key={task._id} onClick={() => taskMainMenu(task._id)} className="group transition-colors  hover:bg-neutral-500/30 cursor-pointer">
                            <td className="py-2 px-2 text-left ml-2">{task.taskTitle}</td>
                            <td className="py-2 text-left flex items-center gap-3">
                              <img src={user?.imageUrl} className='h-7 w-7 rounded-full' alt="Assignee" />
                              You
                            </td>
                            <td className="py-2 text-left">
                              {task.taskPriority === 'critical' && <Critical />}
                              {task.taskPriority === 'high' && <High />}
                              {task.taskPriority === 'medium' && <Medium />}
                              {task.taskPriority === 'low' && <Low />}
                              {task.taskPriority === 'security' && <Security />}
                              {task.taskPriority === 'Feature' && <Feature />}
                            </td>
                            <td className="py-2 text-left">
                              {task.taskStatus === 'backlog' && <BackLog />}
                              {task.taskStatus === 'todo' && <Todo />}
                              {task.taskStatus === 'inprogress' && <InProgress />}
                              {task.taskStatus === 'done' && <Done />}
                            </td>
                            <td className="py-2 text-left">{task.dueDate}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
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
