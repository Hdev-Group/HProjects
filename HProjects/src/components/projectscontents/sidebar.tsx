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
  const {user: userInfo} = useUser();
  const getItemClass = (section: string) =>
    `text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md ${activeSection === section ? "bg-neutral-600/20 text-white" : ""}`;
  return (
    <article className="w-[15%] relitive flex flex-col justify-between min-w-[200px] bg-neutral-950 overflow-y-auto border-4 border-transparent border-b-neutral-100 border-r-neutral-600/40">
      <div className='flex flex-col fixed justify-between h-full '>
      <div className="p-5 pt-3">
        <h2 className="font-bold text-sm text-neutral-300">Navigation</h2>
        <ul className="mt-4 space-y-2 flex flex-col">
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
      <div className='flex gap-2 mb-[8rem] p-5'>
          <div>
            <img src={userInfo?.imageUrl} alt="logo" className="w-[40px] h-[40px] rounded-full" />
          </div>
          <div className='flex flex-col  text-left justify-center'>
            <h1 className='text-neutral-100 text-sm text-left'>{userInfo?.firstName} {userInfo?.lastName}</h1>
            <p className="text-neutral-500 text-xs text-left font-semibold">Lead Developer</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default SideBar;
