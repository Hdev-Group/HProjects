"use client"
import { Critical, High, Medium, Low, Security, Feature } from '../../../../components/dropdowns/priorities/critical';
import { BackLog, Todo, InProgress, Done } from '../../../../components/dropdowns/status/status';
import SideBar from "../../../../components/projectscontents/sidebar";
import DashboardHeaderProjects from "../../../../components/header/dashboardprojects";
import Head from "next/head";
import { useState } from "react";
import { api } from '../../../../../convex/_generated/api';
import { useQuery } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import router from 'next/router';
import BreadcrumbWithCustomSeparator from "../../../../components/tasks/breadcrumb";

export default function TaskFullView({ params }: { params: { _id: string, _taskid: string } }) {
    const { userId, isLoaded, isSignedIn } = useAuth();
    const { user } = useUser();
    const projectsholder = useQuery(api.projectsget.get);
    const project = projectsholder?.find(project => project._id === params._id);
    const tasks = useQuery(api.tasks.get);
    const task = tasks?.find(task => task._id === params._taskid);
    console.log(task);
    const taskPriority = task?.taskPriority;
    const taskStatus = task?.taskStatus;
    const taskAssignee = task?.taskAssignee;
    const taskDescription = task?.taskDescription;
    const taskName = task?.taskTitle
    const taskstarter = task?.userId;
    const projectname = project?.projectName;


    const _id = params._id;
    const taskid = params._taskid;
    const [activeSection, setActiveSection] = useState("Tasks");
    useEffect(() => {
        if (!isLoaded) return; // Wait until authentication state is loaded
        if (!isSignedIn) {
          router.push('/sign-in'); // Redirect to sign-in page if not signed in
        }
      }, [isLoaded, isSignedIn, router]);
    
      if (!isLoaded) {
        return; 
      }
      if (!isSignedIn) {
        return <div>Unauthorised</div>;
      }
      if (!tasks) {
        console.log("No tasks found");
        return null;
    }

    function edittask(){

    }
    return (
        <>
        <Head>
          <title>HProject | Static Title</title>
        </Head>
        <div className="h-screen overflow-hidden" id="modal-root">
          <DashboardHeaderProjects projectname={projectname} activeSection={""} />
          <div className="flex mt-[130px] h-full">
            <SideBar _id={params._id} activeSection={activeSection} />
            <div className="flex w-full justify-center">
                <div className="max-w-9/12 w-[100%] p-5 flex flex-col items-center overflow-y-auto">
                <div className='w-full flex pb-5 border-dashed border-2 border-transparent justify-center border-b-neutral-700/40'>
                    <div className="flex w-10/12 pt-4 gap-4 flex-col">
                        <BreadcrumbWithCustomSeparator projectid={_id} />
                        <div className='flex flex-col gap-2'>
                        <div className='flex flex-col'>
                                <h1 className="font-bold text-3xl">{taskName}</h1>
                            </div>
                            <div className='flex gap-3 mt-1'>
                                <Critical  />
                                <InProgress />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-row gap-3 mt-3'>
                        <div className='flex justify-center items-center cursor-pointer hover:bg-neutral-500/60 bg-neutral-500/20 border hover:border-neutral-300 h-10 p-0.5 rounded-lg w-10 transition-all' onClick={edittask}>
                            <svg xmlns="http://www.w3.org/2000/svg" className='h-7 rounded-lg' viewBox="0 0 24 24" fill="white"><path d="M16.7574 2.99677L9.29145 10.4627L9.29886 14.7098L13.537 14.7024L21 7.23941V19.9968C21 20.5491 20.5523 20.9968 20 20.9968H4C3.44772 20.9968 3 20.5491 3 19.9968V3.99677C3 3.44448 3.44772 2.99677 4 2.99677H16.7574ZM20.4853 2.09727L21.8995 3.51149L12.7071 12.7039L11.2954 12.7063L11.2929 11.2897L20.4853 2.09727Z"></path></svg>
                        </div>
                    </div>
                </div>
                
                </div>
            </div>
        </div>
        </div>
        </>
    )
}