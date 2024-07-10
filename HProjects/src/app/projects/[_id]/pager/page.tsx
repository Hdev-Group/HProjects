"use client"
import { useRouter } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from '../../../..//../convex/_generated/api';
import React, { useEffect, useState } from "react";
import DashboardHeaderProjects from "../../../../components/header/dashboardprojects";
import SideBar from "../../../../components/projectscontents/sidebar";
import PagerMain from "../../../../components/pager/pagermain";
import AddPagerButton from "../../../../components/buttons/addpager";
import { PageeActive, PageeBreak} from "../../../../components/pager/pagee";

export default function pager({ params }: { params: { _id: string } }){
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
          console.log('Project not found');
          router.push('/projects');
        } else if (projectUserId !== userId && !project.otherusers.includes(userId)) {
          console.log('User is not the project owner', projectUserId, userId);
          router.push('/projects');
        }
      }, [isLoaded, isSignedIn, projectsholder, project, projectUserId, userId, router]);
      useEffect(() => {
        if (document.getElementById('dashboardprojects')) {
          setActiveSection('pager');
        }
      }, []);

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
        console.log('Unauthorized access attempt:', project?.otherusers);
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
        <div className="flex mt-[110px] h-full bg-[#D4D4D8] dark:bg-[#1A1A2E]">
          <SideBar _id={params._id} activeSection={activeSection} />
          <div className="flex w-full flex-grow justify-center overflow-y-auto bg-bglight dark:bg-bgdark rounded-tl-3xl">
            <div className="w-full pt-5 bg-bglight dark:bg-bgdark rounded-tl-3xl">
          <div className='px-4 flex flex-col'>
            <div className='flex flex-row justify-between mb-5'>
              <h1 className='flex text-2xl font-bold text-black dark:text-white'>Pager</h1>
            </div>
            <div className='w-full h-full'>
              <div className='flex lg:flex-row lg:justify-between lg:items-center flex-col justify-start'>
              <div className='flex md:flex-row flex-col gap-2 md:items-center'>
              <h2 className='text-md font-semibold dark:text-white text-black'>On pager now:</h2><div className='flex md:flex-row flex-col gap-2 justify-between'><PageeActive /><PageeBreak /></div>
              </div>
              <div className='mt-5 mb--10'>
                <AddPagerButton  id={params._id} />
              </div>
              </div>
              <div className='items-center flex justify-center mt-10 h-full'>
              <PagerMain />
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