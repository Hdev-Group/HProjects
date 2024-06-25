"use client"
import React, { useState } from 'react';
import Head from 'next/head';
import DashboardHeader from '../../components/header/dashboardheader';
import NoTeams from '../../components/noitems/teamsnone';

const Teams = () => {
  const [activeSection, setActiveSection] = useState('teams'); // Set 'teams' as activeSection initially

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <>
      <Head>
        <title>HProjects | Team</title>
      </Head>
      <DashboardHeader activeSection={activeSection} onSectionChange={handleSectionChange} />
      <main className='flex gap-20 flex-col items-center justify-center mt-20 py-14 px-0 md:w-[100%]'>
        <div className="flex flex-col w-[80%]">
          <h1 className="flex text-4xl font-bold mb-9 mt-2" id='teams'>Teams</h1>
          <div className="w-full items-center flex py-10 justify-start px-10 gap-3 flex-row bg-white dark:border-neutral-800 dark:bg-neutral-900/50 border rounded">
            <NoTeams />
          </div>
        </div>
      </main>
    </>
  );
};

export default Teams;
