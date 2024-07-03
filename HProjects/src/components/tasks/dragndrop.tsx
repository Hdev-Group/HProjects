import { Critical, High, Medium, Low, Security, Feature } from '../dropdowns/priorities/critical';
import { BackLog, Todo, InProgress, Done } from '../dropdowns/status/status';
import { api } from '../../../convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useQuery } from "convex/react";
import { useState, useEffect } from 'react';

function CardFrame({ taskName, taskPriority, taskStatus, taskAssignee, taskDescription }: any) {
    const { user } = useUser();
    const [assigneeImageUrl, setAssigneeImageUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchAssigneeImage = async () => {
            if (taskAssignee) {
                try {
                    const response = await fetch(`/api/getAssigneeImage?userId=${taskAssignee}`);
                    const data = await response.json();
                    setAssigneeImageUrl(data.imageUrl);
                } catch (error) {
                    console.error('Error fetching assignee image:', error);
                }
            }
        };

        fetchAssigneeImage();
    }, [taskAssignee]);

    return (
        <div className='border-neutral-800 bg-neutral-900/60 py-2 border gap-3 flex flex-col rounded-md w-full'>
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
                    {taskPriority === 'feature' && <Feature />}
                    {taskStatus === 'backlog' && <BackLog />}
                    {taskStatus === 'todo' && <Todo />}
                    {taskStatus === 'inprogress' && <InProgress />}
                    {taskStatus === 'done' && <Done />}
                </div>
                <div className='flex gap-3 pr-3 items-center'>
                    <img src={assigneeImageUrl ?? ''} className='w-6 h-6 rounded-full' alt="Assignee" />
                </div>
            </div>
        </div>
    );
}

export default function MainHolder({ _id }: { _id: string }) {
    const tasks = useQuery(api.tasks.get);
    if (!tasks) {
        console.log("No tasks found");
        return null;
    }
    console.log("id", _id)
    console.log("Fetched tasks:", tasks);

    const projectTasks = tasks.filter(task => task.projectid === _id);

    const renderTasksByStatus = (status: string) => (
        projectTasks.filter(task => task.taskStatus === status).map(task => (
            <CardFrame 
                key={task._id}
                taskName={task.taskTitle} // Ensure to use taskTitle
                taskPriority={task.taskPriority}
                taskStatus={task.taskStatus}
                taskAssignee={task.taskAssignee}
                taskDescription={task.taskDescription}
            />
        ))
    );
    console.log("Project tasks:", projectTasks);
    return (
        <div className="flex-row justify-between mb-5 flex lg:flex-nowrap flex-wrap w-full sm:gap-5 gap-1">
            <div className="flex flex-col border px-2 pb-4 rounded-md border-neutral-800 w-full lg:w-1/4">
                <div className="mt-2 flex items-center gap-2 mb-4 pb-2">
                    <h2 className="text-lg font-semibold">Backlog</h2>
                    <h1 className="px-1.5 text-black rounded-xl bg-gray-400 text-sm" id="backlogcount">{projectTasks.filter(task => task.taskStatus.toLowerCase() === 'backlog').length}</h1>
                </div>
                <div className='flex flex-col gap-2'>
                    {renderTasksByStatus('backlog')}
                </div>
            </div>
            <div className="flex flex-col border px-2 pb-4 rounded-md border-neutral-800 w-full lg:w-1/4">
                <div className="mt-2 flex items-center gap-2 mb-4 pb-2">
                    <h2 className="text-lg font-semibold">To-Do</h2>
                    <h1 className="px-1.5 text-black rounded-xl bg-gray-400 text-sm" id="todocount">{projectTasks.filter(task => task.taskStatus.toLowerCase() === 'todo').length}</h1>
                </div>
                <div className='flex flex-col gap-2'>
                    {renderTasksByStatus('todo')}
                </div>
            </div>
            <div className="flex flex-col border px-2 pb-4 rounded-md border-neutral-800 w-full lg:w-1/4">
                <div className="mt-2 flex items-center gap-2 mb-4 pb-2">
                    <h2 className="text-lg font-semibold">In Progress</h2>
                    <h1 className="px-1.5 text-black rounded-xl bg-gray-400 text-sm" id="inprogresscount">{projectTasks.filter(task => task.taskStatus.toLowerCase() === 'inprogress').length}</h1>
                </div>
                <div className='flex flex-col gap-2'>
                    {renderTasksByStatus('inprogress')}
                </div>
            </div>
            <div className="flex flex-col border px-2 pb-4 rounded-md border-neutral-800 w-full lg:w-1/4">
                <div className="mt-2 flex items-center gap-2 mb-4 pb-2">
                    <h2 className="text-lg font-semibold">Finished</h2>
                    <h1 className="px-1.5 text-black rounded-xl bg-gray-400 text-sm" id="finishedcount">{projectTasks.filter(task => task.taskStatus.toLowerCase() === 'done').length}</h1>
                </div>
                <div className='flex flex-col gap-2'>
                    {renderTasksByStatus('done')}
                </div>
            </div>
            </div>
    );
}