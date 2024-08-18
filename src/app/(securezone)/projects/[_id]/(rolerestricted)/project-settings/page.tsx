"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from '../../../../../../../convex/_generated/api';
import React, { useEffect, useState } from "react";
import SideBar from "../../../../../../components/projectscontents/sidebar";
import { useToast } from "../../../../../../components/ui/use-toast";
import Link from 'next/link';
import StatusSelect from '../../../../../../components/dropdowns/newprojects';
import HeaderLinker from '../../../../../../components/settings/headerlinker';


export default function ProjectSettings({ params }: { params: { _id: string } }) {
  const { toast } = useToast()
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [projectStatus, setProjectStatus] = useState('');
  const projectsholder = useQuery(api.projectsget.get);
  const projectnamemu = useMutation(api.projectname.editProject);
  const project = projectsholder?.find((project: any) => project._id === params._id);
  const projectUserId = project?.userId;
  const [ProjectTitle, setProjectTitle] = useState("");


  useEffect(() => {
    if (!isLoaded || !projectsholder ) return; // Wait until all data is loaded

    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to sign-in page if not signed in
    } else if (!project) {
      router.push('/projects');
    } else if (projectUserId !== userId && !project.otherusers.includes(userId)) {
      router.push('/projects');
    }
    if (project) {
        setProjectTitle(project.projectName);
      }
      if (project) {
        setProjectStatus(project.projectStatus);
      }
    // Find the job title for the current user
  }, [isLoaded, isSignedIn, projectsholder, project, projectUserId, userId, router, ]);

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

  const title = project.projectName + ' | Settings';

  function saveProjectName() {
    toast({
      description: 'Project title saved',
    });
    projectnamemu({
      _id: params._id,
      projectName: ProjectTitle,
    });
  }
  function saveProjectStatus() {
    toast({
      description: 'Project status saved',
    });
    projectnamemu({
      _id: params._id,
      projectStatus: projectStatus,
    });
  }


  return (
    <>
      <head>
        <title>{title}</title>
        <meta name="description" content="Plan, Build and Push with confidence" />
        <meta name="keywords" content="HProjects, Projects, Build, Plan, Push" />
      </head>
      <div className="h-screen overflow-hidden bg-bglight dark:bg-bgdark" id="modal-root">
        <div className="flex h-full bg-bglightbars dark:bg-bgdarkbars">
          <SideBar _id={params._id}  activeSection="Project settings" projectname={project.projectName} />
          <div className="flex w-full justify-center bg-bglight border mt-0.5 dark:bg-bgdark rounded-l-3xl">
          <div className='flex flex-col w-full'>
            <div className="flex-col w-full dark:border-b-neutral-800 border-b-neutral-900 border-transparent border gap-4 justify-between mb-5 pb-5 mt-5 flex">
              <div className="px-7 flex flex-row items-center gap-2">
                <div className="p-1 dark:bg-neutral-600/20 text-black dark:text-white rounded-md border">
                  <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"></path></svg> </div>
                <h1 className="flex text-2xl font-bold text-black dark:text-white" id="tasksproject">Settings</h1>
              </div>
              </div>
                <div className='w-full px-6 flex flex-row pb-2 mb-5 gap-3 border border-transparent border-b-neutral-700'>
                  <HeaderLinker _id={params._id} currentpage={"project"} />
                  </div>
                  <div className='px-6 flex flex-col gap-3'>
                  <div className='flex flex-col gap-3 overflow-hidden rounded-md border'>
                    <div className='bg-neutral-800/20 border border-b-neutral-800 border-transparent px-4 py-2'>
                      <h2 className='font-semibold text-lg'>Project Name</h2>
                    </div>
                    <div>
                      <div className='px-4 pb-2'>

                        <h3 className='font-semibold mb-1'>Project Name</h3>
                        <div className='flex flex-row gap-3'>
                          <input type='text'
                            className='border rounded-md w-auto bg-transparent text-black dark:text-white p-1'
                            onChange={(e) => setProjectTitle(e.target.value)}
                            value={ProjectTitle}
                            maxLength={25}
                          />
                          <button onClick={saveProjectName} className='border rounded-md bg-transparent text-black dark:text-white px-6 py-1 hover:bg-neutral-500/40 transition-all'>Save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                    <div className='flex flex-col gap-3 mt-3 overflow-hidden rounded-md border'>
                    <div className='bg-neutral-800/20 border border-b-neutral-800 border-transparent px-4 py-2'>
                      <h2 className='font-semibold text-lg'>Project Status</h2>
                    </div>
                    <div>
                      <div className='px-4 pb-2'>

                        <h3 className='font-semibold mb-1'>Project Status</h3>
                        <div className='flex flex-row gap-3'>
                          <div className='w-[11rem]'>
                          <StatusSelect 
                            value={projectStatus}
                            onChange={(value: string) => setProjectStatus(value)}
                          />
                          </div>
                          <button onClick={saveProjectStatus} className='border rounded-md bg-transparent text-black dark:text-white px-6 py-1 hover:bg-neutral-500/40 transition-all'>Save</button>
                        </div>
                      </div>
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
