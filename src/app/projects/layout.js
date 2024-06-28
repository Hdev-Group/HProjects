import React from 'react';
import Head from 'next/head';
import DashboardHeaderProjects from '../../components/header/dashboardprojects';
import SideBar from '../../components/projectscontents/sidebar';

export default function ProjectsLayout({ children }) {
  return (
    <>
      <Head>
        <title>aaa</title>
      </Head>
            {children}
    </>
  );
}
