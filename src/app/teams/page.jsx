"use client";
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import DashboardHeader from '../../components/header/dashboardheader';
import NoTeams from '../../components/noitems/teamsnone';
import { useAuth } from "@clerk/nextjs";

const Teams = () => {
  const { isLoaded, isSignedIn, error } = useAuth();
  const [activeSection, setActiveSection] = useState('teams'); 
  const router = useRouter();

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

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  if (!isLoaded) {
    return; // Show a loading message while authentication state is being checked
  }

  if (!isSignedIn) {
    return <div>Unauthorised</div>; // This will never be shown due to the redirect
  }

  return (
    <>
      <Head>
        <title>HProjects | Team</title>
      </Head>
      <DashboardHeader activeSection={activeSection} onSectionChange={handleSectionChange} />
      <main className='flex gap-20 flex-col items-center justify-center mt-20 py-14 px-0 md:w-[100%]'>
        <div className="flex flex-col w-[80%]">
          <h1 className="flex text-4xl font-bold mb-9 mt-2" id='teams'>Teams</h1>
          <div className="w-full items-center flex py-10 justify-start px-10 gap-3 flex-row border-neutral-800 bg-neutral-900/50 border rounded">
            <NoTeams />
          </div>
        </div>
      </main>
    </>
  );
};

export default Teams;
