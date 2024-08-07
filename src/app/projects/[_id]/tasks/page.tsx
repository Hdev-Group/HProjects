"use client";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState, useRef } from "react";
import { useQuery } from "convex/react";
import { api } from '../../../../../convex/_generated/api';
import Head from "next/head";
import { useRouter } from 'next/navigation';
import SideBar from "../../../../components/projectscontents/sidebar";
import AddTaskButton from "../../../../components/buttons/addtask";
import MainHolder from "../../../../components/tasks/dragndrop";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../../../components/ui/hover-card";

export default function ProjectPage({ params }: { params: { _id: string } }) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find(project => project._id === params._id);
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
            <div className="max-w-10/12 w-[100%] overflow-y-auto p-5 flex flex-col items-center">
              <div className="flex-col w-full gap-4 px-5 justify-between mb-5 mt-5 flex">
                <h1 className="flex text-2xl font-bold text-black dark:text-white" id="tasksproject">Tasks</h1>
                <div className='w-full h-[1px] gradientedline'></div>
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
