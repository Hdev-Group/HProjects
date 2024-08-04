"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from '../../../../../convex/_generated/api';
import React, { useEffect, useState } from "react";
import SideBar from "../../../../components/projectscontents/sidebar";
import { useToast } from "../../../../components/ui/use-toast";


export default function ProjectSettings({ params }) {
  const { toast } = useToast()
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const projectsholder = useQuery(api.projectsget.get);
  const jobtitlealready = useQuery(api.getjob.get);
  const project = projectsholder?.find(project => project._id === params._id);
  const projectUserId = project?.userId;
  const [jobtitle, setJobTitle] = useState("");
  const addJobTitle = useMutation(api.users.addjobtitle);

  useEffect(() => {
    if (!isLoaded || !projectsholder || !jobtitlealready) return; // Wait until all data is loaded

    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to sign-in page if not signed in
    } else if (!project) {
      router.push('/projects');
    } else if (projectUserId !== userId && !project.otherusers.includes(userId)) {
      router.push('/projects');
    }

    // Find the job title for the current user
    const job = jobtitlealready.find(jobtitle => jobtitle.userid === userId);
    if (job) {
      setJobTitle(job.jobtitle);
    }
  }, [isLoaded, isSignedIn, projectsholder, project, projectUserId, userId, router, jobtitlealready]);

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
  const fullname = user?.firstName + ' ' + user?.lastName;

  function saveJobTitle() {
    toast({
      description: 'Job title saved',
    });
    addJobTitle({ userid: userId, jobtitle, projectID: params._id });
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
          <SideBar _id={params._id} activeSection="Project settings" projectname={project.projectName} />
          <div className="flex w-full justify-center bg-bglight border mt-0.5 dark:bg-bgdark rounded-l-3xl">
            <div className="max-w-10/12 w-[100%] md:p-5 flex flex-col items-center overflow-y-auto">
              <div className="flex-col w-full px-5 gap-4 justify-between mb-5 mt-5 flex">
                <div className="flex flex-col gap-4 justify-between">
                  <h1 className="flex text-2xl font-bold text-black dark:text-white" id="project-settings">Project Settings</h1>
                  <div className='w-full h-[1px] gradientedline'></div>
                </div>
                <div className='w-full'>
                  <div className='flex flex-col gap-3'>
                    <h2 className='font-semibold text-lg'>User Settings</h2>
                    <div>
                      <div>
                        <h3>Job Title</h3>
                        <div className='flex flex-row gap-3'>
                          <input type='text'
                            className='border rounded-md bg-transparent text-black dark:text-white p-1'
                            onChange={(e) => setJobTitle(e.target.value)}
                            value={jobtitle}
                          />
                          <button onClick={saveJobTitle} className='border rounded-md bg-transparent text-black dark:text-white px-6 py-1 hover:bg-neutral-500/40 transition-all'>Save</button>
                        </div>
                      </div>
                      <div>
                        <h3>Name</h3>
                        <input type='text'
                          className='border rounded-md bg-transparent text-black dark:text-white p-1'
                          value={fullname}
                          readOnly
                        />
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
