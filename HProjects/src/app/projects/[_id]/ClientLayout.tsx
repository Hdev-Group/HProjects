import React from "react";
import Head from 'next/head';

interface ClientLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function ClientLayout({ children, title }: ClientLayoutProps) {

  if (!title) {
    return null; // or a loading spinner, or some fallback content
  }

  return (
    <>
      <Head>
        <title>{title} | HProjects</title>
        <meta name="description" content="Plan, Build and Push with confidence" />
        <meta name="keywords" content="HProjects, Projects, Build, Plan, Push" />
      </Head>
      {children}
    </>
  );
}
