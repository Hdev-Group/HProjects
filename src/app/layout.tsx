"use client";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexProvider, ConvexReactClient } from 'convex/react';

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
            <title>HProjects</title>
          </head>
          <body>{children}</body>
        </html>
      </ConvexProvider>
    </ClerkProvider>
  );
}