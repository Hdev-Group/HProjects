"use client"
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from '../../../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import SideBar from "../../../../../components/projectscontents/sidebar";
import SideBarChat from "../../../../../components/chatbars/sidebarchat";
import Chatside from "../../../../../components/chatbars/chatside";
import MessageSubmitter from "../../../../../components/quickchat/MessageSubmitter";


export default function MainDMs({ params }: { params: { _id: string, _chatid: string } }) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const chats = useQuery(api.getchat.get);
  const router = useRouter();
  const _id = params._id;

  // Memoize the project
  const project = useMemo(() => {
    return projectsholder?.find(project => project._id === params._id);
  }, [projectsholder, params._id]);

  // Memoize the chat
  const chat = useMemo(() => {
    return chats?.find((chat: any) => _id === chat.projectid && chat._id === params._chatid);
  }, [chats, _id, params._chatid]);

  const [assigneeData, setAssigneeData] = useState<any | null>(null);

  // Memoize fetchAssigneeData
  const fetchAssigneeData = useCallback(async () => {
    if (chat?.userId === userId || chat?.otherchatter === userId) {
      try {
        const otherchatter = chat?.userId === userId ? chat?.otherchatter : chat?.userId ;
        console.log(`Fetching data for assignee with ID: ${otherchatter}`);
        const response = await fetch(`/api/get-user?userId=${otherchatter}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Assignee data:", data);
        setAssigneeData(data);
      } catch (error) {
        console.error('Error fetching assignee data:', error);
        setAssigneeData(null);
      }
    }
  }, [chat, userId]);

  useEffect(() => {
    if (!isLoaded || !projectsholder) return;

    if (!isSignedIn) {
      router.push('/sign-in');
    } else if (!project) {
      router.push('/projects');
    }
  }, [isLoaded, isSignedIn, projectsholder, project, userId, router]);

  useEffect(() => {
    fetchAssigneeData();
  }, [fetchAssigneeData]);

  if (!chat) {
    const title = `Direct Messages`;

    return (
      <>
        <title>{title}</title>
        <meta name="description" content="Plan, Build and Push with confidence" />
        <meta name="keywords" content="HProjects, Projects, Build, Plan, Push" />
        <div className="h-screen overflow-hidden bg-bglight  dark:bg-bgdark" id="modal-root">
          <div className="flex h-full bg-bglightbars dark:bg-bgdarkbars">
            <SideBar _id={params._id} activeSection="Chat" projectname={project?.projectName} />
            <div className="flex w-full bg-black border mt-0.5 gap-2 rounded-l-3xl">
              <SideBarChat user={user} id={params._id} />
              <div className="max-w-10/12 w-[100%] flex flex-col bg-bglight dark:bg-bgdark border-neutral-600/40 border rounded-3xl items-center overflow-y-auto">
                <div className="flex flex-row items-center gap-4 transition-all  w-full">
                </div>
                <div className="flex-col w-full gap-4 px-5 h-full justify-between flex">
                  <div className="flex flex-col justify-center w-full items-center h-full">
                    <h1 className="text-2xl font-semibold text-black dark:text-white">Open a message to view chat</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const title = `${assigneeData?.firstName} ${assigneeData?.lastName} | Direct Messages`;
  return (
    <>
      <head>
        <title>{title}</title>
        <meta name="description" content="Plan, Build and Push with confidence" />
        <meta name="keywords" content="HProjects, Projects, Build, Plan, Push" />
      </head>
      <div className="h-screen overflow-hidden bg-bglight dark:bg-bgdark" id="modal-root">
        <div className="flex h-full bg-bglightbars dark:bg-bgdarkbars">
          <SideBar _id={params._id} activeSection="Chat" projectname={project?.projectName} />
          <div className="flex w-full bg-black border mt-0.5 gap-2 rounded-l-3xl">
            <SideBarChat user={user} id={params._id} />
            <div className="max-w-10/12 w-[100%] flex flex-col bg-bglight  dark:bg-bgdark border-neutral-600/40 border rounded-3xl items-center overflow-y-auto">
              <div className="flex flex-row items-center gap-4 transition-all  w-full">
                {chat && <Chatside chat={chat} projectid={_id} />}
              </div>
              <div className="flex-col w-full gap-4 px-5 h-full justify-between mb-5 mt-5 flex">
                <div className="flex flex-col justify-end h-full">
                  <div className="mb-5 flex flex-col h-auto w-full">
                    <div className="flex w-full justify-start flex-row items-end gap-4">
                      <img src={assigneeData?.imageUrl} alt="Assignee Avatar" className="w-8 h-8 rounded-full" />
                      <div className="flex flex-col gap-[4px]">
                        <p className="text-neutral-400 text-xs">{assigneeData?.firstName} {assigneeData?.lastName}</p>
                        <div className="w-max px-5 py-2 relative mb-2.5 rounded-sm h-auto bg-neutral-800 z-30">
                        <div className="absolute bottom-0 ml-[-10px] left-0 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-neutral-800 border-b-[10px] border-b-neutral-800 rounded-l-lg rotate-0 z-10"></div>
                        <div className="flex flex-col">
                        </div>
                          <p className="text-white text-wrap text-sm">Test Message</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full justify-end flex-row items-end gap-4">
                      <div className="flex flex-col gap-[4px]">
                        <p className="text-neutral-400 text-xs">{user?.firstName} {user?.lastName}</p>
                        <div className="w-max px-5 py-2 relative mb-2.5 rounded-sm h-auto bg-blue-600 z-30">
                        <div className="absolute bottom-0 mr-[-10px] right-0 w-0 h-0 border-l-[10px] border-l-blue-600 border-r-[10px] border-r-transparent border-b-[10px] border-b-blue-600 rounded-r-lg rotate-0 z-10"></div>
                        <div className="flex flex-col">
                        </div>
                          <p className="text-white text-wrap text-sm">Test Message</p>
                        </div>
                      </div>
                      <img src={user?.imageUrl} alt="Assignee Avatar" className="w-8 h-8 rounded-full" />
                    </div>
                  </div>
                  <div className="flex overflow-x-hidden flex-row border bg-transparent items-center border-neutral-600/40 rounded-lg w-full">
                      <input 
                        onChange={(e) => console.log(e.target.value)}
                        type="text" 
                        placeholder={`Type a message to ${assigneeData?.firstName}`} 
                        className="w-full px-3 bg-transparent h-10  text-black dark:text-white placeholder:text-black placeholder:dark:text-white"
                      />
                      <button type="submit" className="h-full bg-blue-500 hover:bg-blue-600 transition-all w-10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 flex" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M1.94619 9.31543C1.42365 9.14125 1.41953 8.86022 1.95694 8.68108L21.0431 2.31901C21.5716 2.14285 21.8747 2.43866 21.7266 2.95694L16.2734 22.0432C16.1224 22.5716 15.8178 22.59 15.5945 22.0876L12 14L18 6.00005L10 12L1.94619 9.31543Z"></path>
                        </svg>
                      </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
