import { Critical, High, Medium, Low, Security, Feature } from '../dropdowns/priorities/critical';
import { BackLog, Todo, InProgress, Done } from '../dropdowns/status/status';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useQuery } from "convex/react";
import { useState, useEffect } from 'react';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';

function CardFrame({ taskId, taskName, taskPriority, taskStatus, taskAssignee, taskDescription, onDragStart, onDragEnd, onDragOver, onDrop }) {
    const { user } = useUser();
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
    );
}

export default function MainHolder({ _id, taskFilter }) {
    const tasks = useQuery(api.tasks.get);
    const editTaskMutation = useMutation(api.draganddrop.editTask);
    const [draggingTask, setDraggingTask] = useState<string | null>(null);
    const [dragOverStatus, setDragOverStatus] = useState<string | null>(null);

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
    };

    const onDragOver = (event: React.DragEvent<HTMLDivElement>, status: string) => {
        event.preventDefault();
        setDragOverStatus(status);
    };

    const onDrop = async (event: React.DragEvent<HTMLDivElement>, status: string) => {
        event.preventDefault();
        if (draggingTask) {
            await editTaskMutation({
                taskId: draggingTask,
                taskStatus: status,
            });
            setDraggingTask(null);
            setDragOverStatus(null);
        }
    };

    const renderTasksByStatus = (status: string) => (
        projectTasks.filter(task => task.taskStatus === status).map(task => (
            <CardFrame 
                key={task._id}
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
        ))
    );

    const renderDropZone = (status: string) => (
        <div 
            className={`flex flex-col border px-2 pb-4 rounded-md border-neutral-600 w-full lg:w-1/4 ${dragOverStatus === status ? 'border-green-500' : ''}`}
            onDragOver={(e) => onDragOver(e, status)}
            onDrop={(e) => onDrop(e, status)}
        >
            <div className="mt-2 flex items-center gap-2 mb-4 pb-2">
                <h2 className="text-lg font-semibold text-black dark:text-white capitalize">{status}</h2>
                <h1 className="px-1.5 text-white dark:text-black rounded-xl bg-black dark:bg-gray-400 text-sm" id={`${status}count`}>{projectTasks.filter(task => task.taskStatus.toLowerCase() === status).length}</h1>
            </div>
            <div className='flex flex-col gap-2'>
                {renderTasksByStatus(status)}
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
