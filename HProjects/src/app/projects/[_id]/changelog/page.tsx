"use client";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import DashboardHeaderProjects from "../../../../components/header/dashboardprojects";
import { api } from '../../../../../convex/_generated/api';
import Head from "next/head";
import { useRouter } from 'next/navigation';
import SideBar from "../../../../components/projectscontents/sidebar";
import AddTaskButton from "../../../../components/buttons/addtask";
import MainHolder from "../../../../components/tasks/dragndrop";

export default function IncidentsPage({ params }: { params: { _id: string } }) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find(project => project._id === params._id);
  const projectname = project?.projectName;
  const projectUserId = project?.userId;
  const router = useRouter();
  const _id = params._id;

  const [taskFilter, setTaskFilter] = useState('');
  const [activeSection, setActiveSection] = useState("changelog");

  useEffect(() => {
    if (document.getElementById('changelog')) {
      setActiveSection('changelog');
    }
  }, []);

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
            <div className="max-w-10/12 w-[100%] p-5 flex flex-col items-center overflow-y-auto">
              <div className="flex-col w-full px-5 gap-4 justify-between mb-5 mt-5 flex">
                <h1 className="flex text-2xl font-bold text-black dark:text-white" id="changelog">Changelog</h1>
                <div className='w-full h-[1px] gradientedline'></div>
                <div>
                    <div className="w-full flex flex-col py-5 px-5 gap-3 dark:border-neutral-800 border-neutral-300 bg-neutral-800/30 dark:bg-neutral-900/50 border rounded">
                        <h1>This week, 10 Changes logged</h1>
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