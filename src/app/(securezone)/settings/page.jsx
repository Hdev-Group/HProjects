"use client";
import Head from 'next/head';
import { useUser } from '@clerk/clerk-react';
import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import DashboardHeader from '../../../components/header/dashboardheader';
import { RedirectToUserProfile } from '@clerk/nextjs';

const Settings = () => {
    const { isLoaded, isSignedIn, user: userInfo } = useUser();
    const [activeSection, setActiveSection] = useState('settings');
    const { error } = useAuth();
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
        return; 
      }
    
      if (!isSignedIn) {
        return <div>Unauthorised</div>;
      }

  return (
    <div>
      <Head>
        <title>HProjects | Settings</title>
      </Head>
      <DashboardHeader activeSection={activeSection} onSectionChange={handleSectionChange} />
      <RedirectToUserProfile/> 
    </div>
  );
};

export default Settings;