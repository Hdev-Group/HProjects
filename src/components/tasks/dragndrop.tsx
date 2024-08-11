import { Critical, High, Medium, Low, Security, Feature } from '../dropdowns/priorities/critical';
import { BackLog, Todo, InProgress, Done } from '../dropdowns/status/status';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from "convex/react";
import { useState, useEffect } from 'react';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import ArchiveTask from '../modals/deleteTask';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "../../components/ui/hover-card";
  import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "../ui/context-menu"

  function CardFrame({ taskId, projectid, taskName, taskPriority, taskStatus, taskAssignee, taskDescription, onDragStart, onDragEnd, onDragOver, onDrop }: { taskId: string, projectid: string, taskName: string, taskPriority: string, taskStatus: string, taskAssignee: string, taskDescription: string, onDragStart: (event: React.DragEvent<HTMLDivElement>, taskId: string) => void, onDragEnd: () => void, onDragOver: (event: React.DragEvent<HTMLDivElement>, status: string, position: number) => void, onDrop: (event: React.DragEvent<HTMLDivElement>, status: string) => void }) {
    const [assigneeData, setAssigneeData] = useState<{ firstName: string, lastName: string, imageUrl: string, id: string } | null>(null);
    const router = useRouter();
    const {userId} = useAuth();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<{ taskname: string, _taskid: string, projectid: string} | null>(null);
    const jobtitlealready = useQuery(api.getjob.get);

    function closeDeleteModal() {
        setShowDeleteModal(false);
    }

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

    function taskmainmenu(taskId: string) {
        router.push(`./${taskId}`);
    }

    function handleArchiveClick() {
        setSelectedTask({ taskname: taskName, _taskid: taskId, projectid: projectid });
        setShowDeleteModal(true);
    }

    return (
        <>
            <ContextMenu>
                <ContextMenuTrigger>
                    <HoverCard>
                        <HoverCardTrigger>
                            <div
                                className='dark:border-neutral-800 border-neutral-200 bg-white dark:bg-neutral-900/60 text-black dark:text-white cursor-pointer hover:border-neutral-300 transition-all py-2 border gap-3 flex flex-col rounded-md w-full'
                                onDoubleClick={() => taskmainmenu(taskId)}
                                draggable
                                onDragStart={(e) => onDragStart(e, taskId)}
                                onDragEnd={onDragEnd}
                            >
                                <div className='flex gap-3 pl-4'>
                                    <h1 className='font-semibold'>
                                        {taskName}
                                    </h1>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='flex gap-3 pl-3'>
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
                                    <div className='flex gap-3 pr-3 items-center'>
                                        {assigneeData ? (
                                            <>
                                                <img src={assigneeData.imageUrl} className='w-6 h-6 rounded-full' alt="Assignee" />
                                            </>
                                        ) : (
                                            <div className='w-6 h-6 rounded-full bg-neutral-800 animate-pulse'></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            {taskStatus !== 'done' &&
                                <div className='border-neutral-800 cursor-pointer hover:border-neutral-300 transition-all py-2 gap-3 flex flex-col rounded-md w-full'>
                                    <div className='flex gap-3 pl-4 flex-col'>
                                        <div className='flex gap-3 pr-3 items-center'>
                                            {assigneeData ? (
                                                <>
                                                    <img src={assigneeData.imageUrl} className='w-6 h-6 rounded-full' alt="Assignee" />
                                                    <div>
                                                        <h2 className='font-semibold'>{assigneeData.firstName} {assigneeData.lastName}</h2>
                                                        <p className='text-xs text-neutral-400'>{jobtitlealready?.filter(jobtitlealready => jobtitlealready.userid === assigneeData.id)[0]?.jobtitle}</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className='w-6 h-6 rounded-full bg-neutral-800 animate-pulse'></div>
                                            )}
                                        </div>
                                        <h1 className='font-bold'>
                                            {taskName}
                                        </h1>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-3 pl-3'>
                                            {taskPriority === 'critical' && <Critical />}
                                            {taskPriority === 'high' && <High />}
                                            {taskPriority === 'medium' && <Medium />}
                                            {taskPriority === 'low' && <Low />}
                                            {taskPriority === 'security' && <Security />}
                                            {taskPriority === 'Feature' && <Feature />}
                                            {taskStatus === 'backlog' && <BackLog />}
                                            {taskStatus === 'todo' && <Todo />}
                                            {taskStatus === 'inprogress' && <InProgress />}
                                        </div>
                                    </div>
                                    <div className='flex gap-3 pl-4'>
                                        <p className='text-sm max-w-[500px] text-wrap'>
                                            {taskDescription}
                                        </p>
                                    </div>
                                </div>
                            }
                            {taskStatus === 'done' &&
                                <div className='border-neutral-800 cursor-pointer hover:border-neutral-300 transition-all py-2 gap-3 flex flex-col rounded-md w-full'>
                                    <div className='flex gap-3 pl-4 flex-col'>
                                        <div className='flex gap-3 pr-3 items-center'>
                                            {assigneeData ? (
                                                <>
                                                    <img src={assigneeData.imageUrl} className='w-6 h-6 rounded-full' alt="Assignee" />
                                                    <div>
                                                        <h2 className='font-semibold'>{assigneeData.firstName} {assigneeData.lastName}</h2>
                                                        <p className='text-xs text-neutral-400'>{jobtitlealready?.filter(jobtitlealready => jobtitlealready.userid === assigneeData.id)[0]?.jobtitle}</p>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className='w-6 h-6 rounded-full bg-neutral-800 animate-pulse'></div>
                                            )}
                                        </div>
                                        <h1 className='font-bold'>
                                            {taskName}
                                        </h1>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-3 pl-3'>
                                            {taskPriority === 'critical' && <Critical />}
                                            {taskPriority === 'high' && <High />}
                                            {taskPriority === 'medium' && <Medium />}
                                            {taskPriority === 'low' && <Low />}
                                            {taskPriority === 'security' && <Security />}
                                            {taskPriority === 'Feature' && <Feature />}
                                            {taskStatus === 'done' && <Done />}
                                        </div>
                                    </div>
                                    <div className='flex gap-3 pl-4'>
                                        <p className='text-sm max-w-[500px] text-wrap'>
                                            {taskDescription}
                                        </p>
                                    </div>
                                    <div className='flex gap-3 pl-4'>
                                        <p className='text-sm max-w-[500px] w-auto text-wrap border border-green-400 bg-green-500/20 p-1 rounded-md font-semibold flex px-2'>
                                            Task Completed - This task will be archived in 30 days.
                                        </p>
                                    </div>
                                </div>
                            }
                        </HoverCardContent>
                    </HoverCard>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem onClick={handleArchiveClick} className='cursor-pointer hover:bg-yellow-400/20 text-yellow-200'>
                        Archive {taskName}
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

            {showDeleteModal && selectedTask && (
                <ArchiveTask
                    taskname={selectedTask.taskname}
                    _taskid={selectedTask._taskid}
                    onClose={closeDeleteModal}
                    projectid={selectedTask.projectid}
                />
            )}
        </>
    );
}



export default function MainHolder({ _id, taskFilter }: { _id: string, taskFilter: string }) {
    const { user } = useUser();
    const tasks = useQuery(api.tasks.get);
    const editTaskMutation = useMutation(api.draganddrop.editTask);
    const logger = useMutation(api.updater.logger)
    const [draggingTask, setDraggingTask] = useState<string | null>(null);
    const [dragOverStatus, setDragOverStatus] = useState<string | null>(null);
    const [dragOverPosition, setDragOverPosition] = useState<number | null>(null);

    if (!tasks) {
        return null;
    }

    const projectTasks = tasks.filter(task => task.projectid === _id && task.taskTitle.toLowerCase().includes(taskFilter.toLowerCase()) && task.archived !== true);

    const onDragStart = (event: React.DragEvent<HTMLDivElement>, taskId: string) => {
        setDraggingTask(taskId);
    };

    const onDragEnd = () => {
        setDraggingTask(null);
        setDragOverStatus(null);
        setDragOverPosition(null);
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>, status: string, position: number) => {
        event.preventDefault();
        setDragOverStatus(status);
        setDragOverPosition(position);
    };

    const onDrop = async (event: React.DragEvent<HTMLDivElement>, status: string) => {
        event.preventDefault();
        const loggercurrenttime = new Date().toISOString();
        if (draggingTask) {
            await editTaskMutation({
                _id: draggingTask,
                taskStatus: status,
                lastupdated: loggercurrenttime,
            });
            await logger({
                ProjectId: _id,
                taskId: draggingTask,
                action: status,
                taskPriority: tasks.find(task => task._id === draggingTask).taskPriority,
                taskAssignee: tasks.find(task => task._id === draggingTask).taskAssignee,
                usercommited: user.id,
                timestamp: loggercurrenttime,
            });
            setDraggingTask(null);
            setDragOverStatus(null);
            setDragOverPosition(null);
        }
    };

    const renderTasksByStatus = (status: string) => (
        projectTasks.filter(task => task.taskStatus === status).map((task, index) => (
            <div
                key={task._id}
                onDragOver={(e) => onDragOver(e, status, index)}
            >
                {dragOverStatus === status && dragOverPosition === index && (
                    <div className="h-1 bg-green-500"></div>
                )}
                <CardFrame 
                    projectid={_id}
                    taskId={task._id}
                    taskName={task.taskTitle}
                    taskPriority={task.taskPriority}
                    taskStatus={task.taskStatus}
                    taskAssignee={task.taskAssignee}
                    taskDescription={task.taskDescription}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                />
            </div>
        ))
    );

    const renderDropZone = ({status, name}: {status: string, name: string}) => (
        <div 
            className={`flex flex-col dark:border px-3 py-2 pb-4 rounded-md dark:bg-transparent bg-neutral-100/80 dark:border-neutral-900 w-full lg:w-1/4 ${dragOverStatus === status ? 'border-green-500' : ''}`}
            onDragOver={(e) => onDragOver(e, status, projectTasks.filter(task => task.taskStatus === status).length)}
            onDrop={(e) => onDrop(e, status)}
        >
            <div className="mt-2 flex items-center gap-2 mb-4 pb-2">
                <h2 className="text-lg font-semibold text-black dark:text-white capitalize">{name}</h2>
                <h1 className="px-1.5 text-black dark:text-white bg-neutral-100 dark:bg-neutral-800 border-neutral-400 border dark:border-neutral-600 rounded-sm text-sm" id={`${status}count`}>{projectTasks.filter(task => task.taskStatus.toLowerCase() === status).length}</h1>
            </div>
            <div className='flex flex-col gap-2'>
                {renderTasksByStatus(status)}
                {dragOverStatus === status && dragOverPosition === projectTasks.filter(task => task.taskStatus === status).length && (
                    <div className="h-1 bg-green-500"></div>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex-row justify-between mb-5 flex lg:flex-nowrap flex-wrap w-full sm:gap-5 gap-1">
            {renderDropZone({status: 'backlog', name: 'Backlog'})}
            {renderDropZone({status: 'todo', name: 'To do'})}
            {renderDropZone({status: 'inprogress', name: 'In Progress'})}
            {renderDropZone({status: 'done', name: 'Done'})}
        </div>
    );
}
