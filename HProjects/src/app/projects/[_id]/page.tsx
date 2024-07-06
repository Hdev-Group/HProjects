"use client";
import { Critical, High, Medium, Low, Security, Feature } from '../../../components/dropdowns/priorities/critical';
import { BackLog, Todo, InProgress, Done } from '../../../components/dropdowns/status/status';
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import DashboardHeaderProjects from "../../../components/header/dashboardprojects";
import { api } from '../../../../convex/_generated/api';
import Head from "next/head";
import { useRouter } from 'next/navigation';
import SideBar from "../../../components/projectscontents/sidebar";


export default function ProjectPage({ params }: { params: { _id: string } }) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find(project => project._id === params._id);
  const projectUserId = project?.userId;
  const [activeSection, setActiveSection] = useState("Dashboard");
  const router = useRouter();
  const projectname = project?.projectName;
  const tasks = useQuery(api.tasks.get);

  useEffect(() => {
    if (!isLoaded || !projectsholder) return; // Wait until authentication state and project data are loaded

    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to sign-in page if not signed in
    } else if (!project) {
      console.log('Project not found');
      router.push('/projects');
    } else if (projectUserId !== userId) {
      console.log('User is not the project owner', projectUserId, userId);
      router.push('/projects');
    }
  }, [isLoaded, isSignedIn, projectsholder, project, projectUserId, userId, router]);

  useEffect(() => {
    if (document.getElementById('dashboardprojects')) {
      setActiveSection('Dashboard');
    }
  }, []);

  if (!isLoaded || !projectsholder) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Unauthorized</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  if (projectUserId !== userId) {
    console.log('User is not the project owner', projectUserId, userId);
    return <div>Unauthorized</div>;
  }

  if (!tasks) {
    return <div>Loading tasks...</div>;
  }

  const projectTasks = tasks.filter(task => {
    const isProjectMatch = String(task.projectid) === String(params._id);
    const isAssigneeMatch = String(task.taskAssignee) === String(project?.userId);

    if (task.taskStatus === 'done') {
      return false;
    }

    return isProjectMatch && isAssigneeMatch;
  });

  console.log('Filtered tasks:', projectTasks);
  console.log(user?.firstName, project?.projectName, projectUserId, userId);

  function taskMainMenu(taskId: string) {
    router.push(`${project._id}/${taskId}`);
  }

  return (
    <>
      <Head>
        <title>HProject | Static Title</title>
      </Head>

      <div className="overflow-hidden h-screen">
        <DashboardHeaderProjects projectname={projectname} projectid={project?._id} />
        <div className="flex mt-[130px] h-full">
          <SideBar _id={params._id} activeSection={activeSection} />
          <div className="flex w-full justify-center">
            <div className="max-w-10/12 w-[100%] p-5 overflow-y-auto">
              <h1 className="flex text-2xl font-bold mb-3" id="dashboardprojects">Dashboard</h1>
              <div className="w-full items-start flex py-5 justify-start px-5 gap-3 flex-col border-neutral-800 bg-neutral-900/50 border rounded">
                <h2 className="text-lg font-semibold">Hello {user?.firstName}! Your work queue.</h2>
                <div className="overflow-y-auto w-full">
                  <table className="min-w-[20rem] w-[100%] caption-bottom text-sm mt-5 ">
                    <thead className="w-[100rem] border-b-neutral-100">
                      <tr className="border-b w-[100rem] group transition-colors data-[state=selected]:bg-muted hover:bg-transparent">
                        <th className="py-2 text-left">Task</th>
                        <th className="py-2 text-left">Assigned To</th>
                        <th className="py-2 text-left">Priority</th>
                        <th className="py-2 text-left">Status</th>
                        <th className="py-2 text-left">Due Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100/10 p-2">
                      {projectTasks.map(task => (
                        <tr key={task._id} onClick={() => taskMainMenu(task._id)} className="group transition-colors data-[state=selected]:bg-muted  hover:bg-neutral-500/30 cursor-pointer">
                          <td className="py-2 text-left">{task.taskTitle}</td>
                          <td className="py-2 text-left flex items-center gap-3"><img src={user?.imageUrl} className='h-7'></img> You</td>
                          <td className="py-2 text-left">
                            {task.taskPriority === 'critical' && <Critical />}
                            {task.taskPriority === 'high' && <High />}
                            {task.taskPriority === 'medium' && <Medium />}
                            {task.taskPriority === 'low' && <Low />}
                            {task.taskPriority === 'security' && <Security />}
                            {task.taskPriority === 'Feature' && <Feature />}
                          </td>
                          <td className="py-2 text-left">
                            {task.taskStatus === 'backlog' && <BackLog />}
                            {task.taskStatus === 'todo' && <Todo />}
                            {task.taskStatus === 'inprogress' && <InProgress />}
                            {task.taskStatus === 'done' && <Done />}
                          </td>
                          <td className="py-2 text-left">{task.dueDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
