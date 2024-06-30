"use client";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import DashboardHeaderProjects from "../../../../components/header/dashboardprojects";
import { api } from '../../../../../convex/_generated/api';
import Head from "next/head";
import SideBar from "../../../../components/projectscontents/sidebar";

export default function ProjectPage({ params }: { params: { _id: string } }) {
  const { userId } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find(project => project._id === params._id);
  const projectuserid = project?.userId;
  const [activeSection, setActiveSection] = useState("Tasks");

  console.log(user?.firstName, project?.projectName, projectuserid, userId);

  useEffect(() => {
    if (document.getElementById('Tasks')) {
      setActiveSection('Tasks');
    }
  }, []);

  if (!project) {
    return <div>Project not found</div>;
  }
  if (projectuserid !== userId) {
    return <div>Unauthorized</div>;
  }
  if (!user) {
    return <div>Not signed in</div>;
  }

  return (
    <>
      <Head>
        <title>HProject | Static Title</title>
      </Head>

      <div className="overflow-hidden h-screen">
        <DashboardHeaderProjects projectname={project.projectName} />
        <div className="flex mt-[130px] h-full">
          <SideBar activeSection={activeSection} />
          <div className="w-full p-5 overflow-y-auto">
            <div className="flex-row justify-between flex">
            <h1 className="flex text-2xl  font-bold mb-3" id="Tasks">Tasks</h1>
            <div>
                <button className="bg-primary-500 text-white rounded-md p-2 border w-60 hover:bg-neutral-300/20 hover:border-neutral-200 transition-all bg-neutral-400/10 border-neutral-800">Add Task</button>
            </div>
            </div>
            <div className="w-full items-start flex py-5 justify-start px-5 gap-3 flex-col border-neutral-800 bg-neutral-900/50 border rounded">
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
