"use client"
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import DashboardHeaderProjects from "../../../components/header/dashboardprojects";
import { api } from '../../../../convex/_generated/api';
import Head from "next/head";
import SideBar from "../../../components/projectscontents/sidebar";


export default function ProjectPage({ params }: {
    params: {_id: string}
}) {
    
    const { userId } = useAuth();
    const projectsholder = useQuery(api.projectsget.get);
    const project = projectsholder?.find(project => project._id === params._id);
    const projectuserid = project?.userId;
    if (projectuserid !== userId) {
        return <div>Unauthorized</div>;
    }
    if (!project) {
        return <div>Project not found</div>;
    }
    return (
        <>
        <Head>
            <title>HProject | {project.projectName}</title>
        </Head>
        <DashboardHeaderProjects projectname={project.projectName} />
        <div className="flex mt-[130px]">
            <SideBar />
            <div className="w-full">
                <h1>{project.projectName}</h1>
                <p>{project.projectDescription}</p>
                <p>Status: {project.projectStatus}</p>
            </div>
        </div>
        </>
    )
}
