"use client";
import React from 'react';
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/clerk-react';

interface SideBarProps {
  activeSection: string;
  _id: string;
}

function SideBar({ activeSection, _id }: SideBarProps) {
  const { user } = useClerk();
  const { user: userInfo } = useUser();
  const getItemClass = (section: string) =>
    `text-sm text-neutral-300 transition-colors font-semibold w-full hover:bg-neutral-600/30 cursor-pointer p-1.5 rounded-md ${activeSection === section ? "bg-neutral-600/20 text-white" : ""}`;
  return (
    <article className="w-max sticky flex h-full flex-col justify-between min-w-[200px] bg-neutral-950 overflow-auto border-4 border-transparent  border-r-neutral-600/40">
      <div className="flex flex-col fixed justify-between h-full overflow-y-auto pl-2">
        <div className="pt-3 w-full flex flex-col">
          <h2 className="font-bold text-sm text-neutral-300">Navigation</h2>
          <ul className="mt-4 space-y-2 w-full flex flex-col">
            <li key="dashboard" className={getItemClass("Dashboard")}>
              <Link href={`/projects/${encodeURIComponent(_id)}`}>
                Dashboard
              </Link>
            </li>
            <li key="plan" className={getItemClass("Plan")}>
              <Link href={`/projects/${encodeURIComponent(_id)}/plan`}>
                Plan
              </Link>
            </li>
            <li key="tasks" className={getItemClass("Tasks")}>
              <Link href={`/projects/${encodeURIComponent(_id)}/tasks`}>
                Tasks
              </Link>
            </li>
            <li key="incident" className={getItemClass("incident")}>
              <Link href={`/projects/${encodeURIComponent(_id)}/incident`}>
                Incidents
              </Link>
            </li>
            <li key="changelog" className={getItemClass("Changelog")}>
              <Link href={`/projects/${encodeURIComponent(_id)}/changelog`}>
                Changelog
              </Link>
            </li>
            <li key="finances" className={getItemClass("Finances")}>
              <Link href={`/projects/${encodeURIComponent(_id)}/finances`}>
                Finances
              </Link>
            </li>
            <li key="activity" className={getItemClass("Activity")}>
              <Link href={`/projects/${encodeURIComponent(_id)}/activity`}>
                Activity
              </Link>
            </li>
            <li key="pager" className={getItemClass("pager")}>
              <Link href={`/projects/${encodeURIComponent(_id)}/pager`}>
                Pager
              </Link>
            </li>
            <li key="chat" className={getItemClass("Chat")}>
              <Link href={`/projects/${encodeURIComponent(_id)}/chat`}>
                Chat
              </Link>
            </li>
            <li key="project-settings" className={getItemClass("Project settings")}>
              <Link href={`/projects/${encodeURIComponent(_id)}/project-settings`}>
                Settings
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-10 mt-4 mb-[8rem] bg-neutral-950 pb-4">
          <Link href={`/projects/${encodeURIComponent(_id)}/pager`}>
          <div id="pageroncall" className="w-max flex items-center justify-center">
            <div className='border border-green-400 bg-green-400/20 pr-5 items-center h-[4rem] w-full flex rounded-lg'>
              <div className='pl-2 flex justify-center items-center h-full'>
                <div className='w-1.5 h-[3rem] flex items-center justify-center rounded-lg bg-green-400'></div>
              </div>
              <div className='pl-3 h-max flex justify-center flex-col text-left'>
                <h1 className='font-semibold text-md text-left'>You're on pager</h1>
                <p className='text-neutral-300 text-xs'>For the next 24 hours</p>
              </div>
            </div>
          </div>
          </Link>
          <div className='flex-row flex gap-4'>
            <div className='w-[40px] h-[40px] rounded-full flex flex-row'>
              <img src={userInfo?.imageUrl} alt="logo" className="w-[40px] h-[40px] rounded-full" />
            </div>
            <div className='flex flex-col text-left justify-center'>
              <h1 className='text-neutral-100 text-sm text-left'>{userInfo?.firstName} {userInfo?.lastName}</h1>
              <p className="text-neutral-500 text-xs text-left font-semibold">Lead Developer</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default SideBar;
