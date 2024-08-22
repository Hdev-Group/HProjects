"use client";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from '../../../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import SideBar from "../../../../../components/projectscontents/sidebar";
import ChatSelector from "../../../../../components/quickchat/quickchatselector";
import MainChat from "../../../../../components/chatbars/mainchat";
import { useMutation } from "convex/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../components/ui/dropdown-menu";

interface Chat {
  _id: string;
  userId: string;
  otherchatter: string;
  projectid: string;
}

export default function MainDMs({ params }: { params: { _id: string } }) {
  const chatstart = useMutation(api.startchat.create);
  const getchat = useQuery(api.getchat.get);
  const id = params._id;

  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find((project: any) => project._id === params._id);
  const filteredgetchat = getchat?.filter((chat: Chat) => 
    (chat.projectid === id && chat.userId === userId) || 
    (chat.projectid === id && chat.otherchatter === userId)
  );
  const projectname = project?.projectName;
  const projectUserId = project?.userId;
  const router = useRouter();
  const _id = params._id;
  const [taskAssignee, setTaskAssignee] = useState('');

  const [taskFilter, setTaskFilter] = useState('');
  const [activeSection, setActiveSection] = useState("Chat");

  useEffect(() => {
    if (document.getElementById('Chat')) {
      setActiveSection('Chat');
    }
  }, []);

  useEffect(() => {
    if (!isLoaded || !projectsholder) return;

    if (!isSignedIn) {
      router.push('/sign-in');
    } else if (!project) {
      router.push('/projects');
    }
  }, [isLoaded, isSignedIn, projectsholder, project, projectUserId, userId, router]);

  if (!isLoaded || !projectsholder) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <div>Unauthorized</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  if (!(projectUserId === userId || project.otherusers.includes(userId))) {
    return <div>Unauthorized</div>;
  }
  function submitchat() {
    if (taskAssignee && taskAssignee !== '' && taskAssignee !== null) {
      try {
        const taskAssigneeArray: any = JSON.parse(taskAssignee);

        if (taskAssigneeArray.length >= 3) {
          const assigneeId: string = taskAssigneeArray[0];
          const assigneeName: string = taskAssigneeArray[1];

          const assigneeExists = filteredgetchat?.some((chat: Chat) => chat.userId === userId);
          if (assigneeExists) {
            console.warn('Direct message with this user already exists.');
          } else {
            chatstart({
              userId: userId!,
              otherchatter: assigneeId,
              projectid: id,
              chatupdated: new Date().toISOString(),
            });
          }
        } else {
          console.error('Invalid taskAssignee structure:', taskAssigneeArray);
        }
      } catch (error) {
        console.error('Error parsing taskAssignee:', error);
      }
    } else {
      console.warn('Invalid taskAssignee or User already exists in DMs');
    }
  }


  const title = projectname + ' | Direct Messages';

  return (
    <>
      <head>
        <title>{title}</title>
        <meta name="description" content="Plan, Build and Push with confidence" />
        <meta name="keywords" content="HProjects, Projects, Build, Plan, Push" />
      </head>
      <div className="h-screen overflow-hidden  bg-bglight dark:bg-bgdark " id="modal-root">
        <div className="flex h-full bg-bglightbars dark:bg-bgdarkbars">
        <SideBar _id={params._id} activeSection={activeSection} projectname={projectname} />
        <div className="flex w-full bg-black border mt-0.5 gap-2  rounded-l-3xl">
            <div className="w-full border bg-bglight text-black dark:text-white dark:bg-bgdark border-l-transparent rounded-3xl border-neutral-600/40">
                <div className="flex items-center justify-start pl-4 border  border-transparent border-b-neutral-600/40 py-4">
                    <h1 className="font-semibold text-xl">Direct Messages</h1>
                </div>
                <div className="flex flex-col gap-2 mt-3 w-full justify-start items-start">
                <div className="flex flex-row px-2 w-full h-full gap-1 items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="">
                          <div className="border px-3  hover:bg-blue-400 transition-all rounded-sm text-2xl flex items-center justify-center font-extrabold">
                            <p className="mb-1">+</p>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <div className="flex flex-row gap-2">
                            <ChatSelector
                              id={id}
                              value={taskAssignee}
                              onValueChange={(value: string) => setTaskAssignee(value)}
                            />
                            <button onClick={submitchat} className="w-16 h-10 bg-primary-500 text-black dark:text-white font-semibold rounded-md border transition-all hover:bg-blue-300 dark:hover:bg-blue-600">Chat</button>
                            </div>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            New Group Chat
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                    </div>
                  <div className="w-full flex flex-col gap-1">
                    <MainChat id={_id} />
                  </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    </>
    );
}