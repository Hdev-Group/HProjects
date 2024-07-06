"use client"
import { Critical, High, Medium, Low, Security, Feature } from '../../../../components/dropdowns/priorities/critical';
import { BackLog, Todo, InProgress, Done } from '../../../../components/dropdowns/status/status';
import SideBar from "../../../../components/projectscontents/sidebar";
import DashboardHeaderProjects from "../../../../components/header/dashboardprojects";
import Head from "next/head";
import { useState, useEffect, use } from "react";
import { api } from '../../../../../convex/_generated/api';
import { useQuery } from "convex/react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import BreadcrumbWithCustomSeparator from "../../../../components/tasks/breadcrumb";

export default function TaskFullView({ params }: { params: { _id: string, _taskid: string } }) {
    const { userId, isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();
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


    const [assigneeData, setAssigneeData] = useState<{ firstName: string, lastName: string, imageUrl: string } | null>(null);
    const [creatorData, setCreatorData] = useState<{ firstName: string, lastName: string, imageUrl: string } | null>(null);
    useEffect(() => {
        async function fetchAssigneeData() {
            if (taskAssignee) {
                try {
                    const response = await fetch(`/api/get-user?userId=${taskAssignee}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setAssigneeData(data);
                } catch (error) {
                    console.error('Error fetching assignee data:', error);
                    setAssigneeData(null);
                }
            }
        }

        fetchAssigneeData();
    }, [taskAssignee]);

    useEffect(() => {
        async function fetchcreatorData() {
            if (taskstarter) {
                try {
                    const response = await fetch(`/api/get-user?userId=${taskstarter}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setCreatorData(data);
                } catch (error) {
                    console.error('Error fetching assignee data:', error);
                    setCreatorData(null);
                }
            }
        }
        fetchcreatorData();
    }, [taskstarter]);


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
                    <div className="flex w-full justify-center h-full scroll-pb-10">
                        <div className="max-w-9/12 w-[100%] p-5 flex flex-col items-center overflow-y-auto">
                            <div className='w-full flex pb-5 border border-transparent justify-center border-b-neutral-700/40'>
                            <div className='flex flex-col w-full gap-4 items-center'>
                            <div className="flex w-10/12 pt-4 gap-4 flex-row justify-between">
                                <div className='w-max flex flex-col gap-5'>
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
                                <div className='w-full flex items-center justify-center pb-80'>
                                    <div className='flex flex-col justify-start w-10/12 gap-2 mt-3'>
                                        <div className='flex flex-col gap-3'>
                                            <div className='flex flex-col gap-1'>
                                                <p className='font-bold'>Task Created By:</p>
                                                <div className='flex items-center gap-2'>
                                                <img src={creatorData?.imageUrl} className='w-8 h-8 rounded-full' alt="Assignee" />
                                                <p className='font-semibold'>{creatorData?.firstName} {creatorData?.lastName}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-1'>
                                                <p className='font-bold'>Assignee:</p>
                                                <div className='flex items-center gap-2'>
                                                <img src={assigneeData?.imageUrl} className='w-8 h-8 rounded-full' alt="Assignee" />
                                                <p className='font-semibold'>{assigneeData?.firstName} {assigneeData?.lastName}</p>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-1 w-full '>
                                                <p className='font-semibold'>Task Description</p>
                                                <div className='w-full'>
                                                    <textarea className='p-2 w-full rounded-md min-h-[10rem] border border-neutral-700 bg-transparent' id='descriptioner'>{taskDescription}</textarea>
                                                </div>
                                            </div>
                                            <div className='flex flex-col gap-4 border border-transparent border-t-neutral-700/40 pt-3'>
                                                <p className='text-3xl'>Comments:</p>
                                                <div className='w-full flex flex-col gap-10'>
                                                    <div className='border-2 border-neutral-700 bg-neutral-700/40 flex justify-center items-center rounded-md min-h-[10rem]'>
                                                        <p className='font-semibold text-lg'>No comments yet, be the first to comment on this task</p>
                                                    </div>
                                                    <div className='border-dashed border p-4 flex gap-4 flex-col justify-center rounded-md hover:border-neutral-200 transition-all'>
                                                    <textarea className='p-2 w-full rounded-md min-h-[5rem] border border-neutral-700 bg-transparent' id='descriptioner' placeholder="Thanks for the task! I will get on it now.">
                                                        
                                                    </textarea>
                                                    <button className='bg-neutral-500/40 hover:bg-neutral-500/60 transition-all p-2 max-w-[10rem] rounded-md'>Comment</button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
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
