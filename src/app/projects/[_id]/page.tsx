"use client";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import DashboardHeaderProjects from "../../../components/header/dashboardprojects";
import { api } from '../../../../convex/_generated/api';
import Head from "next/head";
import SideBar from "../../../components/projectscontents/sidebar";

export default function ProjectPage({ params }: { params: { _id: string } }) {
  const { userId } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find(project => project._id === params._id);
  const projectuserid = project?.userId;
  const [activeSection, setActiveSection] = useState("Dashboard");

  console.log(user?.firstName, project?.projectName, projectuserid, userId);

  useEffect(() => {
    if (document.getElementById('dashboardprojects')) {
      setActiveSection('Dashboard');
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
          <SideBar _id={params._id} activeSection={activeSection} />
          <div className="w-full p-5 overflow-y-auto">
            <h1 className="flex text-2xl font-bold mb-3" id="dashboardprojects">Dashboard</h1>
            <div className="w-full items-start flex py-5 justify-start px-5 gap-3 flex-col border-neutral-800 bg-neutral-900/50 border rounded">
              <h2 className="text-lg font-semibold">Hello {user?.firstName}! Your work queue.</h2>
              <div className="overflow-y-auto w-full">
                <table className="min-w-[20rem] w-[100%] caption-bottom text-sm mt-5 ">
                  <thead className="w-[100rem] border-b-neutral-100">
                    <tr className="border-b w-[100rem] group transition-colors data-[state=selected]:bg-muted hover:bg-transparent">
                      <th className="py-2 text-left">Task</th>
                      <th className="py-2 text-left">Assigned To</th>
                      <th className="py-2 text-left">Description</th>
                      <th className="py-2 text-left">Due Date</th>
                      <th className="py-2 text-left">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100/10">
                    <tr className="group transition-colors data-[state=selected]:bg-muted hover:bg-transparent">
                      <td className="py-2 text-left">Task 1</td>
                      <td className="py-2 text-left"></td>
                      <td className="py-2 text-left">Task 1 Description</td>
                      <td className="py-2 text-left">Due Date</td>
                      <td className="py-2 text-left">Status</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
