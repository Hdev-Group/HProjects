"use client";

import { useRouter } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from '../../../../../../../../convex/_generated/api';
import React, { useEffect, useState, useCallback } from "react";
import SideBar from "../../../../../../../components/projectscontents/sidebar";
import { useToast } from "../../../../../../../components/ui/use-toast";
import Link from 'next/link';
import StatusSelect from '../../../../../../../components/dropdowns/newprojects';
import HeaderLinker from '../../../../../../../components/settings/headerlinker';
import Role from '../../../../../../../components/dropdowns/teamdrop';

export default function ProjectSettings({ params }: { params: { _id: string } }) {
  const { toast } = useToast();
  const { userId, isLoaded, isSignedIn } = useAuth();
  const teamadders = useMutation(api.teamadders.add);
  const { user } = useUser();
  const [dataLoaded, setDataLoaded] = useState(false);
  const router = useRouter();
  const [userData, setUserData] = useState<{ [key: string]: { firstName: string, lastName: string, imageUrl: string, email: string, id: string } }>({});
  const projectsholder = useQuery(api.projectsget.get);
  const getuserss = useQuery(api.userstab.get);
  const adderr = useMutation(api.userstab.edit);
  const removeusers = useMutation(api.teamadders.remove);
  const removerr = useMutation(api.userstab.remove);
  const project = projectsholder?.find((project: any) => project._id === params._id);
  const projectUserId = project?.userId;
  const [adderEmail, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  // Check authentication and authorization
  useEffect(() => {
    if (!isLoaded || !projectsholder || !getuserss) return; // Wait until all data is loaded
  
    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to sign-in page if not signed in
    } else if (!project) {
      router.push('/projects'); // Redirect if the project is not found
    } else {
      // Find the current user's role within the project
      const currentUserEntry = getuserss.find((user: any) => user.projectID === params._id && user.userid === userId);
      
      if (currentUserEntry) {
        const currentUserRole = currentUserEntry.role;
  
        // Check if the user is the project owner or has the correct role
        if (projectUserId !== userId && !project.otherusers.includes(userId)) {
          router.push(`./personal`);
        } else if (currentUserRole !== 'manager' && currentUserRole !== 'admin' && projectUserId !== userId) {
          router.push(`./personal`);        }
      } else {
        router.push('/dashboard'); 
      }
    }
  }, [isLoaded, isSignedIn, projectsholder, project, projectUserId, userId, router, params._id, getuserss]);
  


  // Fetch user data
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

  function removeuser({ userid }: { userid: any }) {
    // check the role priority if its an admin that a manager is removing do not allow it goes owner > admin > manager > member
    const idfindera = getuserss?.find((user: any) => user.userid === userid && user.projectID === params._id);
    // check what user is being removed and the role of that user
    // if its an admin being removed only the project owner can remove them
    // if its a manager being removed only the project owner and admins can remove them
    // if its a member being removed only the project owner, admins and managers can remove them
    if (idfindera?.role === 'admin' && project.userId !== userId) {
      return toast({
        description: 'Only the project owner can remove an admin',
        variant: "destructive"
      });
    } else if (idfindera?.role === 'manager' && project.userId !== userId) {
      return toast({
        description: 'Only the project owner and admins can remove a manager',
        variant: "destructive"
      });
    } else if (idfindera?.role === 'member' && project.userId !== userId) {
      return toast({
        description: 'Only the project owner, admins and managers can remove a member',
        variant: "destructive"
      });
    }
    else if (project.userId === userId) {
    removeusers({ _id: params._id, otherusers: userid });
    removerr({ _id: idfindera?._id });
    }
  }

  function TeamMember({ user }: { user: { firstName: string, lastName: string, imageUrl: string, email: string, emailAddresses: any, emailAddress: string ,id: string } }) {
    const rolefinder = getuserss?.find((usera: any) => user?.id === usera.userid && usera?.projectID === params._id);
    const [status, setTaskStatus] = useState<string>(() => {
      return rolefinder?.role || '';
    });
    const email = user?.email;

    useEffect(() => {
      if (status !== rolefinder?.role) {
      // Check to see the role if its an admin that is removing do not allow it goes owner > admin > manager > member
      if (rolefinder?.role === 'admin' && project.userId !== userId) {
        toast({
        description: 'Only the project owner can change the role of an admin',
        variant: "destructive"
        });
        return; // Prevent further execution
      } else if (rolefinder?.role === 'manager' && project.userId !== userId) {
        toast({
        description: 'Only the project owner and admins can change the role of a manager',
        variant: "destructive"
        });
        return; // Prevent further execution
      } else if (rolefinder?.role === 'member' && project.userId !== userId) {
        toast({
        description: 'Only the project owner, admins and managers can change the role of a member',
        variant: "destructive"
        });
        return; // Prevent further execution
      }
      adderr({ _id: rolefinder?._id, role: status });
      }
    }, [status, rolefinder, project, userId, adderr, toast]);
    
    if (rolefinder?.userid === project?.userId) {
      return null;
    }
    return (
      <div className='flex-wrap flex gap-3 mt-3 mb-3 flex-row w-auto'>
        <div className='border flex-col flex w-auto px-4 py-2 rounded-md'>
          <p className='text-neutral-400 text-sm'>{user?.firstName} {user?.lastName}</p>
          <div className='flex flex-row w-full items-center gap-10 justify-between'>
            <p>{email}</p>
            <div className='flex flex-row mt-[-15px] gap-4'>
              <Role
                value={status}
                onValueChange={setTaskStatus}
              />
              <button
                className='bg-red-500 px-4 p-2 rounded-md text-white'
                onClick={() => removeuser({ userid: user?.id })}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

  const title = `${project.projectName} | Settings`;

  async function inviteuser() {
    // check if its an manager or admin that is inviting
    if (project.userId !== userId) {
      return toast({
        description: 'Only the project owner can invite team members',
      });
    } else if (project.userId === userId) {
    try {
      const response = await fetch(`/api/get-email-user?userEmail=${encodeURIComponent(adderEmail)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (project.otherusers.includes(data.id) || project.userId === data.id) {
        return toast({
          description: 'User already in the team',
        });
      }
      if (!data) {
        return toast({
          description: 'User not found',
        });
      }
      await teamadders({ projectid: params._id, teamadderid: data.id });
      return toast({
        description: `${data.firstName} ${data.lastName} invited to join the team.`,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
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
            <div className='flex flex-col w-full'>
              <div className="flex-col w-full dark:border-b-neutral-800 border-b-neutral-900 border-transparent border gap-4 justify-between mb-5 pb-5 mt-5 flex">
                <div className="px-7 flex flex-row items-center gap-2">
                  <div className="p-1 dark:bg-neutral-600/20 text-black dark:text-white rounded-md border">
                    <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"></path>
                    </svg>
                  </div>
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
                          <h1 className='text-xl'>Team members</h1>
                          <div className='flex flex-row gap-3 flex-wrap'>
                            {project.otherusers.length < 1 ? (
                              <p>No team members, Just you.</p>
                            ) : (
                              Object.values(userData).map((user: any) => (
                                <TeamMember key={user.id} user={user} />
                              ))
                            )}
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
