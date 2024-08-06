import { ReactNode } from "react";
import '../../styles/globals.css';
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'HProjects | Authentication',
    description: 'Plan, Build and Push with confidence',
    keywords: 'HProjects, Projects, Build, Plan, Push',
}

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
            <div className="flex items-center justify-center h-screen" style={{ background: 'black', margin: 0, padding: 0 }}>
                {children}
            </div>
    );
}