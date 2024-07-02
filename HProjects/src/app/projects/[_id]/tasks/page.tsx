"use client";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import DashboardHeaderProjects from "../../../../components/header/dashboardprojects";
import { api } from '../../../../../convex/_generated/api';
import Head from "next/head";
import SideBar from "../../../../components/projectscontents/sidebar";
import AddTaskButton from "../../../../components/buttons/addtask";

export default function ProjectPage({ params }: { params: { _id: string } }) {
  const { userId } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find(project => project._id === params._id);
  const projectuserid = project?.userId;
  const [activeSection, setActiveSection] = useState("Tasks");

  useEffect(() => {
    if (document.getElementById('tasksproject')) {
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
      <div className="overflow-hidden h-screen" id="modal-root">
        <DashboardHeaderProjects projectname={project.projectName} />
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
