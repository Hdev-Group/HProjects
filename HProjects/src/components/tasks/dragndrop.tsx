import { Critical, High, Medium, Low, Security, Feature } from '../dropdowns/priorities/critical';
import { BackLog, Todo, InProgress, Done } from '../dropdowns/status/status';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useQuery } from "convex/react";
import { useState, useEffect } from 'react';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "../../components/ui/hover-card";

function CardFrame({ taskId, taskName, taskPriority, taskStatus, taskAssignee, taskDescription, onDragStart, onDragEnd, onDragOver, onDrop }: { taskId: string, taskName: string, taskPriority: string, taskStatus: string, taskAssignee: string, taskDescription: string, onDragStart: (event: React.DragEvent<HTMLDivElement>, taskId: string) => void, onDragEnd: () => void, onDragOver: (event: React.DragEvent<HTMLDivElement>, status: string, position: number) => void, onDrop: (event: React.DragEvent<HTMLDivElement>, status: string) => void }) {
    const [assigneeData, setAssigneeData] = useState<{ firstName: string, lastName: string, imageUrl: string } | null>(null);
    const router = useRouter();
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

    return (
        <HoverCard>
        <HoverCardTrigger>
        <div
            className='border-neutral-800 bg-neutral-900/60 cursor-pointer hover:border-neutral-300 transition-all py-2 border gap-3 flex flex-col rounded-md w-full'
            onDoubleClick={() => taskmainmenu(taskId)}
            draggable
            onDragStart={(e) => onDragStart(e, taskId)}
            onDragEnd={onDragEnd}
        >
            <div className='flex gap-3 pl-4'>
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
        <div className='border-neutral-800 cursor-pointer hover:border-neutral-300 transition-all py-2 gap-3 flex flex-col rounded-md w-full'>
            <div className='flex gap-3 pl-4 flex-col'>
            <div className='flex gap-3 pr-3 items-center'>
                    {assigneeData ? (
                        <>
                            <img src={assigneeData.imageUrl} className='w-6 h-6 rounded-full' alt="Assignee" />
                            <div>
                                <h2 className='font-semibold'>{assigneeData.firstName} {assigneeData.lastName}</h2>
                                <p className='text-xs text-neutral-400'>Lead Developer</p>
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
                    {taskStatus === 'done' && <Done />}
                </div>

            </div>
            <div className='flex gap-3 pl-4'>
                <p className='text-sm max-w-[500px] text-wrap'>
                    {taskDescription}
                </p>
            </div>
            </div>
        </HoverCardContent>
        </HoverCard>
    );
}

export default function MainHolder({ _id, taskFilter }) {
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

    const projectTasks = tasks.filter(task => task.projectid === _id && task.taskTitle.toLowerCase().includes(taskFilter.toLowerCase()));

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

    const renderDropZone = (status: string) => (
        <div 
            className={`flex flex-col border px-2 pb-4 rounded-md border-neutral-600 w-full lg:w-1/4 ${dragOverStatus === status ? 'border-green-500' : ''}`}
            onDragOver={(e) => onDragOver(e, status, projectTasks.filter(task => task.taskStatus === status).length)}
            onDrop={(e) => onDrop(e, status)}
        >
            <div className="mt-2 flex items-center gap-2 mb-4 pb-2">
                <h2 className="text-lg font-semibold text-black dark:text-white capitalize">{status}</h2>
                <h1 className="px-1.5 text-white dark:text-black rounded-xl bg-black dark:bg-gray-400 text-sm" id={`${status}count`}>{projectTasks.filter(task => task.taskStatus.toLowerCase() === status).length}</h1>
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
            {renderDropZone('backlog')}
            {renderDropZone('todo')}
            {renderDropZone('inprogress')}
            {renderDropZone('done')}
        </div>
    );
}
