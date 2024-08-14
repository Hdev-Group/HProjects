"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from '../../../../../../convex/_generated/api';
import React, { useEffect, useState } from "react";
import DashboardHeaderProjects from "../../../../../components/header/dashboardprojects";
import SideBar from "../../../../../components/projectscontents/sidebar";
import PagerMain from "../../../../../components/pager/pagermain";
import { PageeActive, PageeBreak} from "../../../../../components/pager/pagee";

export default function Pager({ params }: { params: { _id: string, slug: string[] } }) {
    const { userId, isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();
    const projectsholder = useQuery(api.projectsget.get);
    const project = projectsholder?.find(project => project._id === params._id);
    const projectUserId = project?.userId;
    const projectname = project?.projectName;
    const [activeSection, setActiveSection] = useState("pager");

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

    const title = projectname + ' | Pager';

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
                                        <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.38231 5.9681C7.92199 4.73647 9.87499 4 12 4C14.125 4 16.078 4.73647 17.6177 5.9681L19.0711 4.51472L20.4853 5.92893L19.0319 7.38231C20.2635 8.92199 21 10.875 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 10.875 3.73647 8.92199 4.9681 7.38231L3.51472 5.92893L4.92893 4.51472L6.38231 5.9681ZM13 12V7.4952L8 14H11V18.5L16 12H13ZM8 1H16V3H8V1Z"></path></svg>
                                    </div>
                                    <h1 className="flex text-2xl font-bold text-black dark:text-white" id="tasksproject">Pager</h1>
                                </div>
                            </div>
                                <div className='w-full h-full px-5'>
                                    <div className='items-center flex justify-center mt-10 h-full gap-4'>
                                        <PagerMain id={params._id} />
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
