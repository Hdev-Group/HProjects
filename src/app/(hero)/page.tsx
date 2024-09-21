"use client";
import { useState, useEffect, useRef } from 'react';
import { SignedOut, SignedIn, SignUp } from '@clerk/nextjs';
import NavigationMenuMain from '../../components/header/header';
import Footer from '../../components/footer/footer';
import gsap from 'gsap';
import { Critical, High, Medium, Low, Security, Feature } from '../../components/dropdowns/priorities/critical';
import { BackLog, Todo, InProgress, Done } from '../../components/dropdowns/status/status';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/globals.css';
import './index.css';
import Link from 'next/link';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../../components/ui/context-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../components/ui/hover-card";


gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const target = document.querySelector('#datasowers');
    const target2 = document.querySelector('#datasowers2');
    const target3 = document.querySelector('#datasowers3');
    const target4 = document.querySelector('#datasowers4');
    const target5 = document.querySelector('#datasowers5');
    const target6 = document.querySelector('#datasowers6');
    const target7 = document.querySelector('#datasowers7');
    const target8 = document.querySelector('#datasowers8');
    const pager1 = document.querySelector('#pageroncall');
    const pager2 = document.querySelector('#pageroncall2');
    const pager3 = document.querySelector('#pageroncall3');
    const incident1 = document.querySelector('#incident1');
    const incident2 = document.querySelector('#incident2');
    const incident3 = document.querySelector('#incident3');
    const incident4 = document.querySelector('#incident4');
      gsap.fromTo(
        target, 
        { x: -3000 }, // Starting position
        {
          x: 0, // Ending position
          duration: 1.5,
          scrollTrigger: {
            trigger: target,
            start: 'top center',
          },
        }
      );
      gsap.fromTo(
        target2, 
        { x: 3000 }, // Starting position
        {
          x: 0, // Ending position
          duration: 1.5,
          scrollTrigger: {
            trigger: target2,
            start: 'top center',
          },
        }
      );
      gsap.fromTo(
        target3, 
        { y: -30, opacity: 0 }, // Starting position
        {
          y: 0, // Ending position
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: target3,
            start: 'top center',
          },
        }
      );
      gsap.fromTo(
        target4, 
        { y: -60, opacity: 0 }, // Starting position
        {
          y: 0, // Ending position
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: target4,
            start: 'top center',
          },
        }
      );
      gsap.fromTo(
        target5, 
        { height: 0, opacity: 0 }, // Starting position
        {
          height: 113, // Ending position
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: target5,
            start: 'top center',
          },
        }
      );
      gsap.fromTo(
        target6, 
        { y: -60, opacity: 0 }, // Starting position
        {
          y: 0, // Ending position
          delay: 0.4,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: target5,
            start: 'top center',
          },
        }
      );
      gsap.fromTo(
        target7, 
        { height: 0, opacity: 0 }, // Starting position
        {
          height: 111, // Ending position
          delay: 0.4,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: target6,
            start: 'top center',
          },
        }
      );
      gsap.fromTo(
        target8, 
        { y: -60, opacity: 0 }, // Starting position
        {
          y: 0, // Ending position
          delay: 0.1,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: target7,
            start: 'top center',
          },
        }
      );
      gsap.fromTo(
        pager1, 
        { y: -60, opacity: 0 }, // Starting position
        {
          y: 0, // Ending position
          delay: 0.1,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: target4,
            start: 'top center',
          },
        }
      );
      gsap.fromTo(
        pager2, 
        { y: -60, opacity: 0 }, // Starting position
        {
          y: 0, // Ending position
          delay: 0.1,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: target6,
            start: 'top center',
          },
        }
      );
      gsap.fromTo(
        pager3, 
        { y: -60, opacity: 0 }, // Starting position
        {
          y: 0, // Ending position
          delay: 0.1,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: target8,
            start: 'top center',
          },
        }
      );
      gsap.fromTo(
        incident1,
        { y: -60, opacity: 0 },
        {
          y: 0,
          delay: 0.1,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: incident1,
            start: 'top center',
          },
        }
      );
      gsap.fromTo(
        incident2,
        { y: 60, opacity: 0 },
        {
          y: 0,
          delay: 0.1,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: incident2,
            start: 'top center',
          },
        }
      );
      gsap.fromTo(
        incident3,
        { y: 60, opacity: 0 },
        {
          y: 0,
          delay: 0.1,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: incident3,
            start: 'top center',
          },
        }
      );
      gsap.fromTo(
        incident4,
        { y: 30, opacity: 0 },
        {
          y: 0,
          delay: 0.1,
          opacity: 1,
          duration: 1.5,
          scrollTrigger: {
            trigger: incident4,
            start: 'top center',
          },
        }
      );
  }, []);


  const [showSignUp, setShowSignUp] = useState(false);
  const [pagerDuration, setPagerDuration] = useState('');
  useEffect(() => {
    const hours = Math.floor(Math.random() * 24) + 1;
    const minutes = Math.floor(Math.random() * 60) + 1;
    setPagerDuration(`${hours}h, ${minutes}m`);
  }, []);

  const handleCloseModal = () => {
    setShowSignUp(false);
  };

  const handleModalClick = ({e}: any) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <>
    <NavigationMenuMain />
    <main className='md:max-w-[100%] bg-[#0B1120] flex items-center flex-col justify-center overflow-x-hidden boxtexts'>
    <section className='bg-[#0B1120] mt-5 md:mt-11 max-w-[1900px] gridthing w-full h-full flex items-center flex-col'>
    <div className='flex md:px-[4.5rem] z-10 px-2 justify-between max-w-[120rem] w-[100%] flex-wrap lg:flex-nowrap flex-row gap-10 pt-[5rem] pb-40'>
      <div className='md:w-[70%] w-full flex relative flex-col justify-start gap-5'>
        <img src='/logo.png' alt='logo' className='w-[50px] h-[50px] fadein' />
        <div className='flex flex-col  gap-4'>
          <div className='flex items-center gap-4'>
            <h1 className='bg-indigo-600/30 border pushdown border-indigo-500/40 ping-purple text-indigo-400 font-semibold text-sm rounded-xl max-w-[8rem] flex items-center justify-center px-2 py-1'>
              Latest Updates
            </h1>
            <h1 className='text-neutral-300 pushup font-semibold text-sm flex items-center justify-center'>
              HProjects is in Alpha
              <svg className='h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </h1>
          </div>
          <h1 className='font-bold text-5xl font-sans text-white pushuptext1'>Plan, Build, Push and Respond with confidence</h1>
          <p className='font-medium text-sm text-neutral-400 pushuptext2'>
            Build projects and communicate in real time with your team, manage incidents and tasks with ease.
          </p>
          <div className='flex flex-col items-center md:flex-row h-auto gap-2 md:gap-6 w-full'>
          <SignedOut>
            <div className='flex flex-row gap-2 w-full md:w-1/2 md:gap-6 '>
              <a href='/sign-up'>
                <button className='ease-in-out duration-300 hovmain py-2 px-2 flex items-center justify-center bg-blue-600 rounded-md hover:bg-blue-800'>
                  <h1 className='font-semibold  flex'>Sign up - It's free
                    <svg xmlns="http://www.w3.org/2000/svg" className=' w-5 hovericon' viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 12L10 18V6L16 12Z"></path>
                    </svg>
                  </h1>
                </button>
              </a>
            </div>
          </SignedOut>
          <SignedIn>
            <div className='flex flex-row w-full md:w-1/2 gap-2 md:gap-6 '>
              <a href='/dashboard' className='h-auto w-full'>
              <button className='ease-in-out duration-300 w-full hovmain py-2 px-2 flex items-center justify-center bg-blue-600 rounded-md hover:bg-blue-800'>
              <h1 className='font-semibold flex'>Dashboard 
                    <svg xmlns="http://www.w3.org/2000/svg" className='w-5 hovericon' viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 12L10 18V6L16 12Z"></path>
                    </svg>
                  </h1>
                </button>
              </a>
            </div>
          </SignedIn>

          {/* Modal for SignUp */}
          {showSignUp && (
            <div onClick={handleModalClick} className='fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50 flex items-center justify-center'>
              <div className="flex items-center justify-center h-[100%]">
                <SignUp  />
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
      <div>
        <img src='/indexmainphoto.png' alt='mainphoto' className='w-[100%]  pushright h-[100%] rounded-[0.5rem] border' />
      </div>
    </div>
    </section>
    <section className='bg-[#0B1120] w-full border  border-transparent border-t-[#1f3468]'>
      <div className='py-5 w-full my-10 flex itmes-center justify-center'>
        <div className='w-full flex flex-col gap-5'>
          <div className='w-full items-start flex-col flex justify-start'>
            <div className='flex md:px-[4.5rem] flex-col gap-3 w-full items-center mb-10 justify-center mt-10'>
              <h1 className='text-5xl font-bold text-white md:text-left text-center '>Making tasks work for you</h1>
              <p className='text-neutral-300 text-center md:w-[39rem]'>Using other project planning tools I realized that I was using multiple different softwares. HProjects makes all that clutter into one simple software for you and your team.</p>
              <div className='flex flex-row gap-3 items-center'>
                <img src='harrycampbell.jpeg' alt='logo' className='w-[50px] rounded-full h-[50px]' />
                <div>
                  <h4 className='font-semibold'>Harry Campbell</h4>
                  <p className='text-neutral-300 text-xs'>CEO of HProjects</p>
                </div>
              </div>
            </div>
            <div className='gap-4 flex-col w-full mt-10  items-center flex'>
            <div className='flex flex-col w-full justify-center md:px-[4.5rem] px-2 '>
              <img src='/8.png' alt='logo' className='w-[50px] rounded-full p-1 bg-indigo-500/40 h-[50px]' />
              <h1 className='text-md font-semibold mt-4 mb-3 text-indigo-400'>Task Management</h1>
              <p className='text-xl font-semibold'>A real time task management system.</p>
              <p className='text-sm text-neutral-300 mt-1'>Lead your next project into production with HProjects with our real time system so you can instantly stay up to date with who is updating what.</p>
            </div>
            <div className='mt-5 bg-[#0B1120]/20 h-[40rem] border-b-[#1f3468] border border-transparent gridthing w-full flex items-center flex-col'>
              <div className='mt-14 md:px-[4.5rem] flex items-center justify-center w-full flex-col gap-5'>
                <div className='flex flex-row items-center justify-center gap-5 w-full' id='datasowers'>
                  <Critical /> <High /> <Medium /> <Low /> <Security /> <Feature />
                </div>
                <div className='flex flex-row gap-5 items-center justify-center w-full' id='datasowers2'>
                  <BackLog /> <Todo /> <InProgress /> <Done />
                </div>
              </div>
              <div className='flex flex-col items-center w-full md:px-[4.5rem] px-2 mt-10' id='datasowers3'>
                <h1 className='text-3xl font-semibold md:text-left text-center'>Simple but <span className='text-cyan-400'>effective</span> task labelling</h1>
                <div className='flex flex-col w-full md:w-1/3 mt-5 gap-5'>
                <ContextMenu>
                <ContextMenuTrigger>
                    <HoverCard>
                        <HoverCardTrigger>
                            <div
                                className='dark:border-neutral-800 border-neutral-200 bg-white dark:bg-neutral-900/60 text-black dark:text-white cursor-pointer hover:border-neutral-300 transition-all py-2 border gap-3 flex flex-col rounded-md w-full'
                            >
                                <div className='flex gap-3 pl-4'>
                                    <h1 className='font-semibold'>
                                        Payments Integration
                                    </h1>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='flex gap-3 pl-3'>
                                        <High />
                                        <InProgress />
                                    </div>
                                    <div className='flex gap-3 pr-3 items-center'>
                                            <>
                                                <img src='harrycampbell.jpeg' className='w-6 h-6 rounded-full' alt="Assignee" />
                                            </>      
                                    </div>
                                </div>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent>
                                <div className='border-neutral-800 cursor-pointer hover:border-neutral-300 transition-all py-2 gap-3 flex flex-col rounded-md w-full'>
                                    <div className='flex gap-3 pl-4 flex-col'>
                                        <div className='flex gap-3 pr-3 items-center'>
                                                <>
                                                    <img src='harrycampbell.jpeg' className='w-8 h-8 rounded-full' alt="Assignee" />
                                                    <div>
                                                        <h2 className='font-semibold'>Harry Campbell</h2>
                                                        <p className='text-xs text-neutral-400'>Lead Developer</p>
                                                    </div>
                                                </>

                                        </div>
                                        <h1 className='font-bold'>
                                          Payments Integration
                                        </h1>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-3 pl-3'>
                                            <High /> <InProgress />
                                        </div>
                                    </div>
                                    <div className='flex gap-3 pl-4'>
                                        <p className='text-sm max-w-[500px] text-wrap'>
                                            Payments Integration is a task that needs to be completed by the end of the week. It is a high priority task that needs to be completed by the end of the week.
                                        </p>
                                    </div>
                                    
                                </div>
                        </HoverCardContent>
                    </HoverCard>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem className='cursor-pointer hover:bg-yellow-400/20 text-yellow-200'>
                        Archive 
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <ContextMenu>
                <ContextMenuTrigger>
                    <HoverCard>
                        <HoverCardTrigger>
                            <div
                                className='dark:border-neutral-800 border-neutral-200 bg-white dark:bg-neutral-900/60 text-black dark:text-white cursor-pointer hover:border-neutral-300 transition-all py-2 border gap-3 flex flex-col rounded-md w-full'
                            >
                                <div className='flex gap-3 pl-4'>
                                    <h1 className='font-semibold'>
                                        Users dont like the new UI changes
                                    </h1>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='flex gap-3 pl-3'>
                                        <Medium />
                                        <Done />
                                    </div>
                                    <div className='flex gap-3 pr-3 items-center'>
                                            <>
                                                <img src='/staff/jamesblackhurst.jpeg' className='w-6 h-6 rounded-full' alt="Assignee" />
                                            </>      
                                    </div>
                                </div>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent>
                                <div className='border-neutral-800 cursor-pointer hover:border-neutral-300 transition-all py-2 gap-3 flex flex-col rounded-md w-full'>
                                    <div className='flex gap-3 pl-4 flex-col'>
                                        <div className='flex gap-3 pr-3 items-center'>
                                                <>
                                                    <img src='/staff/jamesblackhurst.jpeg' className='w-8  h-8 rounded-full' alt="Assignee" />
                                                    <div>
                                                        <h2 className='font-semibold'>James Blackhurst</h2>
                                                        <p className='text-xs text-neutral-400'>UI / UX Engineer</p>
                                                    </div>
                                                </>

                                        </div>
                                        <h1 className='font-bold'>
                                          Users dont like the new UI changes
                                        </h1>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-3 pl-3'>
                                          <Medium />
                                          <Done />
                                        </div>
                                    </div>
                                    <div className='flex gap-3 pl-4'>
                                        <p className='text-sm max-w-[500px] text-wrap'>
                                        Users have been complaining about the new UI changes that have been made. We need to revert back to the old UI changes or deploy updates to fix the issues.
                                        </p>
                                    </div> 
                                    <div className='flex gap-3 pl-4'>
                                        <p className='text-sm max-w-[500px] w-auto text-wrap border border-green-400 bg-green-500/20 p-1 rounded-md font-semibold flex px-2'>
                                            Task Completed - This task will be archived in 30 days.
                                        </p>
                                    </div>
                                </div>
                        </HoverCardContent>
                    </HoverCard>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem className='cursor-pointer hover:bg-yellow-400/20 text-yellow-200'>
                        Archive 
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
                </div>
              </div>
            </div>
            <div className='flex flex-col w-full md:px-[4.5rem] mt-10'>
              <img src='/logo.png' alt='logo' className='w-[50px] rounded-full p-1 bg-green-500/40 h-[50px]' />
              <h1 className='text-md font-semibold mt-4 mb-3 text-indigo-400'>Pager</h1>
              <p className='text-xl font-semibold'>Get people where they need to be if a service goes down.</p>
              <p className='text-sm text-neutral-300 mt-1'>Pager is a system that lets you know when a service goes down. It will alert you and whoever is on call to let you know that a service is down and needs to be fixed.</p>
            </div>
            <div className='mt-5 bg-[#0B1120]/20 h-[40rem] border-b-[#1f3468] border border-transparent gridthing w-full flex items-center flex-col'>
              <div className='mt-10 relative w-full md:px-[4.5rem]flex flex-col max-w-[120rem] justify-center md:px-[4.5rem] px-2'>
              <div className='flex flex-row ml-5 w-full'>
              <div className='flex absolute top-[2.4rem]  left-[-67px] md:left-[-7px] w-full h-full px-[4.5rem]' id='datasowers4'>
                  <div className='w-[15px] h-[15px] border-2 border-neutral-400 rounded-full'></div>
                </div>
                <div className='flex absolute top-[3.5rem] left-[-60px] md:left-[0px] w-full h-full px-[4.5rem]' >
                  <div className='w-[1px] h-[7rem] bg-gradient-to-b from-neutral-400 to-green-400' id='datasowers5'></div>
                </div>
                <div className='flex absolute top-[10.7rem]  left-[-67px] md:left-[-7px] w-full h-full px-[4.5rem]' id='datasowers6'>
                  <div className='w-[15px] h-[15px] border-2 border-green-400 rounded-full'></div>
                </div>
                <div className='flex absolute top-[11.85rem] left-[-60px] md:left-[0px] w-full h-full px-[4.5rem]'>
                  <div className='w-[1px] h-[7rem] bg-gradient-to-b from-green-400 to-red-400' id='datasowers7'></div>
                </div>
                <div className='flex absolute top-[18.99rem] left-[-67px] md:left-[-7px] w-full h-full px-[4.5rem]' id='datasowers8'>
                  <div className='w-[15px] h-[15px] border-2 border-red-400 rounded-full'></div>
                </div>
                <div className='flex relative w-full flex-col'>
                <div className='w-full relative top-[1rem]'>
                  <div id="pageroncall" className="w-full flex items-center justify-center">
                    <div className={`pr-2 border dark:border-neutral-400 border-neutral-600 dark:bg-neutral-400/20 bg-neutral-700 items-center h-[4rem] w-full flex rounded-lg`}>
                      <div className='pl-2 flex justify-center items-center h-full'>
                        <div className='w-1.5 h-[3rem] flex items-end justify-center rounded-lg dark:bg-neutral-400/20 bg-neutral-700 overflow-hidden'>
                          <div className='w-full' style={{ height: `0%`, backgroundColor: 'green' }}></div>
                        </div>
                      </div>
                      <div className='pl-3 h-max flex justify-center flex-col text-left'>
                        <h1 className='font-semibold text-md text-left text-white'>You're off pager</h1>
                      </div>
                    </div>
                </div>
              </div>
                <div className='w-full relative top-[5.2rem]'>
                  <div id="pageroncall2" className="w-full flex items-center justify-center">
                    <div className={`pr-2 border dark:border-green-400 border-green-600 bg-green-700/20 dark:bg-green-400/20 items-center h-[4rem] w-full flex rounded-lg`}>
                      <div className='pl-2 flex justify-center items-center h-full'>
                        <div className='w-1.5 h-[3rem] flex items-end justify-center rounded-lg dark:bg-green-400/20 bg-green-700/20 overflow-hidden'>
                          <div className='w-full' style={{ height: `80%`, backgroundColor: 'green' }}></div>
                        </div>
                      </div>
                      <div className='pl-3 h-max flex justify-center flex-col text-left'>
                        <h1 className='font-semibold text-md text-left text-white'>You're on pager</h1>
                        <p className='text-neutral-300 text-xs'>For the next 2 hours 40 mins</p>
                      </div>
                    </div>
                </div>
                </div>
                <div className='w-full relative top-[9.2rem]'>
                  <div id="pageroncall3" className="w-full flex items-center justify-center">
                    <div className={`pr-2 border dark:border-red-400 border-red-600 bg-red-700/20 dark:bg-red-400/20 items-center h-[4rem] w-full flex rounded-lg`}>
                      <div className='pl-2 flex justify-center items-center h-full'>
                        <div className='w-1.5 h-[3rem] flex items-end justify-center rounded-lg dark:bg-red-400/20 bg-red-700/20 overflow-hidden'>
                          <div className='w-full flex items-center justify-center font-semibold text-xl' style={{ height: `100%`, backgroundColor: 'red' }}>!</div>
                        </div>
                      </div>
                      <div className='pl-3 h-max flex justify-center flex-col text-left'>
                        <h1 className='font-semibold text-md text-left text-white'>Incident Reported!</h1>
                        <p className='text-neutral-300 text-xs'>Service: Log in</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full md:px-[4.5rem] mt-10'>
        <img src='/logo.png' alt='logo' className='w-[50px] rounded-full p-1 bg-red-500/40 h-[50px]' />
        <h1 className='text-md font-semibold mt-4 mb-3 text-indigo-400'>Incidents</h1>
        <p className='text-xl font-semibold'>Update, Page, Collaborate in incidents</p>
        <p className='text-sm text-neutral-300 mt-1'>With Incidents get on the same page even in times of chaos on your project. Using our real time Incident management system to establish leaders, call in responders and more.</p>
        </div>
            <div className='mt-5 bg-[#0B1120]/20 h-[40rem] border-b-[#1f3468] border border-transparent gridthing w-full flex items-center flex-col'>
              <div className='mt-10 relative w-full md:px-[4.5rem]flex flex-col max-w-[120rem] justify-center md:px-[4.5rem] px-2'>
              <div className='flex flex-row ml-5 w-full'>
                <div className='flex absolute top-[2.4rem] left-[-67px] md:left-[-7px] w-full h-full px-[4.5rem]' id='datasowers4'>
                  <div className='flex flex-col w-full'>
                    <div id='incident1'>
                      <div className="w-full h-auto gap-2 flex-row flex">
                        <div className="flex flex-col items-center">
                            <img className="w-8 h-8 rounded-full" src="/staff/jamesblackhurst.jpeg" alt={`James Blackhurst`} />
                            <div className="border-l h-full" />
                        </div>
                        <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                            <div className="flex flex-row items-center gap-3 ml-2">
                                <p className="text-md font-normal text-white">
                                    <span className="font-semibold ">James Blackhurst</span> declared an incident
                                </p>
                                <p className="text-md font-normal text-neutral-400"> 2 hours ago</p>
                            </div>
                            <div className="flex flex-col bg-neutral-900/70 rounded-md gap-1 py-3 px-4 ml-2">
                                <p className="text-neutral-300 font-semibold gap-4 flex">Status <span className="text-white">Investigating</span></p>
                                <p className=" text-neutral-300 font-semibold gap-4 flex">Severity <span className="text-white">High</span></p>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div id='incident2'>
                      <div className="w-full h-auto gap-2 flex-row flex">
                        <div className="flex flex-col items-center">
                            <img className="w-8 rounded-full h-8" src="/staff/jamesblackhurst.jpeg"></img>
                            <div className="border-l h-full" />
                        </div>
                        <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                            <div className="flex flex-row items-center gap-3 ml-2">
                                <p className="text-md font-normal text-white"><span className="font-semibold">James Blackhurst</span> has sent a pager to</p>
                                <p className="text-md font-normal text-neutral-400">2 hours ago</p>
                            </div>
                            <div className="flex flex-col bg-neutral-900/70 rounded-md gap-1 py-3 px-4 ml-2">
                                <p className="text-neutral-300 font-semibold items-center gap-3 flex">
                                    <img className="w-8 h-8 rounded-full" src="/harrycampbell.jpeg"></img>
                                    <span className="text-white">Harry Campbell</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    </div>
                    <div id='incident3'>
                      <div className="w-full h-auto gap-2 flex-row flex">
                          <div className="flex flex-col items-center">
                              <img className="w-8 h-10 rounded-full" src="harrycampbell.jpeg" alt={`Harry Campbell`} />
                              <div className="border-l h-full" />
                          </div>
                          <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                              <div className="flex flex-row items-center gap-3 ml-2">
                                  <p className="text-md font-normal text-white">
                                      <span className="font-semibold ">Harry Campbell</span> has been appointed as the lead responder
                                  </p>
                                  <p className="text-md font-normal text-neutral-400">1 hour ago</p>
                              </div>
                          </div>
                    </div>
                    </div>
                    <div id='incident4'>
                      <div className="w-full h-auto gap-2 flex-row flex">
                        <div className="flex flex-col items-center">
                            <img className="w-8 rounded-full h-8" src="harrycampbell.jpeg" alt={`Harry Campbells's avatar`} />
                            <div className="border-l h-full" />
                        </div>
                        <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                            <div className="flex flex-row items-center gap-3 ml-2">
                                <p className="text-md font-normal text-white">
                                    <span className="font-semibold">Harry Campbell</span> provided an update
                                </p>
                                <p className="text-md font-normal text-neutral-400">1 hour ago</p>
                            </div>
                            <div className="flex flex-col bg-neutral-900/70 rounded-md gap-1 py-3 ml-2">
                                <p className="text-white border-b pb-2 px-4 font-semibold gap-4 flex">
                                    We are working on a fix for the issue, This is due to the intern force pushing updates to the main branch.
                                </p>
                                <p className="text-neutral-300 text-sm pb-2 px-4 font-semibold gap-4 flex">
                                    Next update expected now
                                </p>
                            </div>
                        </div>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full md:px-[4.5rem] mt-10'>
        <div className='w-full flex flex-col items-center justify-center'>
          <h1 className='font-bold text-2xl'>Lets start making your projects today with HProjects</h1>
          <Link href='/sign-up' className='w-1/3'>
            <button className='ease-in-out duration-300 hovmain w-full py-2 px-2 flex items-center justify-center bg-blue-600 rounded-md hover:bg-blue-800 mt-5'>Get started</button>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
</main>
<Footer />
</>
  );
}
