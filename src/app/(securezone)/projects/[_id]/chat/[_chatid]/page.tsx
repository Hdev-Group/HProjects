"use client"
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from '../../../../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import SideBar from "../../../../../../components/projectscontents/sidebar";
import SideBarChat from "../../../../../../components/chatbars/sidebarchat";
import Chatside from "../../../../../../components/chatbars/chatside";
import MessageSubmitter from "../../../../../../components/quickchat/MessageSubmitter";
import ComposerChat from "../../../../../../components/chatmsg/composerchat";


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

  const title = `${assigneeData?.firstName} ${assigneeData?.lastName} | Direct Messages` || "Direct Messages";
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
                    <ComposerChat chatId={params._chatid} projectid={params._id} assigneeData={assigneeData} user={user}  />
                  </div>
                  <div className="flex overflow-x-hidden flex-row border bg-transparent items-center border-neutral-600/40 rounded-lg w-full">
                    <MessageSubmitter chatid={params._chatid} _id={params._id}  />
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
