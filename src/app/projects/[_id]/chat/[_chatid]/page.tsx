"use client";
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from '../../../../../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import SideBar from "../../../../../components/projectscontents/sidebar";
import SideBarChat from "../../../../../components/chatbars/sidebarchat";

export default function MainDMs({ params }: { params: { _id: string } }) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const projectsholder = useQuery(api.projectsget.get);
  const project = projectsholder?.find(project => project._id === params._id);
  const projectname = project?.projectName;
  const projectUserId = project?.userId;
  const router = useRouter();
  const _id = params._id;

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
  const userfirstname = user?.firstName;
  const title = userfirstname + ' | Direct Messages';

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
            <SideBarChat user={user} />
            <div className="max-w-10/12 w-[100%] flex flex-col bg-bglight dark:bg-bgdark border-neutral-600/40 border rounded-3xl items-center overflow-y-auto">
            <div className="flex flex-row items-center gap-4 transition-all mt-2 w-full h-16 pl-4">
                      <img src={user?.imageUrl} alt="logo" className="w-10 h-10 rounded-full" />
                      <div className="flex flex-col gap-0.5">
                        <p className="text-md font-semibold m">{user?.firstName} {user?.lastName}</p>
                        <p className="text-sm text-neutral-500 ">Project Lead Developer</p>
                      </div>
                    </div>
              <div className="flex-col w-full gap-4 px-5 h-full justify-between mb-5 mt-5 flex">
                <div className="flex flex-col justify-end h-full">
                  <div className="flex overflow-x-hidden flex-row border bg-transparent items-center border-neutral-600/40 rounded-lg w-full">
                      <input type="text" placeholder={`Type a message to ${user?.firstName}`} className="w-full px-3 bg-transparent h-10" />
                      <button className="h-full bg-blue-500 w-10 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" className="w-5 flex" viewBox="0 0 24 24" fill="currentColor"><path d="M1.94619 9.31543C1.42365 9.14125 1.41953 8.86022 1.95694 8.68108L21.0431 2.31901C21.5716 2.14285 21.8747 2.43866 21.7266 2.95694L16.2734 22.0432C16.1224 22.5716 15.8178 22.59 15.5945 22.0876L12 14L18 6.00005L10 12L1.94619 9.31543Z"></path></svg></button>
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