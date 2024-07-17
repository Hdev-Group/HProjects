"use client";
import React from 'react';
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/clerk-react';
import PagerEl from './pager'
interface SideBarProps {
  activeSection: string;
  _id: string;
}

function SideBar({ activeSection, _id }: SideBarProps) {




  const { user } = useClerk();
  const { user: userInfo } = useUser();
  const getItemClass = (section: string) =>
    `text-sm text-black dark:text-neutral-100 transition-colors font-semibold w-full hover:bg-neutral-600/30 cursor-pointer p-1.5 rounded-md ${activeSection === section ? "bg-neutral-500/20 text-black dark:text-white" : ""}`;
  return (
    <article className="w-max sticky flex h-full flex-col justify-between min-w-[200px]  bg-bglightbars dark:bg-bgdarkbars !rounded-none overflow-auto p-2  border-transparent  border-r-neutral-600/40">
      <div className="flex flex-col fixed justify-between h-full overflow-y-auto pl-2">
        <div className=" w-full flex flex-col">
          <h2 className="font-bold text-sm text-neutral-900 dark:text-neutral-300">Navigation</h2>
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
        <div className="flex flex-col gap-10 mb-[7rem]  pb-4 dark:bg-bgdarkbars">
            <PagerEl _id={_id} />
          <div className='flex-row flex gap-4'>
            <div className='w-[40px] h-[40px] rounded-full flex flex-row'>
              <img src={userInfo?.imageUrl} alt="logo" className="w-[40px] h-[40px] rounded-full" />
            </div>
            <div className='flex flex-col text-left justify-center'>
              <h1 className='dark:text-neutral-100 text-neutral-900 text-sm font-semibold text-left'>{userInfo?.firstName} {userInfo?.lastName}</h1>
              <p className="dark:text-neutral-500 text-neutral-600 text-xs text-left font-semibold">Lead Developer</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default SideBar;
