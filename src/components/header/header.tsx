import { useEffect, useState } from 'react';
import Image from 'next/image';
import Router from 'next/router';
import '../../styles/globals.css';
import { useClerk } from '@clerk/clerk-react';
import './head.css';
import Link from 'next/link';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu"

export default function NavigationMenuMain() {
  const { user } = useClerk();
  const [hasscrolled, setHasscrolled] = useState(false);
  const [isWhite, SetIsWhite] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [isLeaving, setIsLeaving] = useState(false);
  const texts = ['Projects', 'Space', 'Cyber'];

  const handleMouseEnter = () => {
    setHovered(true);
    setIsLeaving(false);
    
    // Clear any existing intervals to prevent multiple triggers
    clearInterval(hovered as any);
  
    let index = textIndex; // Start with the current text index
  
    const interval = setInterval(() => {
      setIsLeaving(true);
      setTimeout(() => {
        index = (index + 1) % texts.length;
        setTextIndex(index); 
        setIsLeaving(false);
      }, 200); // Transition delay for leaving animation
    }, 1000);
  
    setHovered(interval as any);
  };
  
  const handleMouseLeave = () => {
    clearInterval(hovered as any);
    setHovered(false);
  
    const cycleThroughTexts = (currentIndex: number) => {
      setIsLeaving(true);
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % texts.length; 
        setTextIndex(nextIndex); 
        setIsLeaving(false);
        
        if (nextIndex !== 0) { // If it's not back to 'Projects'
          setTimeout(() => cycleThroughTexts(nextIndex), 500); // Wait for leaving animation
        }
      }, 500); // Delay for leaving animation
    };
  
    // Start cycling texts after a brief delay when the mouse leaves
    setTimeout(() => cycleThroughTexts(textIndex), 500); 
  };  

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasscrolled(true);
      } else {
        setHasscrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    const header = document.getElementById('headermain');
  
    const handleScroll = () => {
      const sections = document.querySelectorAll('.white');
      let isWhiteSection = false;
  
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // Check if the section is within 50px from the top of the viewport
        if (rect.top <= 50 && rect.bottom >= 50) {
          isWhiteSection = true;
        }
      });
  
      if (header) {
        if (isWhiteSection) {
          SetIsWhite(true);
        } else {
          SetIsWhite(false);
        }
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const loaderbar = document.getElementById('loaderbar');

    const startLoading = () => {
      if (loaderbar) {
        loaderbar.style.transition = 'none';
        loaderbar.style.width = '0%';
        setTimeout(() => {
          loaderbar.style.transition = 'width 0.5s ease';
          loaderbar.style.width = '100%';
        }, 50);
      }
    };

    const stopLoading = () => {
      if (loaderbar) {
        loaderbar.style.width = '100%';
        setTimeout(() => {
          loaderbar.style.transition = 'width 0.5s ease, opacity 0.5s ease';
          loaderbar.style.opacity = '0';
          setTimeout(() => {
            loaderbar.style.width = '0%';
            loaderbar.style.opacity = '1';
          }, 500);
        }, 200);
      }
    };

    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', stopLoading);
    Router.events.on('routeChangeError', stopLoading);

    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', stopLoading);
      Router.events.off('routeChangeError', stopLoading);
    };
  }, []);

  return (
    <>
    <div
      id="loaderbar"
      className="h-0.5 bg-blue-600 fixed top-0 left-0 z-50"
      style={{ width: '0%', opacity: 1 }}
    />
    <header className={`w-full px-2 md:px-[4.5rem] py-3 flex items-center ${isWhite ? "text-black border-black/50" : "text-white border-gray-800/50"}  fixed justify-center z-50   backdrop-filter backdrop-blur-md ${hasscrolled ? "border-b" : ""}`} id="headermain">
    <div className="w-full flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <ContextMenu>
            <ContextMenuTrigger>
            <Link
                href="/#home"
                className=" flex items-center overflow-hidden "

                id='logoclicker'
              >
                {
                  isWhite ? (
                    <Image src="/darkh.png" alt="logo" width={40} height={40} />
                  ) : (
                    <Image src="/logo.png" alt="logo" width={40} height={40} />
                  )
                }
              </Link>
              </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>HProjects</ContextMenuItem>
                  <ContextMenuItem>HSpace</ContextMenuItem>
                  <ContextMenuItem>HCyber</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
              <Link
                href="/#home"
                className="mr-6 flex items-center overflow-hidden w-16 max-w-16"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className={`hidden font-bold sm:inline-block transition-all duration-500 ${isLeaving ? 'animate-swipe-out' : 'animate-swipe-in'}`}>
                  {texts[textIndex]}
                </span>
              </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a href={"#functions"} className='flex flex-row gap-1'>
              Functions 
            </a>
            <a href={"#security"} className='flex flex-row gap-1'>
              Security
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {user ? (
              <>
                <li className='gap-5 flex w-full items-center'>
                  <div className='w-8 h-8 rounded-full overflow-hidden'>
                    <img src={user.imageUrl} className="rounded-full" />
                  </div>
                  <a href="/dashboard" className={`ease-in-out duration-300 hovmain flex items-center justify-center className='text-[#F9FAFB] px-3 py-1  border hover:border-[#d8d9db] transition-all  rounded-md  ${isWhite ? "hover:bg-[#07070717] border-[#000]" : "hover:bg-[#f9fafb17] border-[#F9FAFB]"}`}>Dashboard <svg xmlns="http://www.w3.org/2000/svg" className='h-[30px] w-5 hovericon' viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg></a>
                </li>
              </>
            ) : (
              <li className='gap-5 flex items-center w-full'>
                <a href="/sign-in" className="ease-in-out duration-300 rounded-2xl text-white">Login</a>
                <a href="/sign-up" className="cursor-pointer flex pl-4 border border-white/40 w-full hover:border-white transition-all items-center p-1 rounded-lg hover:bg-neutral-500/10 hover:ring-2 hover:ring-neutral-500/30 hovmain">Get Started <svg  xmlns="http://www.w3.org/2000/svg" className='h-[30px] w-5 hovericon' viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg></a>
              </li>
            )}
          </div>
        </div>
        </div>
      </header>
      </>
  )
}

