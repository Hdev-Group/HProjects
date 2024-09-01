import { api } from '../../../convex/_generated/api';
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Critical, High, Medium, Low } from "../../components/dropdowns/priorities/critical";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "../../components/ui/hover-card";
  



export default function IncidentMainHold(projectid, taskFilter) {
    const Router = useRouter();
    const [assigneeData, setAssigneeData] = useState(null);
    const incidents = useQuery(api.incident.get);
    const jobtitlealready = useQuery(api.getjob.get);
    useEffect(() => {
        async function fetchAssigneeData() {
            incidents?.forEach(async (incident) => {
                if (incident.reporterid) {
                    try {
                        const response = await fetch(`/api/get-user?userId=${incident.reporterid}`);
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
            });
        }

        fetchAssigneeData();
    }, [incidents]);





    const renderincidentbystatus = (status) => {
        if (!incidents) return null; // Ensure incidents are available
        
    
        return incidents.filter(incident => incident.status === status).map((incident) => {
            function taskmainmenu(taskId) {
                Router.push(`/projects/${projectid.id}/incident/${taskId}`);
            }
    
            const jobTitle = jobtitlealready?.find((jobtitle) => jobtitle.userid === assigneeData?.id)?.jobtitle;
    
            return (
                <HoverCard key={incident._id}>
                    <HoverCardTrigger>
                        <div
                            className={`dark:border-neutral-800 border-neutral-200 bg-white dark:bg-neutral-900/60 text-black dark:text-white cursor-pointer hover:border-neutral-300 transition-all py-2 border gap-3 flex flex-col rounded-md w-full`}
                            onDoubleClick={() => taskmainmenu(incident._id)}
                        >
                            <div className='flex gap-3 px-4'>
                                <h1 className='font-semibold'>
                                    {incident.title}
                                </h1>
                            </div>
                            <div className='flex w-full justify-between'>
                                <div className='flex gap-3 w-full justify-between px-3 items-center'>
                                    <p className='text-sm'>
                                        {incident.priority === 'low' ? <Low /> : incident.priority === 'medium' ? <Medium /> : incident.priority === 'high' ? <High /> : <Critical />}
                                    </p>
                                    {assigneeData ? (
                                        <img src={assigneeData.imageUrl} className='w-6 h-6 rounded-full' alt="Assignee" />
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
                                                <p className='text-xs text-neutral-400'>{jobTitle}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className='w-6 h-6 rounded-full bg-neutral-800 animate-pulse'></div>
                                    )}
                                </div>
                                <h1 className='font-bold'>
                                    {incident.title}
                                </h1>
                            </div>
                            <div className='flex justify-between'>
                                <div className='flex gap-3 pl-3'>
                                    {incident.priority === 'critical' && <Critical />}
                                    {incident.priority === 'high' && <High />}
                                    {incident.priority === 'medium' && <Medium />}
                                    {incident.priority === 'low' && <Low />}
                                </div>
                            </div>
                            <div className='flex gap-3 pl-4'>
                                <p className='text-sm max-w-[500px] text-wrap'>
                                    {incident.summary}
                                </p>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            );
        });
    }

    const renderkaban = (name, status) => {
        return (
            <div className='w-full'>
                        <div 
                            className={`flex flex-col dark:border px-3 py-2 pb-4 rounded-md dark:bg-transparent bg-neutral-100/80 dark:border-neutral-900 w-autp`}>
                            <div className="mt-2 flex items-center gap-2 mb-4 pb-2">
                                <h2 className="text-lg font-semibold text-black dark:text-white capitalize flex flex-row items-center gap-2 justify-center">{name}</h2>
                                <h1 className="px-1.5 text-black dark:text-white bg-neutral-100 dark:bg-neutral-800 border-neutral-400 border dark:border-neutral-600 rounded-sm text-sm" id={`${status}count`}>{incidents?.filter(task => task.status.toLowerCase() === status).length}</h1>
                            </div>
                            <div className='flex flex-col gap-2'>
                                {renderincidentbystatus(status)}
                            </div>
                        </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col md:flex-row gap-4 w-full">
            {renderkaban('Active Incidents', 'active')}
            {renderkaban('Paused', 'paused')}
            {renderkaban('Resolved Incidents', 'resolved')}
        </div>
    )
}