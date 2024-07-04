"use client"
import { Critical, High, Medium, Low, Security, Feature } from '../../../../components/dropdowns/priorities/critical';
import { BackLog, Todo, InProgress, Done } from '../../../../components/dropdowns/status/status';
import SideBar from "../../../../components/projectscontents/sidebar";
import DashboardHeaderProjects from "../../../../components/header/dashboardprojects";
import Head from "next/head";
import { useState } from "react";
import { api } from '../../../../../convex/_generated/api';
import { useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import router from 'next/router';
import BreadcrumbWithCustomSeparator from "../../../../components/tasks/breadcrumb";

export default function TaskFullView({ params }: { params: { _id: string, _taskid: string } }) {
    const { userId, isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const projectsholder = useQuery(api.projectsget.get);
    const project = projectsholder?.find(project => project._id === params._id);
    const tasks = useQuery(api.tasks.get);
    const task = tasks?.find(task => task._id === params._taskid);
    const taskPriority = task?.taskPriority;
    const taskStatus = task?.taskStatus;
    const taskAssignee = task?.taskAssignee;
    const taskDescription = task?.taskDescription;
    const taskName = task?.taskTitle;
    const taskstarter = task?.userId;
    const projectname = project?.projectName;
    const projectUserId = project?.userId;

    const _id = params._id;
    const taskid = params._taskid;
    const [activeSection, setActiveSection] = useState("Tasks");

    useEffect(() => {
        if (!isLoaded || !projectsholder || !tasks) return; // Wait until authentication state and data are loaded

        if (!isSignedIn) {
            router.push('/sign-in'); // Redirect to sign-in page if not signed in
        } else if (!project) {
            console.log('Project not found');
            router.push('/projects');
        } else if (projectUserId !== userId) {
            console.log('User is not the project owner', projectUserId, userId);
            router.push('/projects');
        } else if (!task) {
            console.log('Task not found');
            router.push(`/projects/${_id}`);
        }
    }, [isLoaded, isSignedIn, projectsholder, project, tasks, task, projectUserId, userId, router]);

    if (!isLoaded || !projectsholder || !tasks) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <div>Unauthorized</div>;
    }

    if (!project) {
        return <div>Project not found</div>;
    }

    if (!task) {
        return <div>Task not found</div>;
    }

    function edittask() {
        // Implement edit task functionality
    }

    return (
        <>
            <Head>
                <title>HProject | Static Title</title>
            </Head>
            <div className="h-screen overflow-hidden" id="modal-root">
                <DashboardHeaderProjects projectname={projectname} activeSection={""} />
                <div className="flex mt-[130px] h-full">
                    <SideBar _id={params._id} activeSection={activeSection} />
                    <div className="flex w-full justify-center">
                        <div className="max-w-9/12 w-[100%] p-5 flex flex-col items-center overflow-y-auto">
                            <div className='w-full flex pb-5 border-dashed border-2 border-transparent justify-center border-b-neutral-700/40'>
                                <div className="flex w-10/12 pt-4 gap-4 flex-col">
                                    <BreadcrumbWithCustomSeparator projectid={_id} />
                                    <div className='flex flex-col gap-2'>
                                        <div className='flex flex-col'>
                                            <h1 className="font-bold text-3xl">{taskName}</h1>
                                        </div>
                                        <div className='flex gap-3 mt-1'>
                                            {taskPriority === 'critical' && <Critical />}
                                            {taskPriority === 'high' && <High />}
                                            {taskPriority === 'medium' && <Medium />}
                                            {taskPriority === 'low' && <Low />}
                                            {taskPriority === 'security' && <Security />}
                                            {taskPriority === 'Feature' && <Feature />}
                                            {taskStatus === 'backlog' && <BackLog />}
                                            {taskStatus === 'todo' && <Todo />}
                                            {taskStatus === 'inprogress' && <InProgress />}
                                            {taskStatus === 'done' && <Done />}
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-row gap-3 mt-3'>
                                    <div className='flex justify-center items-center cursor-pointer hover:bg-neutral-500/60 bg-neutral-500/20 border hover:border-neutral-300 h-7 p-0.5 rounded-lg w-7 transition-all' onClick={edittask}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path></svg>
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
