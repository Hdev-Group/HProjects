"use client";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from '../../../../../../convex/_generated/api';
import Head from "next/head";
import { useRouter } from 'next/navigation';
import SideBar from "../../../../../components/projectscontents/sidebar";
import AddTaskButton from "../../../../../components/buttons/addtask";
import MainHolder from "../../../../../components/tasks/dragndrop";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../../components/ui/hover-card";
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
  const projectname = project?.projectName;
  const projectUserId = project?.userId;
  const router = useRouter();
  const _id = params._id;

  const tasksget = useQuery(api.tasks.get);
  const totaltasksarchived = tasksget?.filter(task => task.archived === true && task.projectid === _id).length ?? 0;


  const [taskFilter, setTaskFilter] = useState('');
  const [activeSection, setActiveSection] = useState("Tasks");

  useEffect(() => {
    if (document.getElementById('tasksproject')) {
      setActiveSection('Tasks');
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !projectsholder) return;

    if (!isSignedIn) {
      router.push('/sign-in');
    } else if (!project) {
      router.push('/projects');
    } else if (projectUserId !== userId && !project.otherusers.includes(userId)) {
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

  const title = projectname + ' | Tasks';

  return (
    <>
      <head>
        <title>{title}</title>
        <meta name="description" content="Plan, Build and Push with confidence" />
        <meta name="keywords" content="HProjects, Projects, Build, Plan, Push" />
      </head>
      <div className="h-screen bg-bglight overflow-hidden dark:bg-bgdark " id="modal-root">
        <div className="flex h-full bg-bglightbars dark:bg-bgdarkbars">
        <SideBar _id={params._id} activeSection={activeSection} projectname={projectname} />
        <div className="flex w-full justify-center bg-bglight border mt-0.5 dark:bg-bgdark rounded-l-3xl">
        <div className='flex flex-col w-full'>
            <div className="flex-col w-full dark:border-b-neutral-800 border-b-neutral-900 border-transparent border gap-4 justify-between mb-5 pb-5 mt-5 flex">
              <div className="px-7 flex flex-row items-center gap-2">
                <div className="p-1 dark:bg-neutral-600/20 text-black dark:text-white rounded-md border">
                <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.25098 3H18.751C19.993 3 21.001 4.00737 21.001 5.25V18.75C21.001 19.992 19.9935 21 18.751 21H5.25098C4.00898 21 3.00098 19.9925 3.00098 18.75V5.25C3.00098 4.008 4.00835 3 5.25098 3ZM13.171 6.42054V12.1795C13.171 12.7762 13.6545 13.26 14.2507 13.26H17.5812C18.1776 13.26 18.661 12.7765 18.661 12.1795V6.42054C18.661 5.82384 18.1774 5.34 17.5812 5.34H14.2507C13.6543 5.34 13.171 5.82348 13.171 6.42054ZM5.34098 6.42045V16.6796C5.34098 17.2762 5.82455 17.76 6.42071 17.76H9.75125C10.3476 17.76 10.831 17.277 10.831 16.6796V6.42045C10.831 5.82375 10.3474 5.34 9.75125 5.34H6.42071C5.82428 5.34 5.34098 5.82303 5.34098 6.42045Z"></path></svg>                </div>
                <h1 className="flex text-2xl font-bold text-black dark:text-white" id="tasksproject">Tasks</h1>
              </div>
              </div>
              <div className="flex flex-row justify-between w-full p-5">
                <div className="flex flex-row gap-4 items-center">
                  <AddTaskButton id={params._id} />
                  <HoverCard>
                    <HoverCardTrigger>
                      <a href={`/projects/${params._id}/tasks/archived`}>  
                        <h2 className="text-sm font-semibold dark:text-neutral-300 hover:text-neutral-100 cursor-pointer transition-all text-black">✔ {totaltasksarchived} Archived</h2>
                      </a>
                    </HoverCardTrigger>
                    <HoverCardContent className="px-[10px] py-1">
                      <div className="w-full">
                        <div className="pb-1 w-full font-semibold ">Tasks Archived</div>
                          {tasksget?.filter(task => task.archived === true && task.projectid === _id).map((task, index) => (
                            <div>
                              <h1 key={index}>{task.taskTitle}</h1>
                            </div>
                          ))}
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                </div>
                <input
                  type='text'
                  placeholder='Filter by tasks'
                  value={taskFilter}
                  onChange={(e) => setTaskFilter(e.target.value)}
                  className='dark:bg-neutral-800 bg-white border text-black dark:text-white border-neutral-300 dark:border-neutral-700 w-full max-w-[15rem] rounded px-2 py-1 placeholder:dark:text-neutral-300 placeholder:text-neutral-500'
                />
              </div>
              <div className="w-full items-center flex pb-[10rem] justify-start px-5 gap-1 flex-col rounded">
                <MainHolder _id={_id} taskFilter={taskFilter} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
