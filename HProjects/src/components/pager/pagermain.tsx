import React, { useState, useEffect } from 'react';
import { Pagermainon, Pagermainbreak } from './pagee';


export default function PagerMain() {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        updateTime();
        const interval = setInterval(updateTime, 60000);
        return () => clearInterval(interval);
    }, []);

    function updateTime() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedTime = `${hours}:${minutes}`;
        setCurrentTime(formattedTime);
    }

    return (
        <div className='flex flex-col w-full h-full'>
            <div className='flex gap-3 h-full'>
                <div className='w-full h-full border border-neutral-800 bg-neutral-400/20 pb-4 dark:border-neutral-700 rounded-md dark:bg-neutral-800/10'>
                    <div className='flex flex-row items-center justify-between px-3 h-full pt-4 border-b-neutral-700 border pb-4'>
                        <h1 className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Pager</h1>
                        <h1 className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>{currentTime}</h1>
                    </div>
                    <div className='flex flex-row items-center justify-between px-3 pt-4 h-full border-t-black border-b-black'>
                        <table className='w-full gap-2'>
                            <thead className='border-b-neutral-100/10 border-transparent border mb-2'>
                                <tr className='flex flex-row justify-between'>
                                    <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Name</th>
                                    <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Status</th>
                                    <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Time on Pager</th>
                                    <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Actions Called</th>
                                    <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Total Time</th>
                                    <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Time Remaining</th>
                                </tr>
                            </thead>
                            <tbody className='pt-10'>
                                <Pagermainbreak />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}