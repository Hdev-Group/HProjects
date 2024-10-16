"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from '../../../../../../../convex/_generated/api';
import React, { useEffect, useState } from "react";
import SideBar from "../../../../../../components/projectscontents/sidebar";
import HeaderLinker from '../../../../../../components/settings/headerlinker';
import { useToast } from "../../../../../../components/ui/use-toast";
import TimeZoner from '../../../../../../components/dropdowns/TimeZoner';


export default function ProjectSettings({ params }: { params: { _id: string } }) {
  const { toast } = useToast()
  const { userId, isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const projectsholder = useQuery(api.projectsget.get);
  const jobtitlealready = useQuery(api.getjob.get);
  const project = projectsholder?.find((project: any) => project._id === params._id);
  const projectUserId = project?.userId;
  const [jobtitle, setJobTitle] = useState("");
  const [timezone, setTimezone] = useState("");
  const addJobTitle = useMutation(api.users.addjobtitle);
  const addtimezone = useMutation(api.users.addtimezone);

  useEffect(() => {
    if (!isLoaded || !projectsholder || !jobtitlealready) return; // Wait until all data is loaded

    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to sign-in page if not signed in
    } else if (!project) {
      router.push('/dashboard');
    } else if (projectUserId !== userId && !project.otherusers.includes(userId)) {
      router.push('/dashboard');
    }

    // Find the job title for the current user
    const job = jobtitlealready.find((jobtitle: any) => jobtitle.userid === userId && jobtitle.projectID === params._id);
    if (job) {
      setJobTitle(job.jobtitle);
      setTimezone(job.timezone);
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
    if (jobtitle.length < 25) {
      toast({
        description: 'Job title saved',
      });
      addJobTitle({ userid: userId, jobtitle, projectID: params._id });
    } else {
      toast({
        variant: 'destructive',
        description: 'Job title must be less than 25 characters',
      });
    }
  }

  function saveTimeZone() {
    toast({
      description: 'Time-Zone saved',
    });
    addtimezone({ userid: userId, timezone: timezone, projectID: params._id });
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
                <HeaderLinker _id={params._id} currentpage={"personal"} />
                </div>
                <div className='px-6 flex flex-col gap-3'>
                  <div className='flex flex-col  gap-3 overflow-hidden rounded-md border'>
                    <div className='bg-neutral-800/20 border border-b-neutral-800 border-transparent px-4 py-2'>
                      <h2 className='font-semibold text-lg'>User Settings</h2>
                    </div>
                    <div>
                      <div className='px-4 pb-2'>
                        <h3 className='font-semibold mb-1'>Job Title</h3>
                        <div className='flex flex-row gap-3'>
                          <input type='text'
                            className='border rounded-md w-auto bg-transparent text-black dark:text-white p-1'
                            onChange={(e) => setJobTitle(e.target.value)}
                            value={jobtitle}
                            maxLength={25}
                          />
                          <button onClick={saveJobTitle} className='border rounded-md bg-transparent text-black dark:text-white px-6 py-1 hover:bg-neutral-500/40 transition-all'>Save</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col  gap-3 overflow-hidden rounded-md border'>
                    <div className='bg-neutral-800/20 border border-b-neutral-800 border-transparent px-4 py-2'>
                      <h2 className='font-semibold text-lg'>Time-Zone</h2>
                    </div>
                    <div>
                      <div className='px-4 pb-2'>
                        <h3 className='font-semibold mb-1'>Time-Zone</h3>
                        <div className='flex flex-row gap-3'>
                          <TimeZoner value={timezone} onValueChange={setTimezone} />
                          <button onClick={saveTimeZone} className='border rounded-md bg-transparent text-black dark:text-white px-6 py-1 hover:bg-neutral-500/40 transition-all'>Save</button>
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
