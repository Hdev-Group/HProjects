"use client";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from '../../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import SideBar from "../../../../components/projectscontents/sidebar";
import ChatSelector from "../../../../components/quickchat/quickchatselector";
import MainChat from "../../../../components/chatbars/mainchat";


export default function MainDMs({ params }: { params: { _id: string } }) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find(project => project._id === params._id);
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
                <div className="flex flex-col gap-2 mt-3">
                  <ChatSelector
                    id={_id}
                    value={taskAssignee}
                    onValueChange={setTaskAssignee}
                  />
                  <MainChat id={_id} />
                </div>
            </div>
            </div>
        </div>
    </div>
    </>
    );
}