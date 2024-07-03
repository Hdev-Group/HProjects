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

export default function ProjectPage({ params }: { params: { _id: string } }) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find(project => project._id === params._id);
  const projectname = project?.projectName;
  const projectuserid = project?.userId;
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("Tasks");

  useEffect(() => {
    if (document.getElementById('tasksproject')) {
      setActiveSection('Tasks');
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return; // Wait until authentication state is loaded


    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to sign-in page if not signed in
    }
  }, [isLoaded, isSignedIn, router]);


  if (!isLoaded) {
    return; 
  }

  if (!isSignedIn) {
    return <div>Unauthorised</div>;
  }

  return (
    <>
      <Head>
        <title>HProject | Static Title</title>
      </Head>
      <div className="h-screen overflow-hidden" id="modal-root">
        <DashboardHeaderProjects projectname={projectname} />
        <div className="flex mt-[130px] h-full">
          <SideBar _id={params._id} activeSection={activeSection} />
          <div className="w-full p-5 overflow-y-auto">
            <div className="flex-row justify-between mb-10 mt-5 flex">
              <h1 className="flex text-2xl font-bold" id="tasksproject">Tasks</h1>
              <AddTaskButton id={params._id} />
            </div>
            <div className="w-full items-start flex py-5 justify-start px-5 gap-3 flex-col border-neutral-800 bg-neutral-900/50 border rounded">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
