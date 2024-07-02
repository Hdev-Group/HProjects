"use client";
import React from 'react';
import Link from 'next/link';

interface SideBarProps {
  activeSection: string;
  _id: string;
}

function SideBar({ activeSection, _id }: SideBarProps) {
  const getItemClass = (section: string) =>
    `text-sm text-neutral-300 transition-colors font-semibold w-[100%] hover:bg-neutral-600/30 cursor-pointer p-1 rounded-md ${activeSection === section ? "bg-neutral-600/20 text-white" : ""}`;
  return (
    <article className="w-[15%] min-w-[200px] overflow-y-auto border border-transparent border-b-neutral-600/40 border-r-neutral-600/40">
      <div className="p-5 pt-3">
        <h2 className="font-bold">Information</h2>
        <ul className="mt-4 space-y-2 pb-4">
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
          <li key="roadmap" className={getItemClass("Roadmap")}>
            <Link href={`/projects/${encodeURIComponent(_id)}/roadmap`}>
              Roadmap
            </Link>
          </li>
        </ul>
        <h2 className="font-bold pt-3 border border-transparent border-t-neutral-300/30">Manage</h2>
        <ul className="mt-4 space-y-2 pb-4">
          <li key="feedback" className={getItemClass("Feedback")}>
            <Link href={`/projects/${encodeURIComponent(_id)}/feedback`}>
              Feedback
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
        </ul>
        <h2 className="font-bold pt-3 border border-transparent border-t-neutral-300/30">Logs</h2>
        <ul className="mt-4 space-y-2 pb-4">
          <li key="activity" className={getItemClass("Activity")}>
            <Link href={`/projects/${encodeURIComponent(_id)}/activity`}>
              Activity
            </Link>
          </li>
          <li key="history" className={getItemClass("History")}>
            <Link href={`/projects/${encodeURIComponent(_id)}/history`}>
              History
            </Link>
          </li>
        </ul>
        <h2 className="font-bold pt-3 border border-transparent border-t-neutral-300/30">Messaging</h2>
        <ul className="mt-4 space-y-2 pb-4">
          <li key="chat" className={getItemClass("Chat")}>
            <Link href={`/projects/${encodeURIComponent(_id)}/chat`}>
              Chat
            </Link>
          </li>
        </ul>
        <h2 className="font-bold pt-3 border border-transparent border-t-neutral-300/30">Settings</h2>
        <ul className="mt-4 space-y-2 mb-[8rem]">
          <li key="project-settings" className={getItemClass("Project settings")}>
            <Link href={`/projects/${encodeURIComponent(_id)}/project-settings`}>
              Project settings
            </Link>
          </li>
          <li key="team-settings" className={getItemClass("Team settings")}>
            <Link href={`/projects/${encodeURIComponent(_id)}/team-settings`}>
              Team settings
            </Link>
          </li>
          <li key="billing" className={getItemClass("Billing")}>
            <Link href={`/projects/${encodeURIComponent(_id)}/billing`}>
              Billing
            </Link>
          </li>
        </ul>
      </div>
    </article>
  );
}

export default SideBar;
