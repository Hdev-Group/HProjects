"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import DashboardHeader from "../../../components/header/dashboardheader";
import NoTeams from '../../../components/noitems/teamsnone';
import { useAuth, useUser } from "@clerk/nextjs";
import { api } from '../../../../convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { BoxProjectBuilding, BoxProjectlive, BoxProjectPlanning } from '../../../components/projects/projectboxdashboard';

const Teams = () => {
  const { userId } = useAuth();
  const { user } = useUser();
  const { isLoaded, isSignedIn, error } = useAuth();
  const [activeSection, setActiveSection] = useState('teams'); 
  const router = useRouter();

  const projectsholder = useQuery(api.projectsget.get);
  const tasksholder = useQuery(api.tasksget.get);
  const addtoteam = useQuery(api.invitegetter.get);
  const appendUser = useMutation(api.projectsadduser.appenduser);
  const removeInvite = useMutation(api.inviteremove.deleteinvite);

  const userTeams = projectsholder?.filter((project: any) => project.otherusers.includes(userId)) || [];
  const addtoteamcheck = addtoteam?.filter(project => project.teamadderid.includes(userId)) || [];

  const countTasks = (projectId: string) => {
    const projectTasks = tasksholder?.filter((task: any) => task.projectid === projectId && task.archived != true) || [];
    const totalTasks = projectTasks.length;
    const incompleteTasks = projectTasks.filter((task: any) => task.taskStatus !== 'done').length;
    return `${incompleteTasks}/${totalTasks}`;
  };

  useEffect(() => {
    if (!isLoaded) return; // Wait until authentication state is loaded

    if (error) {
      console.error(error);
      return;
    }

    if (!isSignedIn) {
      router.push('/sign-in'); // Redirect to sign-in page if not signed in
    }
  }, [isLoaded, isSignedIn, error, router]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  function acceptInvite(projectid: string) {
    if (addtoteamcheck[0]?.projectid === projectid) {
      appendUser({
        _id: projectid,
        otherusers: userId,
      });
      

      removeInvite({
        _id: addtoteamcheck[0]?._id,
      });
    } else {
      console.error('This user was not invited to this project')
    }
  }

  function declineInvite() {
      removeInvite({
        _id: addtoteamcheck[0]?._id,
      });
  }

  if (!isLoaded) {
    return; // Show a loading message while authentication state is being checked
  }

  const renderProjects = (projects: any) => {
    return projects.map((project: any, index: number) => {
      const taskCounter = countTasks(project._id);
      if (project.projectStatus === 'developing') {
        return <BoxProjectBuilding pinned={project.pinned} key={index} name={project.projectName} id={project._id} tasks={taskCounter} />;
      } else if (project.projectStatus === 'live') {
        return <BoxProjectlive pinned={project.pinned} key={index} name={project.projectName} id={project._id} tasks={taskCounter} />;
      } else if (project.projectStatus === 'planning') {
        return <BoxProjectPlanning pinned={project.pinned} key={index} name={project.projectName} id={project._id} tasks={taskCounter} />;
      } else {
        return <div key={index}>Unknown status</div>;
      }
    });
  };


  const renderInvites = ({projectfinder, addtoteamcheck}: any) => {
    return (
      <>
        <div className="relative animate-slide-down">
            <div className="flex flex-col dark:bg-neutral-900/70 w-auto max-auto px-4 py-5 rounded-lg border bg-neutral-200 text-black dark:text-white border-neutral-500 dark:border-neutral-800">
              <div className="flex flex-col gap-1 items-start">
                <p className='text-xs font-semibold'>Project Invite</p>
                <h1 className="text-2xl font-bold">{projectfinder?.projectName}</h1>
              </div>
              <div className="flex flex-row items-center justify-between my-3">
                <p>Hey {user?.firstName}! You have been invited to join <b>{projectfinder?.projectName}</b></p>
              </div>
              <div className='flex flex-row items-center gap-3 '>
                <button className="bg-green-600 hover:bg-green-700 transition-all font-semibold text-white rounded-md px-2 py-1" onClick={() => acceptInvite(addtoteamcheck[0]?.projectid)}>Accept</button>
                <button className=" text-white hover:bg-red-500 border transition-all font-semibold rounded-md px-2 py-1" onClick={() => declineInvite()}>Decline</button>
              </div>
            </div>
        </div>
      </>
    );
  }
  const projectfinder = projectsholder?.find((project: any) => project._id === addtoteamcheck[0]?.projectid);
  return (
    <>
      <Head>
        <title>HProjects | Team</title>
      </Head>
      <DashboardHeader activeSection={activeSection} onSectionChange={handleSectionChange} />
      <main className='flex gap-20 flex-col items-center justify-center mt-20 py-14 px-0 md:w-[100%] '>
        <div className="flex flex-col w-[80%]">
          <h1 className="flex text-4xl font-bold mb-9 mt-2" id='teams'>Teams</h1>
          <div className="w-full flex py-10 justify-start px-10 gap-3 flex-col border-neutral-800 bg-neutral-900/50 border rounded">
            {addtoteamcheck.length > 0 ? (
              <>
              {/* render invs */}
              <h2 className="text-2xl font-bold text-black dark:text-white flex flex-row flex-wrap w-full items-center gap-3">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2 5.5V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5ZM0 10H5V12H0V10ZM0 15H8V17H0V15Z"></path></svg>
                  Team Invites
                </h2>
                {renderInvites({projectfinder: projectfinder, addtoteamcheck: addtoteamcheck})} 
              </>
            ) : (null)}
            {userTeams.length > 0 ? (
              <div className="flex flex-col gap-4 w-full">
                <h2 className="text-2xl font-bold text-black dark:text-white flex flex-row flex-wrap w-full items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.0834 10.4999L21.2855 11.2212C21.5223 11.3633 21.599 11.6704 21.457 11.9072C21.4147 11.9776 21.3559 12.0365 21.2855 12.0787L12.0001 17.6499L2.71463 12.0787C2.47784 11.9366 2.40106 11.6295 2.54313 11.3927C2.58536 11.3223 2.64425 11.2634 2.71463 11.2212L3.91672 10.4999L12.0001 15.3499L20.0834 10.4999ZM12.5145 1.30864L21.2855 6.5712C21.5223 6.71327 21.599 7.0204 21.457 7.25719C21.4147 7.32757 21.3559 7.38647 21.2855 7.42869L12.0001 12.9999L2.71463 7.42869C2.47784 7.28662 2.40106 6.97949 2.54313 6.7427C2.58536 6.67232 2.64425 6.61343 2.71463 6.5712L11.4856 1.30864C11.8022 1.11864 12.1979 1.11864 12.5145 1.30864ZM12.0001 3.33233L5.88735 6.99995L12.0001 10.6676L18.1128 6.99995L12.0001 3.33233Z"></path>
                  </svg>
                  Team Projects
                </h2>
                <div className="flex flex-row gap-4 flex-wrap">
                  {renderProjects(userTeams)}
                </div>
              </div>
            ) : ( <NoTeams />)}
          </div>
        </div>
      </main>
    </>
  );
};

export default Teams;
