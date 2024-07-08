"use client"
import { useRouter } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { api } from '../../../..//../convex/_generated/api';
import React, { useEffect, useState } from "react";
import DashboardHeaderProjects from "../../../../components/header/dashboardprojects";
import SideBar from "../../../../components/projectscontents/sidebar";

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
        <div className="overflow-hidden h-screen">
        <DashboardHeaderProjects projectname={projectname} projectid={project?._id} />
        <div className="flex mt-[130px] h-full">
          <SideBar _id={params._id} activeSection={activeSection} />
          </div>
          </div>
        </>
        );
}