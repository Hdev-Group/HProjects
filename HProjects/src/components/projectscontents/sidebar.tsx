"use client";
import React from 'react';
import Link from 'next/link';
import {IncidentDeclaration} from './incidentdec';
import {QuickMenu} from './quickmenu';
import '../../styles/globals.css';

interface SideBarProps {
  activeSection: string;
  _id: string;
  projectname: any;
}

function SideBar({ activeSection, _id, projectname }: SideBarProps) {

  const getItemClass = (section: string) =>
    `text-sm text-black dark:text-neutral-100 transition-colors font-semibold w-full hover:bg-neutral-600/30 cursor-pointer p-1.5 rounded-md ${activeSection === section ? "bg-neutral-500/20 text-black dark:text-white" : ""}`;
  return (
    <article className="w-max hidden sticky overflow-x-hidden md:flex h-full flex-col justify-between min-w-[200px] md:w-10   bg-bglightbars dark:bg-bgdarkbars !rounded-none overflow-auto p-2  border-transparent  border-r-neutral-600/40">

      <div className="flex flex-col fixed justify-between h-full  overflow-y-auto pl-2">
        <div className='flex flex-col gap-1'>
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-2 mt-4">
            <a href='/dashboard' className='w-full transition-all hover:bg-neutral-600/20 py-2 flex items-center justify-center rounded-lg '>
              <h1 className="text-lg font-bold text-black dark:text-white">{projectname}</h1>
              </a>
            </div>
          </div>
        <div className=" w-full flex flex-col relative">
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
            <li key="changelog" className={getItemClass("changelog")}>
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
        </div>        </div>

        <QuickMenu id={_id} />
      </div>
    </article>
  );
}

export default SideBar;
