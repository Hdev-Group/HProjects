"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from '../../../../../convex/_generated/api';
import React, { useEffect, useState } from "react";
import DashboardHeaderProjects from "../../../../components/header/dashboardprojects";
import SideBar from "../../../../components/projectscontents/sidebar";
import PagerMain from "../../../../components/pager/pagermain";
import { PageeActive, PageeBreak} from "../../../../components/pager/pagee";

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



    const createPager = () => {
        console.log('Create pager function triggered');
        // Add your function logic here
    };

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
                <DashboardHeaderProjects projectname={projectname} projectid={project?._id} />
                <div className="flex mt-[110px] h-full bg-bglightbars dark:bg-bgdarkbars">
                    <SideBar _id={params._id} activeSection={activeSection} />
                    <div className="flex w-full p-5 pt-10 justify-center bg-bglight border dark:border-l-white dark:border-t-white border-t-black mt-0.5 dark:bg-bgdark rounded-l-3xl">
                        <div className="w-full bg-bglight dark:bg-bgdark rounded-l-3xl">
                            <div className='px-4 flex flex-col'>
                                <div className='flex flex-row justify-between mb-5'>
                                    <h1 className='flex text-2xl font-bold text-black dark:text-white'>Pager</h1>
                                </div>
                                <div className='w-full h-full'>
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
