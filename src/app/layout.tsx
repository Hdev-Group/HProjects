"use client";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Inter as FontSans } from "next/font/google"
import type { Metadata } from "next";
import ConvexClientProvider from "./ConvexClientProvider";
import { Toaster } from "../components/ui/toaster"

 
import { cn } from "../@/lib/utils"
 
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || '';

if (!convexUrl) {
  throw new Error('Missing Convex URL. Check your environment variables.');
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ConvexProvider client={new ConvexReactClient(convexUrl)}>
        <html lang="en">
        <head>
          {/* Favicon and theme color */}
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#000000" />

          {/* Title and description (for SEO and social previews) */}
          <title>HProjects - Seamless Project Planning, Incident Management, and Team Collaboration</title>
          <meta
            name="description"
            content="HProjects is your all-in-one solution for project planning, incident management, and team collaboration. Plan, build, and push your projects with confidence."
          />

          {/* Author and keywords */}
          <meta name="author" content="HProjects" />
          <meta
            name="keywords"
            content="HProjects, project planning, incident management, team collaboration, task management, project tracking, agile, software development"
          />

          {/* Mobile optimization */}
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

          {/* Character encoding */}
          <meta charSet="utf-8" />

          {/* Open Graph (Facebook, LinkedIn, etc.) */}
          <meta property="og:title" content="HProjects - Project Planning, Incident Management, and Team Collaboration" />
          <meta property="og:description" content="Plan, build, and manage your projects with ease. HProjects offers comprehensive solutions for teams and individuals." />
          <meta property="og:url" content="https://hprojects.hdev.uk" />
          <meta property="og:type" content="website" />

          {/* Twitter Card (for Twitter sharing) */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="HProjects - Seamless Project Planning and Team Collaboration" />
          <meta name="twitter:description" content="An all-in-one platform to manage projects, incidents, and team collaboration efficiently." />
          <meta name="twitter:site" content="@HProjects" /> {/* Optional if you have a Twitter handle */}

          {/* Manifest for PWA */}
          <link rel="manifest" href="/manifest.json" />

          {/* Canonical URL for SEO */}
          <link rel="canonical" href="https://hprojects.hdev.uk" />

          {/* Additional SEO Meta Tags */}
          <meta name="robots" content="index, follow" />
          <meta name="revisit-after" content="7 days" />
          <meta name="distribution" content="global" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          </head>
          <body
        className={cn(
          "min-h-screen font-sans antialiased overflow-x-hidden m-0",
          fontSans.variable
        )}
      >
        <Toaster />
        <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
        </html>
      </ConvexProvider>
    </ClerkProvider>
  );
}