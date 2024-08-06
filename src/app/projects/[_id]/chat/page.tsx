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
  const [activeSection, setActiveSection] = useState("Chat");

  useEffect(() => {
    if (document.getElementById('Chat')) {
      setActiveSection('Chat');
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

  const title = projectname + ' | Chat';

  return (
    <>
      <head>
        <title>{title}</title>
        <meta name="description" content="Plan, Build and Push with confidence" />
        <meta name="keywords" content="HProjects, Projects, Build, Plan, Push" />
      </head>
      <div className="h-screen overflow-hidden  bg-bglight dark:bg-bgdark " id="modal-root">
        <div className="flex h-full bg-bglightbars dark:bg-bgdarkbars">
        <SideBar _id={params._id} activeSection={activeSection} projectname={projectname} />
        <div className="flex w-full bg-black border mt-0.5 gap-2  rounded-l-3xl">
            <div className="min-w-[300px] border bg-bglight dark:bg-bgdark border-l-transparent rounded-3xl border-neutral-600/40">
                <div className="flex items-center justify-start pl-4 border  border-transparent border-b-neutral-600/40 py-4">
                    <h1 className="font-semibold text-xl">Direct Messages</h1>
                </div>
                <div className="flex flex-col gap-2  mt-3">
                    <div className="flex flex-row justify-start cursor-pointer items-center gap-4 transition-all hover:bg-neutral-700/30 w-full h-10 pl-4">
                        <img src={user?.imageUrl} alt="logo" className="w-8 h-8 rounded-full" />
                        <p className="text-md font-semibold">{user?.firstName} {user?.lastName}</p>
                    </div>
                    <div className="flex flex-row justify-start cursor-pointer items-center gap-4 transition-all hover:bg-neutral-700/30 w-full h-10 pl-4">
                        <img src={user?.imageUrl} alt="logo" className="w-8 h-8 rounded-full" />
                        <p className="text-md font-semibold">{user?.firstName} {user?.lastName}</p>
                    </div>
                </div>
            </div>
            <div className="max-w-10/12 w-[100%] flex flex-col bg-bglight dark:bg-bgdark border-neutral-600/40 border rounded-3xl items-center overflow-y-auto">
                <div className="border border-transparent border-b-neutral-600/30 w-full">
                    <div className="flex flex-row gap-3 items-center pl-4 py-4">
                        <img src={user?.imageUrl} alt="logo" className="w-[30px] h-[30px] rounded-full" />
                        <p className="font-semibold text-xl">{user?.firstName} {user?.lastName}</p>
                    </div>
                </div>
              <div className="flex-col w-full gap-4 px-5 justify-between mb-5 mt-5 flex">
              </div>
              </div>
            </div>
        </div>
    </div>
    </>
    );
}