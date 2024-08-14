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
  const [activeSection, setActiveSection] = useState("Finances");

  useEffect(() => {
    if (document.getElementById('Finances')) {
      setActiveSection('Finances');
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
            <div className="w-[100%] overflow-y-auto flex flex-col items-center">
              <div className="flex-col w-full dark:border-b-neutral-800 border-b-neutral-900 border-transparent border gap-4 justify-between mb-5 pb-5 mt-5 flex">
                <div className="px-7 flex flex-row items-center gap-2">
                    <div className="p-1 dark:bg-neutral-600/20 text-black dark:text-white rounded-md border">
                        <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.0049 22.0027C6.48204 22.0027 2.00488 17.5256 2.00488 12.0027C2.00488 6.4799 6.48204 2.00275 12.0049 2.00275C17.5277 2.00275 22.0049 6.4799 22.0049 12.0027C22.0049 17.5256 17.5277 22.0027 12.0049 22.0027ZM9.00488 13.0027V15.0027H8.00488V17.0027H16.0049V15.0027H11.0049V13.0027H14.0049V11.0027H11.0049V10.0027C11.0049 9.17432 11.6765 8.50275 12.5049 8.50275C13.0329 8.50275 13.4971 8.77553 13.7644 9.18786L15.7509 8.69125C15.2319 7.40804 13.9741 6.50275 12.5049 6.50275C10.5719 6.50275 9.00488 8.06975 9.00488 10.0027V11.0027H8.00488V13.0027H9.00488Z"></path></svg>
                    </div>
                    <h1 className="flex text-2xl font-bold text-black dark:text-white" id="Finances">Finances</h1>
                </div>
              </div>
              <div className="flex flex-row justify-between w-full p-5">
                <div className="flex flex-row gap-4 items-center"></div>
                </div>
            </div>
        </div>
    </div>
</div>
</>
);
}
