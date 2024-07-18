"use client";
import React from 'react';
import Link from 'next/link';
import {IncidentDeclaration} from './incidentdec';
import {QuickMenu} from './quickmenu';

interface SideBarProps {
  activeSection: string;
  _id: string;
}

function SideBar({ activeSection, _id }: SideBarProps) {

  const getItemClass = (section: string) =>
    `text-sm text-black dark:text-neutral-100 transition-colors font-semibold w-full hover:bg-neutral-600/30 cursor-pointer p-1.5 rounded-md ${activeSection === section ? "bg-neutral-500/20 text-black dark:text-white" : ""}`;
  return (
    <article className="w-max sticky overflow-x-hidden flex h-full flex-col justify-between min-w-[200px]  bg-bglightbars dark:bg-bgdarkbars !rounded-none overflow-auto p-2  border-transparent  border-r-neutral-600/40">

      <div className="flex flex-col fixed justify-between h-full overflow-y-auto pl-2">
        <div className=" w-full flex flex-col relative">
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
            <IncidentDeclaration _id={_id} activeSection={activeSection} />
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
            <li className='w-full flex items-center justify-end'>
            <button className='mb-3 w-7 flex h-7 justify-center items-center p-1 bg-neutral-700 rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" className='h-full w-full rotate-180' viewBox="0 0 24 24" fill="black"><path d="M8.36853 12L13.1162 3.03212L14.8838 3.9679L10.6315 12L14.8838 20.0321L13.1162 20.9679L8.36853 12Z"></path></svg>
            </button>
            </li>
          </ul>
        </div>
        <QuickMenu id={_id} />
      </div>
    </article>
  );
}

export default SideBar;
