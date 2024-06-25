"use client"
import { useAuth } from "@clerk/nextjs";
import dynamic from 'next/dynamic';
import Head from "next/head";
import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/header/dashboardheader"; 
import NoProjects from "../../components/noitems/projectsnone"; 
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import {BoxProjectlive} from "../../components/projects/projectboxdashboard";
import NewProjectModal from "../../components/modals/newproject";

function Dashboard() {
  const addProject = useMutation(api.projects.create);
  const tasks = useQuery(api.tasks.get);
  tasks?.map(({ _id, text }) => (
    console.log(_id, text, "a")
  ));

  const { userId, isLoaded, isSignedIn, error } = useAuth();
  const [activeSection, setActiveSection] = useState('projects');

  useEffect(() => {
    const router = require("next/router").default;
    if (!isLoaded) return;

    if (error) {
      console.error(error);
      return;
    }

    if (!isSignedIn) {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, error]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  
  if (!isLoaded || !isSignedIn) {
    return;
  }

  return (
    <>
      <Head>
        <title>HProjects | Dashboard</title>
      </Head>
      <div id="modal-root" className="overflow-y-hidden">
        <DashboardHeader activeSection={activeSection} onSectionChange={handleSectionChange} />
        <main className="flex gap-20 flex-col items-center justify-center mt-20 py-14 px-0 md:w-[100%]">
          <div className="flex flex-col sm:w-[100%] md:w-[80%]">
            <h1 className="flex text-4xl font-bold mb-9 mt-2" id="projectspage">Projects</h1>
            <div className="w-full flex-wrap overflow-y-scroll scroll-barproject justify-start items-center flex py-10 px-10 gap-3 flex-row border-neutral-800 bg-neutral-900/50 border rounded ">
              <div className="flex flex-wrap items-start gap-4 min-w-[100%] ">
                <BoxProjectlive />
              </div>
            </div>
          </div>
        </main>
      </div>
      </>
  );
}

// Use dynamic import to load the Dashboard component on the client side only
export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
