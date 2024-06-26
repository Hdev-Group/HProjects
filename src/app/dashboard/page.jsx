"use client";
import { useAuth } from "@clerk/nextjs";
import dynamic from 'next/dynamic';
import Head from "next/head";
import React, { useState, useEffect } from "react";
import DashboardHeader from "../../components/header/dashboardheader";
import AddProjectButton from "../../components/buttons/projectsmodalopen";
import ProjectsDataAdder from "../../components/projects/datastuff";
function Dashboard() {
  const { isLoaded, isSignedIn, error } = useAuth();
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
    return null;
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
            <AddProjectButton />
            <div className="w-full flex-wrap overflow-y-scroll scroll-barproject justify-start items-center flex py-10 px-10 gap-3 flex-row border-neutral-800 rounded-tl-[0] bg-neutral-900/50 border rounded">
              <div className="flex flex-wrap items-start gap-4 min-w-[100%]">
                <ProjectsDataAdder />
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