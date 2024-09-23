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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../components/ui/table';
import ClientLayout from './ClientLayout'; 
import { ScrollArea } from "../../../../components/ui/scroll-area";
import { AlertTriangle, AlertCircle, ArrowUpCircle, Circle, CheckCircle2, Home } from 'lucide-react';
import Image from 'next/image';

interface Project {
  _id: string;
  userId: string;
  otherusers: string[];
  projectName: string;
}

interface Task {
  _id: string;
  projectid: string;
  taskAssignee: string;
  taskTitle: string;
  taskPriority: 'critical' | 'high' | 'medium' | 'low' | 'security' | 'Feature';
  taskStatus: 'backlog' | 'todo' | 'inprogress' | 'done';
  dueDate: string;
  archived: boolean;
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
  const priorityIcons = {
    critical: <AlertTriangle className="h-5 w-5 text-red-500" />,
    high: <AlertCircle className="h-5 w-5 text-orange-500" />,
    medium: <ArrowUpCircle className="h-5 w-5 text-yellow-500" />,
    low: <Circle className="h-5 w-5 text-blue-500" />,
    security: <AlertTriangle className="h-5 w-5 text-purple-500" />,
    Feature: <CheckCircle2 className="h-5 w-5 text-green-500" />
  };
  
  const statusLabels = {
    backlog: 'Backlog',
    todo: 'To Do',
    inprogress: 'In Progress',
    done: 'Done'
  };
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
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isSignedIn) {
    return <div className="flex items-center justify-center h-screen">Unauthorized. Please sign in.</div>;
  }

  if (!project) {
    return <div className="flex items-center justify-center h-screen">Project not found.</div>;
  }

  if (!(projectUserId === userId || project.otherusers.includes(userId))) {
    return <div className="flex items-center justify-center h-screen">You do not have access to this project.</div>;
  }

  if (!tasks) {
    return <div className="flex items-center justify-center h-screen">Loading tasks...</div>;
  }

  const projectTasks = tasks.filter(task => {
    const isProjectMatch = String(task.projectid) === String(params._id);
    const isAssigneeMatch = String(task.taskAssignee) === String(userId);

    if (task.taskStatus === 'done') {
      return false;
    }
    if (task.archived) {
      return false
    }
    if (task.length === 0) {
      return ("No tasks found")
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
              <h2 className="text-lg font-semibold mb-4">Hello {user?.firstName}! Your work queue.</h2>
                <ScrollArea className="h-[calc(100vh-300px)]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Task</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Due Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projectTasks.map((task: Task) => (
                        <TableRow 
                          key={task._id} 
                          onClick={() => taskMainMenu(task._id)}
                          className="cursor-pointer hover:bg-muted/50"
                        >
                          <TableCell>{task.taskTitle}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <img 
                                src={user?.imageUrl || '/placeholder.svg'}
                                alt={`${user?.firstName}'s avatar`}
                                width={28}
                                height={28}
                                className="rounded-full"
                              />
                              <span>You</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="flex items-center space-x-2">
                              {priorityIcons[task.taskPriority]}
                              <span className="sr-only">{task.taskPriority}</span>
                            </span>
                          </TableCell>
                          <TableCell>{statusLabels[task.taskStatus]}</TableCell>
                          <TableCell>{task.dueDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
              </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
