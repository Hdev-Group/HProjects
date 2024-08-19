"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from '../../../../../../../../convex/_generated/api';
import React, { useEffect, useState } from "react";
import SideBar from "../../../../../../../components/projectscontents/sidebar";
import { useToast } from "../../../../../../../components/ui/use-toast";
import Link from 'next/link';
import StatusSelect from '../../../../../../../components/dropdowns/newprojects';
import HeaderLinker from '../../../../../../../components/settings/headerlinker';
import { useCallback } from 'react';
import Role from '../../../../../../../components/dropdowns/teamdrop';

export default function ProjectSettings({ params }: { params: { _id: string } }) {
  const { toast } = useToast()
  const { userId, isLoaded, isSignedIn } = useAuth();
  const teamadders = useMutation(api.teamadders.add);
  const { user } = useUser();
  const [dataLoaded, setDataLoaded] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState<{ [key: string]: { firstName: string, lastName: string, imageUrl: string, email: string } }>({});
  const [projectStatus, setProjectStatus] = useState('');
  const projectsholder = useQuery(api.projectsget.get);
  const projectnamemu = useMutation(api.projectname.editProject);
  const project = projectsholder?.find((project: any) => project._id === params._id);
  const projectUserId = project?.userId;
  const [adderEmail, setEmail] = useState("");


  useEffect(() => {
    if (!isLoaded || !projectsholder ) return; // Wait until all data is loaded

    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to sign-in page if not signed in
    } else if (!project) {
      router.push('/projects');
    } else if (projectUserId !== userId && !project.otherusers.includes(userId)) {
      router.push('/projects');
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

  async function inviteuser() {
    try {
      const response = await fetch(`/api/get-email-user?userEmail=${encodeURIComponent(adderEmail)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // check to see if the user is in the database already 
      if (project.otherusers.includes(data.id)) {
        return toast({
          description: 'User already in the team',
        });
      }

      // send validator to the admin to make sure thats the person they want to add
      if (!data) {
        return toast({
          description: 'User not found',
        });
      }
      teamadders({projectid: params._id, teamadderid: data.id});
      return toast({
        description: `${data.firstName} ${data.lastName} invited to join the team.`,
      });
    } catch (error) {
      console.error('Error:', error);
    }
    // add user to pending team
  }

  const fetchUserData = useCallback(async (ids: string[]) => {
    if (ids.length > 0) {
      try {
        const response = await fetch(`/api/getcommentuser?userIds=${ids.join(',')}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const dataById = data.reduce((acc: any, user: any) => {
          acc[user.id] = user;
          return acc;
        }, {});
        setUserData(dataById);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserData({});
      }
    }
  }, []);
  
  useEffect(() => {
    if (project) {
      fetchUserData([project.userId, ...project.otherusers]);
    }
  }, [project, fetchUserData]);

  function TeamMember({ user }: { user: { firstName: string, lastName: string, imageUrl: string, email: string } }){
    console.log(user)
    return(
      <div className='flex-wrap flex gap-3 mt-3 mb-3 flex-row w-auto'>
      <div className='border flex-col flex w-auto px-4 py-2 rounded-md'>
        <p className='text-neutral-400 text-sm'>{user?.firstName} {user?.lastName}</p>
        <div className='flex flex-row w-full items-center gap-10 justify-between'>
          <p>{user?.email}</p>
          <div className='flex flex-row gap-4'>
          <Role />
          <button className='bg-red-500 px-4 p-2 rounded-md text-white'>Remove</button>
          </div>
        </div>
      </div>
  </div>
    )
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
                  <HeaderLinker _id={params._id} currentpage={"team"} />
                  </div>
                  <div className='px-6 flex flex-col gap-3'>
                  <div className='flex flex-col gap-3 overflow-hidden rounded-md border'>
                    <div className='bg-neutral-800/20 border border-b-neutral-800 border-transparent px-4 py-2'>
                      <h2 className='font-semibold text-lg'>Team members</h2>
                    </div>
                    <div>
                      <div className='px-4 pb-2'>
                        <div className='flex flex-col gap-3'>
                            <div className='flex flex-col gap-3'>
                                <label className='font-semibold'>Email</label>
                                <div className='flex flex-row gap-3'>
                                    <input type='text' 
                                    placeholder='your-team-member@example.com' 
                                    className='md:w-1/3 w-full p-2 border border-neutral-800 bg-transparent rounded-md'
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button className='bg-blue-500 px-4 p-2 rounded-md text-white' onClick={inviteuser}>Invite</button>
                                </div>
                            </div>
                            <div className='flex flex-col w-full'>
                                <h1 className='text-xl'>Team members
                                </h1>
                                <div className='flex flex-row gap-3 flex-wrap'>
                                  {project.otherusers.map((user: any) => (                                
                                    <TeamMember key={user} user={userData[user]} />
                                    ) )}
                                </div>
                            </div>
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
