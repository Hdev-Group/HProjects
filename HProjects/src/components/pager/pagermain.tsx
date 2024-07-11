import React, { useState, useEffect } from 'react';
import { Pagermainon, Pagermainbreak } from './pagee';
import { api } from '../../../convex/_generated/api';
import { useQuery } from 'convex/react';

interface PagerMainProps {
    id: string;
}

export default function PagerMain({ id }: PagerMainProps) {
    const pagerholder = useQuery(api.pagerget.get);
    const pager = pagerholder?.find((pager) => pager.projectid === id);
    const pageruuid = pager?.userId;
    const [pageruuidData, setpageruuidData] = useState<{ firstName: string; lastName: string } | null>(null);

    useEffect(() => {
        async function fetchAssigneeData() {
            if (pageruuid) {
                try {
                    const response = await fetch(`/api/get-user?userId=${pageruuid}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    setpageruuidData(data);
                } catch (error) {
                    console.error('Error fetching assignee data:', error);
                    setpageruuidData(null);
                }
            }
        }

        fetchAssigneeData();
    }, [pageruuid]);

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(interval);
    }, []);

    function formatTime(minutes: number): string {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins < 10 ? '0' + mins : mins}m`;
    }

    const PagerDetailAdder = pagerholder?.filter(pager => pager.projectid === id).map((pager) => {
        const pagerStartTime = new Date(pager._creationTime);
        const pagerEndTime = new Date(pager.time);
        const totalTime = Math.floor((pagerEndTime.getTime() - pagerStartTime.getTime()) / 60000); // in minutes
        const elapsedTime = Math.floor((currentTime.getTime() - pagerStartTime.getTime()) / 60000); // in minutes
        const remainingTime = totalTime - elapsedTime;

        if (pager.status === 'active') {
            return (
                <tr key={pager.id} className='flex flex-row justify-between !border-green-400 bg-green-400/20 border p-1 rounded-md'>
                    <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>
                        {pageruuidData?.firstName} {pageruuidData?.lastName}
                    </td>
                    <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>On Call</td>
                    <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{formatTime(elapsedTime)}</td>
                    <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{formatTime(totalTime)}</td>
                    <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{formatTime(remainingTime)}</td>
                </tr>
            );
        } else if (pager.status === 'break') {
            return (
                <tr key={pager.id} className='flex flex-row items-start justify-between !border-yellow-200 my-1 bg-yellow-400/20 border p-1 rounded-md'>
                    <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{pageruuidData?.firstName} {pageruuidData?.lastName}</td>
                    <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>Break</td>
                    <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{formatTime(elapsedTime)}</td>
                    <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{formatTime(totalTime)}</td>
                    <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{formatTime(remainingTime)}</td>
                </tr>
            );
        }
        return null;
    });

    return (
        <div className='flex flex-col w-full h-full'>
            <div className='flex gap-3 h-full'>
                <div className='w-full h-full border border-neutral-800 bg-neutral-400/20 pb-4 dark:border-neutral-700 rounded-md dark:bg-neutral-800/10'>
                    <div className='flex flex-row items-center justify-between px-3 h-full pt-4 border-b-neutral-700 border pb-4'>
                        <h1 className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Pager</h1>
                        <h1 className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h1>
                    </div>
                    <div className='flex flex-row items-center justify-between px-3 pt-4 h-full border-t-black border-b-black'>
                        <table className='w-full gap-2'>
                            <thead className='border-b-neutral-100/10 border-transparent border mb-2'>
                                <tr className='flex flex-row justify-between'>
                                    <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Name</th>
                                    <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Status</th>
                                    <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Time on Pager</th>
                                    <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Total Time</th>
                                    <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Time Remaining</th>
                                </tr>
                            </thead>
                            <tbody className='pt-10'>
                                {PagerDetailAdder}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
