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
            return <p className='font-semibold critical rounded-md p-1' id='loadingidassigneenames'>{seconds} {seconds === 1 ? 'second' : 'seconds'} ago</p>;
        } else if (minutes < 20) {
            return <p className='font-semibold critical rounded-md p-1' id='loadingidassigneenames'>{minutes} {minutes === 1 ? 'minute' : 'minutes'} ago</p>;
        } else if (minutes < 60) {
            return <p className='font-semibold medium rounded-md p-1' id='loadingidassigneenames'>{minutes} {minutes === 1 ? 'minute' : 'minutes'} ago</p>;
        } else if (hours < 24) {
            return <p className='font-semibold critical rounded-md p-1' id='loadingidassigneenames'>{hours} {hours === 1 ? 'hour' : 'hours'} ago</p>;
        } else {
            return <span>{`${days} ${days === 1 ? 'day' : 'days'} ago`}</span>;
        }
    }

    const title = taskName + ' | ' + projectname + ' | Task Details';

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
                <div className="flex w-full justify-center bg-bglight border  border-t-black mt-0.5 dark:bg-bgdark rounded-l-3xl">
                    <div className="max-w-10/12 w-[100%] overflow-y-auto p-5 flex flex-col items-center">
                    <div className="flex-row w-full px-5 justify-between mb-5 mt-5 flex">
                                <div className='flex flex-col w-full gap-4 items-center '>
                                    <div className="flex w-full md:w-10/12 pt-4 gap-4 flex-row justify-between">
                                        <div className='w-full flex gap-3 flex-col'>
                                            {archived && <div className='font-semibold medium w-full rounded-md px-5 py-2 cursor-pointer hover:bg-orange-200/30 transition-all hover:border-orange-600' onClick={taskunarchive}><h1 className="text-2xl">{taskName} is archived</h1> <p className="font-normal text-xs">Click here to unarchive</p></div>}
                                        <div className='flex flex-row gap-3 mt-3 items-center h-8 w-50'>
                                            {!archived &&
                                            <>
                                            <div className="flex-row flex gap-2">
                                            <div className='flex justify-center items-center dark:text-white text-black cursor-pointer hover:bg-neutral-500/60 flex-row  bg-neutral-500/20 border hover:border-neutral-300 h-auto p-1 px-2 rounded-sm w-auto gap-2 transition-all' onClick={edittask}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 flex" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path></svg> <p className="md:block hidden">Edit</p>
                                            </div>
                                            <div className='flex justify-center items-center cursor-pointer hover:bg-red-500/60 gap-2 bg-red-500/80 border hover:border-neutral-300 h-auto p-1 px-2 rounded-sm w-auto flex-row transition-all' onClick={deletetasktrigger}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="flex w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path></svg> <p className="md:block hidden">Delete</p>
                                            </div>
                                            </div>
                                            </>
                                            }
                                        </div>
                                            <BreadcrumbWithCustomSeparator projectid={_id} />
                                            <div className='flex flex-col gap-2'>
                                                <div className='flex flex-col'>
                                                    <h1 className="font-bold text-3xl dark:text-white text-black text-wrap">{taskName}</h1>
                                                </div>
                                                
                                                <div className='flex gap-3 mt-1 w-full flex-row'>
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-full flex items-center justify-center pb-80'>
                                        <div className='flex flex-col justify-start w-full md:w-10/12 gap-2 mt-3'>
                                            <div className='flex flex-col gap-3'>
                                                <div className='flex flex-col gap-1'>
                                                    <p className='font-bold dark:text-white text-black'>Created:</p>
                                                    <div className='flex items-center gap-2'>
                                                        {formatTimeAgo(new Date(task._creationTime))}
                                                    </div>
                                                </div>                                        
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
            {showDeleteModal && <ArchiveTask onClose={closeDeleteModal} _taskid={taskid} projectid={_id} taskname={taskName}/>}
            </div>
        </>
    );
}
