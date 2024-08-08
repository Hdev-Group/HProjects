"use client";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from '../../../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import SideBar from "../../../../../components/projectscontents/sidebar";
import SideBarChat from "../../../../../components/chatbars/sidebarchat";
import Chatside from "../../../../../components/chatbars/chatside";
import MessageSubmitter from "../../../../../components/quickchat/MessageSubmitter";

interface Message {
  _id: string;
  userId: string;
  message: string;
  createdAt: string;
}

interface Chat {
  _id: string;
  messages: Message[];
  userId: string;
  otherchatter: string;
  projectid: string;
}

interface Project {
  _id: string;
  projectName: string;
  userId: string;
  otherusers: string[];
}

export default function MainDMs({ params }: { params: { _id: string, _chatid: string } }) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find(project => project._id === params._id);
  const chats = useQuery(api.getchat.get);
  const router = useRouter();
  const _id = params._id;
  const chat = chats?.find(chat => _id === chat.projectid && chat._id === params._chatid);

  const [assigneeData, setAssigneeData] = useState<any | null>(null);

  useEffect(() => {
    if (!isLoaded || !projectsholder) return;

    if (!isSignedIn) {
      router.push('/sign-in');
    } else if (!project) {
      router.push('/projects');
    }
  }, [isLoaded, isSignedIn, projectsholder, project, userId, router]);

  useEffect(() => {
    async function fetchAssigneeData() {
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
    }

    fetchAssigneeData();
  }, [chat, userId]);

if (!chat) {
  const title = `Direct Messages`;

  return(
    <>
      <title>{title}</title>
      <meta name="description" content="Plan, Build and Push with confidence" />
      <meta name="keywords" content="HProjects, Projects, Build, Plan, Push" />
    <div className="h-screen overflow-hidden bg-bglight dark:bg-bgdark" id="modal-root">
      <div className="flex h-full bg-bglightbars dark:bg-bgdarkbars">
        <SideBar _id={params._id} activeSection="Chat" projectname={project?.projectName} />
        <div className="flex w-full bg-black border mt-0.5 gap-2 rounded-l-3xl">
          <SideBarChat user={user} id={params._id} />
          <div className="max-w-10/12 w-[100%] flex flex-col bg-bglight dark:bg-bgdark border-neutral-600/40 border rounded-3xl items-center overflow-y-auto">
            <div className="flex flex-row items-center gap-4 transition-all  w-full">
            </div>
            <div className="flex-col w-full gap-4 px-5 h-full justify-between flex">
              <div className="flex flex-col justify-center w-full items-center h-full">
                  <h1 className="text-2xl font-semibold">Open a message to view chat</h1>
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
            <div className="max-w-10/12 w-[100%] flex flex-col bg-bglight dark:bg-bgdark border-neutral-600/40 border rounded-3xl items-center overflow-y-auto">
              <div className="flex flex-row items-center gap-4 transition-all  w-full">
                {chat && <Chatside chat={chat} />}
              </div>
              <div className="flex-col w-full gap-4 px-5 h-full justify-between mb-5 mt-5 flex">
                <div className="flex flex-col justify-end h-full">
                  <div className="flex overflow-x-hidden flex-row border bg-transparent items-center border-neutral-600/40 rounded-lg w-full">
                    <form className="flex flex-row w-full h-full">
                      <input 
                        type="text" 
                        placeholder={`Type a message to ${assigneeData?.firstName}`} 
                        className="w-full px-3 bg-transparent h-10"
                      />
                      <button type="submit" className="h-full bg-blue-500 hover:bg-blue-600 transition-all w-10 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 flex" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M1.94619 9.31543C1.42365 9.14125 1.41953 8.86022 1.95694 8.68108L21.0431 2.31901C21.5716 2.14285 21.8747 2.43866 21.7266 2.95694L16.2734 22.0432C16.1224 22.5716 15.8178 22.59 15.5945 22.0876L12 14L18 6.00005L10 12L1.94619 9.31543Z"></path>
                        </svg>
                      </button>
                    </form>
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
