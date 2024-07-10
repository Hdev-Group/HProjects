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
import { NextApiRequest, NextApiResponse } from "next";
import { clerkClient } from "@clerk/nextjs/server";

export default function ProjectPage({ params }: { params: { _id: string } }) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find(project => project._id === params._id);
  console.log(project);
  console.log(project?.userId, "userId");
  const projectname = project?.projectName;
  const projectUserId = project?.userId;
  const router = useRouter();
  const _id = params._id;
  const [activeSection, setActiveSection] = useState("Tasks");

  const assigneeid = project?.projectAssignee;
  

  useEffect(() => {
    if (document.getElementById('tasksproject')) {
      setActiveSection('Tasks');
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !projectsholder) return; // Wait until authentication state and project data are loaded

    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to sign-in page if not signed in
    } else if (!project) {
      console.log('Project not found');
      router.push('/projects');
    } else if (projectUserId !== userId && !project.otherusers.includes(userId)) {
      console.log('User is not the project owner', projectUserId, userId);
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
    console.log('Unauthorized access attempt:', project?.otherusers);
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
      <div className="h-screen overflow-hidden sm:overflow-y-auto bg-bglight dark:bg-bgdark " id="modal-root">
        <DashboardHeaderProjects projectname={projectname} activeSection={""} />
        <div className="flex mt-[110px] h-full bg-[#D4D4D8] dark:bg-[#1A1A2E]">
          <SideBar _id={params._id} activeSection={activeSection} />
          <div className="flex w-full justify-center bg-bglight dark:bg-bgdark rounded-tl-3xl">
            <div className="max-w-10/12 w-[100%] p-5 flex flex-col items-center overflow-y-auto">
              <div className="flex-row w-full px-5 justify-between mb-5 mt-5 flex">
                <h1 className="flex text-2xl font-bold text-black dark:text-white" id="tasksproject">Tasks</h1>
                <AddTaskButton id={params._id} />
              </div>
              <div className="w-full items-center flex py-5 justify-start px-5 gap-1 flex-col rounded">
                <MainHolder _id={_id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
