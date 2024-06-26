"use client";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Inter as FontSans } from "next/font/google"
import type { Metadata } from "next";
import ConvexClientProvider from "./ConvexClientProvider";

 
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
            <link rel="icon" href="../../public/favicon.ico" />
            <title>HProjects</title>
          </head>
          <body
        className={cn(
          "min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <ConvexClientProvider>{children}</ConvexClientProvider>
        </body>
        </html>
      </ConvexProvider>
    </ClerkProvider>
  );
}