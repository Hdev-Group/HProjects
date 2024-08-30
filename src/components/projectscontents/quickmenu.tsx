import PagerEl from './pager'
import React from 'react';
import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import { useUser, useClerk } from '@clerk/clerk-react';
import { api } from '../../../convex/_generated/api';
import { useQuery } from "convex/react";
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "../ui/context-menu"
  
export function QuickMenu({id, isSidebarClosed}: {id: string, isSidebarClosed: boolean}) {
  const { userId } = useAuth();
  const jobtitlealready = useQuery(api.getjob.get);
  const { signOut } = useClerk();
  const sidebarchecker = isSidebarClosed

    const { user: userInfo } = useUser();

    return (
      <div className="flex flex-col ml-1 gap-10  dark:bg-bgdarkbars">
        <PagerEl _id={id} isSidebarClosed={isSidebarClosed} />
          <ContextMenu>
          <ContextMenuTrigger>
            <div className="flex-row flex gap-3">
              <div className="w-[40px] h-[40px] rounded-full flex flex-row">
                <img src={userInfo?.imageUrl} alt="logo" className={`${sidebarchecker ? "h-[25px] w-[25px]" : "h-[40px] w-[40px]"} rounded-full`} />
              </div>
              {sidebarchecker ? null : (
              <div className="flex flex-col text-left justify-center">
                <h1 className="text-neutral-100 text-sm font-semibold text-left">
                  {userInfo?.firstName} {userInfo?.lastName}
                </h1>
                <p className="text-neutral-500 text-xs text-left font-semibold">
                  {jobtitlealready?.filter((jobtitlealready: any) => jobtitlealready.userid === userId && jobtitlealready.projectID === id)[0]?.jobtitle}
                </p>
              </div>
              )}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <Link href="/settings">Settings</Link>
            </ContextMenuItem>
            <ContextMenuItem>
              <div onClick={() => signOut({ redirectUrl: '/' })}>Logout</div>
            </ContextMenuItem>
          </ContextMenuContent>

        </ContextMenu>

      </div>
    );
}