"use client";
import React from 'react';
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import DashboardHeaderProjects from "../../../components/header/dashboardprojects";
import { api } from '../../../../convex/_generated/api';
import Head from "next/head";
import SideBar from "../../../components/projectscontents/sidebar";

export default function ProjectPage({ params }: { params: { _id: string } }) {
  const { userId } = useAuth();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find(project => project._id === params._id);
  const projectuserid = project?.userId;

  if (!project) {
    return <div>Project not found</div>;
  }

  if (projectuserid !== userId) {
    return <div>Unauthorized</div>;
  }
  
  return (
    <>
<Head>
  <title>HProject | Static Title</title>
</Head>

      <div className="overflow-hidden h-screen">
        <DashboardHeaderProjects projectname={project.projectName} />
        <div className="flex mt-[130px] h-full">
          <SideBar />
          <div className="w-full p-5 overflow-y-auto">
            <h1>{project.projectName}</h1>
            <p>{project.projectDescription}</p>
            <p>Status: {project.projectStatus}</p>
          </div>
        </div>
      </div>
    </>
  );
}