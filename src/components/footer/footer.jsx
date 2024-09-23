import Link from "next/link";
import { Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUrl(window.location.pathname);
        }
    }, []);

    return (
        <footer className="bg-[#070608] text-gray-300">
            <div className="max-w-[1900px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <img src="/logo.png" alt="HProjects" className="h-10 w-auto" />
                        <p className="text-sm">
                            Seamlessly track, manage, respond and maintain all of your projects in one place.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="https://www.linkedin.com/in/harry-campbell-75ab83250/" className="hover:text-white">
                                <Linkedin size={20} />
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><Link href="/information/faq" className={`hover:text-white ${url.includes("faq") ? "text-white font-semibold" : ""}`}>FAQ</Link></li>
                            <li><Link href="https://hprojects.statuspage.io/" className="hover:text-white relative">
                                <div className="absolute top-0 left-0"/>
                                API Status
                            </Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className={`text-lg font-semibold mb-4 ${url.includes("legal") ? "text-white" : ""}`}>Legal</h3>
                        <ul className="space-y-2">
                            <li><a href="/information/legal/tos" className={`hover:text-white ${url.includes("legal") && url.includes("tos") ? "text-white font-semibold" : ""}`}>Terms of Service</a></li>
                            <li><a href="/information/legal/privacy" className={`hover:text-white ${url.includes("legal") && url.includes("privacy") ? "text-white font-semibold" : ""}`}>Privacy Policy</a></li>
                            <li><a href="/information/legal/cookie" className={`hover:text-white ${url.includes("legal") && url.includes("cookie") ? "text-white font-semibold" : ""}`}>Cookie Policy</a></li>
                            <li><a href="/information/legal/GDPR" className={`hover:text-white ${url.includes("legal") && url.includes("GDPR") ? "text-white font-semibold" : ""}`}>GDPR</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-neutral-400 text-sm text-start">
                    <p>&copy; {new Date().getFullYear()} HProjects. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
