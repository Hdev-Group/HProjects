import React, { useState, useEffect } from 'react';
import { api } from '../../../convex/_generated/api';
import { useQuery } from 'convex/react';
import AddPagerButton from "../../components/buttons/addpager";

export interface Pager {
  id: string;
  projectid: string;
  userId: string;
  _creationTime: string;
  time: string;
  status: 'active' | 'break' | 'inactive';
}

interface User {
  firstName: string;
  lastName: string;
}

interface PagerMainProps {
  id: string;
}

export default function PagerMain({ id }: PagerMainProps) {
  const pagerholder: Pager[] | undefined = useQuery(api.pagerget.get);

  const [userData, setUserData] = useState<{ [key: string]: User | null }>({});
  const [nameFilter, setNameFilter] = useState('');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    async function fetchUserData() {
      if (pagerholder) {
        const uniqueUserIds = Array.from(new Set(pagerholder.map(pager => pager.userId)));
        const userPromises = uniqueUserIds.map(async (userId) => {
          try {
            const response = await fetch(`/api/get-user?userId=${userId}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data: User = await response.json();
            return { userId, data };
          } catch (error) {
            console.error('Error fetching user data:', error);
            return { userId, data: null };
          }
        });

        const results = await Promise.all(userPromises);
        const userDataMap: { [key: string]: User | null } = {};
        results.forEach(({ userId, data }) => {
          userDataMap[userId] = data;
        });

        setUserData(userDataMap);
        console.log("User Data Map:", userDataMap); // Debugging line to check the user data being fetched
      }
    }

    fetchUserData();
  }, [pagerholder]);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  function formatTime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins < 10 ? '0' + mins : mins}m`;
  }

  const PagerDetailAdder = pagerholder
    ?.filter(pager => pager.projectid === id)
    .filter(pager => {
      const user = userData[pager.userId];
      if (!user) return false;
      const name = `${user.firstName} ${user.lastName}`.toLowerCase();
      return name.includes(nameFilter.toLowerCase());
    })
    .sort((a, b) => {
      const userA = userData[a.userId];
      const userB = userData[b.userId];
      const nameA = userA ? `${userA.firstName} ${userA.lastName}`.toLowerCase() : '';
      const nameB = userB ? `${userB.firstName} ${userB.lastName}`.toLowerCase() : '';
      return nameA.localeCompare(nameB);
    })
    .map((pager) => {
      const user = userData[pager.userId];
      if (!user) return null;

      console.log("Rendering Pager:", pager, "User Data:", user); // Debugging line to ensure correct user data is used for each pager

      const pagerStartTime = new Date(pager._creationTime);
      const pagerEndTime = new Date(pager.time);
      const totalTime = Math.floor((pagerEndTime.getTime() - pagerStartTime.getTime()) / 60000);
      const elapsedTime = Math.floor((currentTime.getTime() - pagerStartTime.getTime()) / 60000);
      const remainingTime = totalTime - elapsedTime;

      if (pager.status === 'active') {
        return (
          <tr key={pager.id} className='flex flex-row !border-green-400 bg-green-400/20 border px-2 py-2 rounded-md'>
            <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left w-[25%] min-w-[5rem]'>
              {user.firstName} {user.lastName}
            </td>
            <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left w-[20%] min-w-[5rem]'>On Call</td>
            <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left w-[25%] min-w-[5rem]'>{formatTime(elapsedTime)}</td>
            <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left w-[25%] min-w-[5rem]'>{formatTime(totalTime)}</td>
            <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left w-[0%] min-w-[5rem]'>{formatTime(remainingTime)}</td>
          </tr>
        );
      } else if (pager.status === 'break') {
        return (
          <tr key={pager.id} className='flex flex-row items-start justify-between !border-yellow-200 my-1 bg-yellow-400/20 border p-1 rounded-md'>
            <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left w-[25%] min-w-[5rem]'>{user.firstName} {user.lastName}</td>
            <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left w-[20%] min-w-[5rem]'>Break</td>
            <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left w-[25%] min-w-[5rem]'>{formatTime(elapsedTime)}</td>
            <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left w-[25%] min-w-[5rem]'>{formatTime(totalTime)}</td>
            <td className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left w-[0%] min-w-[5rem]'>{formatTime(remainingTime)}</td>
          </tr>
        );
      }
      return null;
    });

  return (
    <div className='flex flex-col w-full h-full'>
      <div className='flex gap-3 h-full'>
        <div className='w-full h-full border bg-neutral-400/20 dark:bg-neutral-900 pb-4 rounded-md'>
          <div className='flex flex-row items-center justify-between px-3 h-full pt-4 border-b-neutral-700 pb-4'>
            <h1 className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Pager</h1>
            <h1 className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h1>
          </div>
          <div className='flex flex-col items-left gap-5 justify-between px-3 pt-4 h-full border-t-black border-b-black'>
            <div className='flex flex-row w-full justify-between gap-2'>
              <AddPagerButton id={id} />
              <input
                type='text'
                placeholder='Filter by name'
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className='dark:bg-neutral-800 bg-white border border-neutral-300 dark:border-neutral-700 w-full max-w-[15rem] rounded px-2 py-1'
              />
            </div>
            <table className='w-full gap-2 p-2'>
              <thead className='border-b-neutral-100/10 border-transparent border mb-2 rounded-lg bg-slate-400/20 dark:bg-neutral-800/70'>
                <tr className='flex flex-row justify-between py-2 px-2'>
                  <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Name</th>
                  <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Status</th>
                  <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Time on Pager</th>
                  <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Total Time</th>
                  <th className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold'>Time Remaining</th>
                </tr>
              </thead>
              <tbody className='pt-10 flex flex-col gap-2 mt-[-2rem]'>
                {PagerDetailAdder}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
