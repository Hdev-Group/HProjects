import React, { useEffect } from 'react';
import Link from 'next/link';
import { IncidentDeclaration } from './incidentdec';
import { QuickMenu } from './quickmenu';
import '../../styles/globals.css';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';


interface SideBarProps {
  activeSection: string;
  _id: string;
  projectname: any;
}

function SideBar({ activeSection, _id, projectname }: SideBarProps) {

  const getItemClass = (section: string) =>
    `text-sm text-white dark:text-neutral-100 w-full h-full transition-colors font-semibold w-full hover:bg-neutral-600/30 cursor-pointer p-1.5 rounded-md ${activeSection === section ? "bg-neutral-500/20 text-white" : ""}`;

  return (
    <article className="w-max hidden sticky overflow-x-hidden md:flex h-full flex-col justify-between min-w-[200px] md:w-10 bg-bglightbars dark:bg-bgdarkbars !rounded-none overflow-auto p-2 border-transparent border-r-neutral-600/40">
      <ProgressBar
        height="1px"
        color="#89bff8"
        options={{ showSpinner: true }}
        shallowRouting
      />
      <div className="flex flex-col fixed justify-between h-full  overflow-y-auto pl-2">
        <div className='flex flex-col gap-1'>
          <div className="flex flex-col w-full">
            <div className="flex items-center gap-2 mt-4">
            <a href='/dashboard' className='w-full transition-all hover:bg-neutral-600/20 py-2 flex items-center justify-center rounded-lg '>
              <h1 className="text-lg font-bold text-white">{projectname}</h1>
              </a>
            </div>
          </div>
        <div className="w-full flex flex-col relative">
          <ul className="mt-4 space-y-2 w-full flex flex-col">
            <li key="dashboard" className={getItemClass("Dashboard")}>
              <Link className='w-full h-full' href={`/projects/${encodeURIComponent(_id)}`}>
                <p className='w-full h-full'>Dashboard</p>
              </Link>
            </li>
            <li key="plan" className={getItemClass("Plan")}>
              <Link className='w-full h-full' href={`/projects/${encodeURIComponent(_id)}/plan`}>
                <p className='w-full h-full'>Plan</p>
              </Link>
            </li>
            <li key="tasks" className={getItemClass("Tasks")}>
              <Link className='w-full h-full' href={`/projects/${encodeURIComponent(_id)}/tasks`}>
              <p className='w-full h-full'>Tasks</p>
              </Link>
            </li>
            <IncidentDeclaration _id={_id} activeSection={activeSection} />
            <li key="changelog" className={getItemClass("changelog")}>
              <Link className='w-full h-full' href={`/projects/${encodeURIComponent(_id)}/changelog`}>
              <p className='w-full h-full'>Changelog</p>
              </Link>
            </li>
            <li key="finances" className={getItemClass("Finances")}>
              <Link className='w-full h-full' href={`/projects/${encodeURIComponent(_id)}/finances`}>
              <p className='w-full h-full'>Finances</p>
              </Link>
            </li>
            <li key="activity" className={getItemClass("Activity")}>
              <Link href={`/projects/${encodeURIComponent(_id)}/activity`}>
              <p className='w-full h-full'>Activity</p>
              </Link>
            </li>
            <li key="pager" className={getItemClass("pager")}>
              <Link href={`/projects/${encodeURIComponent(_id)}/pager`}>
              <p className='w-full h-full'>Pager</p>
              </Link>
            </li>
            <li key="chat" className={getItemClass("Chat")}>
              <Link href={`/projects/${encodeURIComponent(_id)}/chat`}>
              <p className='w-full h-full'>Chat</p>
              </Link>
            </li>
            <li key="project-settings" className={getItemClass("Project settings")}>
              <Link href={`/projects/${encodeURIComponent(_id)}/project-settings`}>
              <p className='w-full h-full'>Settings</p>
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
