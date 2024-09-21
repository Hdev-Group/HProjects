"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from '../../../../../../convex/_generated/api';
import React, { useEffect, useState } from "react";
import SideBar from "../../../../../components/projectscontents/sidebar";
import { PageeActive, PageeBreak} from "../../../../../components/pager/pagee";
import FeedBackMain from "../../../../../components/feedback/feedbackmain";
interface Project {
    _id: string;
    userId: string;
    otherusers: string[];
    projectName: string;
}

export default function FeedBackPage({ params }: { params: { _id: string, slug: string[] } }) {
    const { userId, isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();
    const projectsholder = useQuery(api.projectsget.get);
    const project = projectsholder?.find((project: Project) => project._id === params._id);
    const projectUserId = project?.userId;
    const projectname = project?.projectName;
    const [activeSection, setActiveSection] = useState("feedback");

    useEffect(() => {
        if (!isLoaded || !projectsholder) return; // Wait until authentication state and project data are loaded

        if (!isSignedIn) {
            router.push('/sign-in'); // Redirect to sign-in page if not signed in
        } else if (!project) {
            router.push('/projects');
        } else if (projectUserId !== userId && !project.otherusers.includes(userId)) {
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

    const title = projectname + ' | Feedback';

    return (
        <>
            <head>
                <title>{title}</title>
                <meta name="description" content="Plan, Build and Push with confidence" />
                <meta name="keywords" content="HProjects, Projects, Build, Plan, Push" />
            </head>
            <div className="overflow-hidden h-screen" id="modal-root">
                <div className="flex h-full bg-bglightbars dark:bg-bgdarkbars">
                <SideBar _id={params._id} activeSection={activeSection} projectname={projectname} />
                <div className="flex w-full justify-center bg-bglight border mt-0.5 dark:bg-bgdark rounded-l-3xl">
                        <div className="w-full bg-bglight dark:bg-bgdark rounded-l-3xl">
                            <div className='flex flex-col'>
                            <div className="flex-col w-full dark:border-b-neutral-800 border-b-neutral-900 border-transparent border gap-4 justify-between mb-5 pb-5 mt-5 flex">
                                <div className="px-7 flex flex-row items-center gap-2">
                                    <div className="p-1 dark:bg-neutral-600/20 text-black dark:text-white rounded-md border">
                                        <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM4 18.3851L5.76282 17H20V5H4V18.3851ZM11 13H13V15H11V13ZM11 7H13V12H11V7Z"></path></svg>
                                    </div>
                                    <h1 className="flex text-2xl font-bold text-black dark:text-white" id="tasksproject">Feedback</h1>
                                </div>
                            </div>
                                <div className='w-full h-full flex flex-col  px-5'>
                                    <div className='flex flex-col gap-4'>
                                        {/* here we will add all the feedbacks */}
                                        <FeedBackMain projectid={params._id} />
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
