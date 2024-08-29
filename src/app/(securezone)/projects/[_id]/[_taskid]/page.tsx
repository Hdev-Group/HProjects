"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useQuery, useMutation } from "convex/react";
import { useUser, useAuth } from "@clerk/nextjs";
import { api } from '../../../../../../convex/_generated/api';
import {
    Critical, High, Medium, Low, Security, Feature,
} from '../../../../../components/dropdowns/priorities/critical';
import {
    BackLog, Todo, InProgress, Done,
} from '../../../../../components/dropdowns/status/status';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "../../../../../components/ui/hover-card";
import SideBar from "../../../../../components/projectscontents/sidebar";
import BreadcrumbWithCustomSeparator from "../../../../../components/tasks/breadcrumb";
import ArchiveTask from '../../../../../components/modals/deleteTask';
import CommentBox from '../../../../../components/comments/commentbox';
import CommentBoxer from '../../../../../components/comments/commentboxer';
import PriorityStatus from '../../../../../components/dropdowns/priority';
import StatusTime from '../../../../../components/dropdowns/status';
import QuickChat from '../../../../../components/quickchat/quickchat';

export default function TaskFullView({ params }: { params: { _id: string, _taskid: string } }) {
    const { userId, isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();
    const jobtitlealready = useQuery(api.getjob.get);
    const projectsholder = useQuery(api.projectsget.get);
    const project = projectsholder?.find((project: any) => project._id === params._id);
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
    const [assigneeData, setAssigneeData] = useState<{ firstName: string, lastName: string, imageUrl: string, id: string } | null>(null);
    const [creatorData, setCreatorData] = useState<{ firstName: string, lastName: string, imageUrl: string, id: string } | null>(null);
    const [isLoadingAssignee, setIsLoadingAssignee] = useState(false);
    const [isLoadingCreator, setIsLoadingCreator] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [priority, setPriority] = useState(taskPriority);
    const [status, setTaskStatus] = useState(taskStatus);
    const [description, setDescription] = useState(taskDescription);
    const logger = useMutation(api.updater.logger)
    const editTaskMutation = useMutation(api.taskupdate.editTask);
    // archive checks
    var archived = false;
    if (task?.archived === true) {
        archived = true;
    }

    useEffect(() => {
        async function fetchAssigneeData() {
            if (taskAssignee) {
                try {
                    setIsLoadingAssignee(true);
                    const response = await fetch(`/api/get-user?userId=${taskAssignee}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setAssigneeData(data);
                } catch (error) {
                    console.error('Error fetching assignee data:', error);
                    setAssigneeData(null);
                } finally {
                    setIsLoadingAssignee(false);
                }
            }
        }

        fetchAssigneeData();
    }, [taskAssignee]);

    useEffect(() => {
        async function fetchCreatorData() {
            if (taskstarter) {
                try {
                    setIsLoadingCreator(true);
                    const response = await fetch(`/api/get-user?userId=${taskstarter}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setCreatorData(data);
                } catch (error) {
                    console.error('Error fetching creator data:', error);
                    setCreatorData(null);
                } finally {
                    setIsLoadingCreator(false);
                }
            }
        }
        fetchCreatorData();
    }, [taskstarter]);

    useEffect(() => {
        if (!isLoaded || !projectsholder || !tasks) return; // Wait until authentication state and data are loaded

        if (!isSignedIn) {
            router.push('/sign-in'); // Redirect to sign-in page if not signed in
        } else if (!project) {
            router.push('/projects');
        } else if (projectUserId !== userId && !project.otherusers.includes(userId)) {
            router.push('/projects');
        } else if (!task) {
            router.push(`/projects/${_id}`);
        }
    }, [isLoaded, isSignedIn, projectsholder, project, tasks, task, projectUserId, userId, router]);

    useEffect(() => {
        if (priority !== taskPriority || status !== taskStatus || description !== taskDescription) {
            const currenttime = new Date().toISOString();
            const updateTask = async () => {
                try {
                    await editTaskMutation({
                        _id: taskid,
                        taskPriority: priority,
                        taskStatus: status,
                        taskDescription: description,
                        taskAssignee: taskAssignee
                    });
                    await logger({
                        ProjectId: _id,
                        taskId: taskid,
                        action: status !== taskStatus ? status : null,
                        taskPriority: priority !== taskPriority ? priority : null,
                        taskAssignee: taskAssignee !== task.taskAssignee ? taskAssignee : null,
                        usercommited: user?.id,
                        timestamp: currenttime,
                    });
                } catch (error) {
                    console.error("Failed to update task:", error);
                }
            };
            updateTask();
        }
    }, [priority, status, description]);

    if (isLoadingAssignee || isLoadingCreator) {
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
        if (isEditing) {
            setIsEditing(false);
        } else {
            setIsEditing(true);
        }        
    }

    function deletetasktrigger() {
        setShowDeleteModal(true);
    }

    function closeDeleteModal() {
        setShowDeleteModal(false);
    }


    function formatTimeAgo(date: Date): JSX.Element {
        const now = new Date();
        const diff = Math.abs(now.getTime() - date.getTime());
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
    
        if (seconds < 60) {
            return <p className='font-semibold rounded-md' id='loadingidassigneenames'>{seconds} {seconds === 1 ? 'second' : 'seconds'} ago</p>;
        } else if (minutes < 20) {
            return <p className='font-semibold rounded-md' id='loadingidassigneenames'>{minutes} {minutes === 1 ? 'minute' : 'minutes'} ago</p>;
        } else if (minutes < 60) {
            return <p className='font-semibold rounded-md' id='loadingidassigneenames'>{minutes} {minutes === 1 ? 'minute' : 'minutes'} ago</p>;
        } else if (hours < 24) {
            return <p className='font-semibold rounded-md' id='loadingidassigneenames'>{hours} {hours === 1 ? 'hour' : 'hours'} ago</p>;
        } else {
            return <span>{`${days} ${days === 1 ? 'day' : 'days'} ago`}</span>;
        }
    }

    const title = taskName + ' | ' + projectname + ' | Task Details';

    function startincident() {
        router.push(`/projects/${_id}/incident/?taskid=${taskid}?priority=${taskPriority}`);
    }
    function taskunarchive() {
        const currenttime = new Date().toISOString();
        const updateTask = async () => {
            try {
                await editTaskMutation({
                    _id: taskid,
                    archived: false
                });
                await logger({
                    ProjectId: _id,
                    taskId: taskid,
                    action: 'unarchived',
                    usercommited: user?.id,
                    timestamp: currenttime,
                });
            } catch (error) {
                console.error("Failed to update task:", error);
            }
        };
        updateTask();
    }
    return (
        <>
            <head>
                <title>{title}</title>
                <meta name="description" content="Plan, Build and Push with confidence" />
                <meta name="keywords" content="HProjects, Projects, Build, Plan, Push" />
            </head>
            <div id="modal-root" className="w-full h-full">
            <div className="h-screen bg-bglight overflow-hidden dark:bg-bgdark">
                <div className="flex  h-full bg-bglightbars dark:bg-bgdarkbars">
                <SideBar _id={params._id} projectname={projectname}  activeSection={activeSection} />
                <div className="flex w-full sticky justify-center overflow-auto bg-bglight border mt-0.5 dark:bg-bgdark rounded-l-3xl">
                        <div className="w-full bg-bglight dark:bg-bgdark rounded-l-3xl">
                            <div className='flex flex-col'>
                            <div className="flex-col w-full dark:border-b-neutral-800 border-b-neutral-900 border-transparent border gap-4 justify-between pb-5 mt-5 flex">
                                <div className="px-7 flex flex-row items-center justify-between">
                                    <div className='flex flex-row gap-2 items-center'>
                                        <div className="p-2 dark:bg-neutral-700 text-black dark:text-white rounded-md border">
                                        <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.25098 3H18.751C19.993 3 21.001 4.00737 21.001 5.25V18.75C21.001 19.992 19.9935 21 18.751 21H5.25098C4.00898 21 3.00098 19.9925 3.00098 18.75V5.25C3.00098 4.008 4.00835 3 5.25098 3ZM13.171 6.42054V12.1795C13.171 12.7762 13.6545 13.26 14.2507 13.26H17.5812C18.1776 13.26 18.661 12.7765 18.661 12.1795V6.42054C18.661 5.82384 18.1774 5.34 17.5812 5.34H14.2507C13.6543 5.34 13.171 5.82348 13.171 6.42054ZM5.34098 6.42045V16.6796C5.34098 17.2762 5.82455 17.76 6.42071 17.76H9.75125C10.3476 17.76 10.831 17.277 10.831 16.6796V6.42045C10.831 5.82375 10.3474 5.34 9.75125 5.34H6.42071C5.82428 5.34 5.34098 5.82303 5.34098 6.42045Z"></path></svg>                                        </div>
                                        <div className='flex flex-col '>
                                            <p className='text-sm mb-[-6px] font-medium dark:text-white text-black'>Tasks</p>
                                            <h1 className="flex text-2xl font-bold text-black dark:text-white" id="tasksproject">{taskName}</h1>
                                        </div>
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                    <div className="flex flex-row gap-3 items-center justify-center">
                                    {!archived && 
                                    <>
                                        <div className='flex justify-center items-center dark:text-white text-black cursor-pointer hover:bg-neutral-500/60 flex-row  bg-neutral-500/20  font-semibold  border hover:border-neutral-300 h-auto p-1 px-2 rounded-sm w-auto gap-2 transition-all' onClick={edittask}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 flex" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path></svg> <p className="md:block hidden">Edit</p>
                                            </div>
                                        <div className='flex justify-center items-center cursor-pointer hover:bg-red-500/60 gap-2 bg-red-500/80 border hover:border-neutral-300 dark:text-white text-black font-semibold h-auto p-1 px-2 rounded-sm w-auto flex-row transition-all' onClick={deletetasktrigger}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="flex w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path></svg> <p className="md:block hidden">Delete</p>
                                        </div>
                                        <div className='flex justify-center items-center cursor-pointer hover:bg-red-500/60 gap-2 bg-red-500/80 border hover:border-neutral-300 dark:text-white text-black font-semibold  h-auto p-1 px-2 rounded-sm w-auto flex-row transition-all' onClick={startincident}>
                                            <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.00001 20V14C4.00001 9.58172 7.58173 6 12 6C16.4183 6 20 9.58172 20 14V20H21V22H3.00001V20H4.00001ZM6.00001 14H8.00001C8.00001 11.7909 9.79087 10 12 10V8C8.6863 8 6.00001 10.6863 6.00001 14ZM11 2H13V5H11V2ZM19.7782 4.80761L21.1924 6.22183L19.0711 8.34315L17.6569 6.92893L19.7782 4.80761ZM2.80762 6.22183L4.22183 4.80761L6.34315 6.92893L4.92894 8.34315L2.80762 6.22183Z"></path></svg>
                                            <p className="md:block hidden">Report Incident</p>
                                        </div>
                                    </>
                                    }
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full dark:bg-neutral-900 bg-neutral-200 dark:border-b-neutral-800 h-full border-transparent border gap-4 justify-between py-3 px-7 flex">
                            <div className='w-full flex gap-3 flex-col h-full'>
                                                    <div className='flex flex-col gap-2 h-full'>
                                                        <div className='flex gap-3 h-full items-center w-full flex-row'>
                                                            {isEditing ? (
                                                                <>
                                                                    <PriorityStatus 
                                                                        value={priority}
                                                                        onChange={setPriority}
                                                                    />
                                                                    <StatusTime
                                                                        value={status}
                                                                        onValueChange={setTaskStatus}
                                                                    />
                                                                </>
                                                            ) : (
                                                                <>
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
                                                                </>
                                                            )}
                                                            <div className="flex items-center flex-row dark:text-white text-black justify-center rounded-lg dark:bg-transparent bg-white border py-1 px-4">
                                                               <p className="flex flex-row gap-1"><svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM13 12V7H11V14H17V12H13Z"></path></svg> <p className="md:block hidden">Created:</p> <code className="font-semibold">{formatTimeAgo(new Date(task._creationTime))}</code></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                            </div>
                        <div className={`${archived ? "border-yellow-300" : " "} flex w-full h-full  justify-center bg-bglight flex-col mt-0.5 dark:bg-bgdark `}>
                        {archived && <div className='font-semibold medium w-full rounded-md px-7 py-2 cursor-pointer hover:bg-orange-200/30 transition-all hover:border-orange-600' onClick={taskunarchive}><h1 className="text-2xl">This task is archived</h1> <p className="font-normal text-xs">Click here to unarchive</p></div>}
                            <div className="max-w-10/12 w-[100%] px-5 flex flex-col items-center">
                            <div className="flex-row w-full px-5 justify-between mb-5 mt-5 flex">
                                        <div className='flex flex-col w-full gap-4 items-center '>
                                            <div className='w-full flex items-center justify-center pb-80'>
                                                <div className='flex flex-col justify-start  md:w-10/12 gap-2'>
                                                    <div className='flex flex-col gap-3'>                                      
                                                        <div className='flex flex-col gap-1'>
                                                            <p className='font-bold dark:text-white text-black'>Task Created By:</p>
                                                            <HoverCard>
                                                                <HoverCardTrigger>
                                                                    <div className='flex items-center gap-2'>
                                                                        <img src={creatorData?.imageUrl} className='w-8 h-8 rounded-full' alt="Assignee" id='loadingidassignee' />
                                                                        <p className='font-semibold dark:text-white text-black' id='loadingidassigneenames'>{creatorData?.firstName} {creatorData?.lastName}</p>
                                                                    </div>
                                                                </HoverCardTrigger>
                                                                <HoverCardContent className='p-2 min-w-[400px] w-max'>
                                                                    <div className='flex flex-col justify-center w-full gap-5'>
                                                                        <div className="flex flex-row items-center gap-2">
                                                                        <img src={creatorData?.imageUrl} className='w-8 h-8 rounded-full' alt="Assignee" />
                                                                        <div>
                                                                            <p className='font-semibold dark:text-white text-black'>{creatorData?.firstName} {creatorData?.lastName}</p>
                                                                            <p className='text-xs text-neutral-400'>{jobtitlealready?.filter(jobtitlealready => jobtitlealready.userid === creatorData?.id)[0]?.jobtitle}</p>
                                                                        </div>
                                                                        </div>
                                                                        <QuickChat userId={creatorData?.id} userfirst={creatorData?.firstName} />
                                                                    </div>
                                                                </HoverCardContent>
                                                            </HoverCard>
                                                        </div>
                                                        <div className='flex flex-col gap-1'>
                                                            <p className='font-bold dark:text-white text-black'>Assignee:</p>
                                                            <div className='flex items-center gap-2'>
                                                                <img src={assigneeData?.imageUrl} className='w-8 h-8 rounded-full' alt="Assignee" />
                                                                <p className='font-semibold dark:text-white text-black'>{assigneeData?.firstName} {assigneeData?.lastName}</p>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-col gap-1 w-full '>
                                                            <p className='font-semibold dark:text-white text-black'>Task Description</p>
                                                            <div className='w-full'>
                                                                <textarea 
                                                                    className='p-2 w-full rounded-md min-h-[10rem] dark:text-white text-black border border-neutral-700 bg-transparent' 
                                                                    id='descriptioner' 
                                                                    value={description}
                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                />
                                                        </div>
                                                    </div>
                                                    <div className='flex flex-col gap-4 border border-transparent border-t-neutral-700/40 pt-3'>
                                                        <p className='text-3xl dark:text-white text-black'>Comments:</p>
                                                        <div className='w-full flex flex-col'>
                                                            <div className="w-full flex flex-col">
                                                                <CommentBoxer taskId={taskid} />
                                                            </div>
                                                            <CommentBox taskId={taskid} _id={params._id} />
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
            </div>
            </div>
            {showDeleteModal && <ArchiveTask onClose={closeDeleteModal} _taskid={taskid} projectid={_id} taskname={taskName}/>}
            </div>
        </>
    );
}
