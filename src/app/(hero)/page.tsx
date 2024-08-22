"use client";
import { useState, useEffect, useRef } from 'react';
import { SignedOut, SignedIn, SignUp } from '@clerk/nextjs';
import HeaderIndex from '../../components/header/header';
import Footer from '../../components/footer/footer';
import gsap from 'gsap';
import { High, Critical } from '../../components/dropdowns/priorities/critical';
import { InProgress } from '../../components/dropdowns/status/status';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/globals.css';
import './index.css';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../components/ui/hover-card";


gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const ctx = gsap.context(() => {
      const element = document.getElementById('blurunblur');
      gsap.set(element, { filter: 'blur(10px)' });

      gsap.fromTo(element, 
        { filter: 'blur(10px)', opacity: 0 },
        { 
        filter: 'blur(0px)',
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: element,
          start: 'top 110%',
          end: 'bottom 110%', 
          toggleActions: 'play none none',
        },
        }
      );

      gsap.fromTo('#swiperwhiter',
        { width: '100%', zIndex: '1000000000000', translateX: '0%' },
        {
        width: '100%',
        translateX: '100%',
        duration: 5,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#swiperwhiter',
          start: 'top 110%', 
          end: 'bottom 110%',
          toggleActions: 'play none none',
        },
        }
      );

      gsap.fromTo("#blurunblurb", 
        { filter: 'blur(10px)', opacity: 0 },
        { 
        filter: 'blur(0px)',
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: "#blurunblurb",
          start: 'top 80%', 
          end: 'bottom 70%',
          toggleActions: 'play none none reverse',
        },
        }
      );
      gsap.fromTo('#aacswhite',
        { width: '100%', zIndex: '1000000000000', translateX: '0%' },
        {
        width: '100%',
        translateX: '100%',
        duration: 5,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#aacswhite',
          start: 'top 80%', 
          end: 'bottom 70%',
          toggleActions: 'play none none reverse',
        },
        }
      );
      gsap.fromTo("#blurunblurc", 
        { filter: 'blur(10px)', opacity: 0 },
        { 
        filter: 'blur(0px)',
        opacity: 1,
        duration: 1,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: "#blurunblurc",
          start: 'top 80%', 
          end: 'bottom 70%',
          toggleActions: 'play none none reverse',
        },
        }
      );
      gsap.fromTo('#cacswhite',
        { width: '100%', zIndex: '1000000000000', translateX: '0%' },
        {
        width: '100%',
        translateX: '100%',
        duration: 5,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#cacswhite',
          start: 'top 80%', 
          end: 'bottom 70%',
          toggleActions: 'play none none reverse',
        },
        }
      );
      gsap.fromTo('#firstcomment',
        { width: '100%', opacity: 0, zIndex: '1000000000000', translateY: '100%' },
        {
        opacity: 1,
        width: '100%',
        translateY: '0%',
        duration: 0.5,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#firstcomment',
          start: 'top 80%', 
          end: 'bottom 70%',
          toggleActions: 'play none none reverse',
        },
        }
      );
      gsap.fromTo('#secondcomment',
        { width: '100%', opacity: 0, zIndex: '1000000000000', translateY: '100%' },
        {
        opacity: 1,
        width: '100%',
        translateY: '0%',
        duration: 0.5,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#secondcomment',
          start: 'top 60%', 
          end: 'bottom 50%',
          toggleActions: 'play none none reverse',
        },
        }
      );
      gsap.fromTo('#thirdcomment',
        { width: '100%', opacity: 0, zIndex: '1000000000000', translateY: '100%' },
        {
        opacity: 1,
        width: '100%',
        translateY: '0%',
        duration: 0.5,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#thirdcomment',
          start: 'top 60%', 
          end: 'bottom 50%',
          toggleActions: 'play none none reverse',
        },
        }
      );
      gsap.fromTo('#databasetasks',
        { width: '100%', opacity: 0, zIndex: '1000000000000', translateX: '100%' },
        {
        opacity: 1,
        width: '100%',
        translateX: '0%',
        duration: 0.5,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#databasetasks',
          start: 'top 60%', 
          end: 'bottom 60%',
          toggleActions: 'play none none reverse',
        },
        }
      );
      gsap.fromTo('#databasetasks1',
        { width: '100%', opacity: 0, zIndex: '1000000000000', translateX: '100%' },
        {
        opacity: 1,
        width: '100%',
        translateX: '0%',
        duration: 0.5,
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: '#databasetasks',
          start: 'top 50%', 
          end: 'bottom 50%',
          toggleActions: 'play none none reverse',
        },
        }
      );
      }, container);

      return () => ctx.revert();
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
    <HeaderIndex />
    <main className='md:max-w-[100%] flex items-center flex-col justify-center overflow-x-hidden boxtexts'>
    <section className='bg-[#0B1120] gridthing w-full  h-full flex items-center flex-col'>
    <div className='flex md:px-[4.5rem] z-10 px-2 justify-between max-w-[120rem] w-[100%] flex-wrap lg:flex-nowrap flex-row gap-10 pt-[5rem] pb-40'>
      <div className='md:w-[70%] w-full flex relative flex-col justify-start gap-5'>
        <img src='/logo.png' alt='logo' className='w-[50px] h-[50px] fadein' />
        <div className='flex flex-col  gap-4'>
          <div className='flex items-center gap-4'>
            <h1 className='bg-indigo-600/30 border pushdown border-indigo-500/40 ping-purple text-indigo-400 font-semibold text-sm rounded-xl max-w-[8rem] flex items-center justify-center px-2 py-1'>
              Latest Updates
            </h1>
            <h1 className='text-neutral-300 pushup font-semibold text-sm flex items-center justify-center'>
              Just deployed HProjects 
              <svg className='h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
              </svg>
            </h1>
          </div>
          <h1 className='font-bold text-5xl font-sans text-white pushuptext1'>Plan, Build and Push with confidence</h1>
          <p className='font-medium text-sm text-neutral-400 pushuptext2'>
            Build projects and communicate in real time with your team, manage incidents and tasks with ease.
          </p>
          <div className='flex flex-row h-auto gap-6 w-full'>
          <SignedOut>
            <div className='flex flex-row mt-6 gap-2 md:gap-6 '>
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
            <div className='flex flex-row mt-2 gap-2 md:gap-6 '>
              <a href='/dashboard' className='h-auto'>
              <button className='ease-in-out duration-300 hovmain py-2 px-2 flex items-center justify-center bg-blue-600 rounded-md hover:bg-blue-800'>
              <h1 className='font-semibold flex'>Dashboard 
                    <svg xmlns="http://www.w3.org/2000/svg" className='] w-5 hovericon' viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 12L10 18V6L16 12Z"></path>
                    </svg>
                  </h1>
                </button>
              </a>
            </div>
          </SignedIn>
          <div className='flex flex-row mt-2 gap-2 md:gap-6 '>
              <a href='/'  className='h-auto'>
              <button className='ease-in-out duration-300 hovmain py-2 px-2 flex items-center justify-center border bg-blue-600/20 hover:bg-blue-600/70 border-blue-600 rounded-md hover:border-blue-800'>
              <h1 className='font-semibold flex'>Learn more 
                    <svg xmlns="http://www.w3.org/2000/svg" className='] w-5 hovericon' viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 12L10 18V6L16 12Z"></path>
                    </svg>
                  </h1>
                </button>
              </a>
            </div>

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
        <img src='/indexmainphoto.png' alt='mainphoto' className='w-[100%] pushright h-[100%] rounded-[0.5rem] border' />
      </div>
    </div>
    </section>
    <section className='bg-[#0B1120] w-full border  border-transparent border-t-[#1f3468]'>
      <div className='md:px-[4.5rem] py-5 w-full my-10 flex itmes-center justify-center'>
        <div className='max-w-[120rem] w-full flex flex-col gap-5'>
          <div className='w-full items-start flex justify-start'>
            <div className='flex flex-col'>
              <h1 className='font-semibold text-2xl'>Task managment</h1>
              <p className='text-neutral-300 text-sm'>Manage tasks with your team in real time seamlessly</p>
            </div>

          </div>
          <div className='w-full items-end flex justify-end'>
            <div className='flex flex-col items-end'>
              <h1 className='font-semibold text-2xl'>Incident Response</h1>
              <p className='text-neutral-300 text-sm'>Get instantly up to date even when an intern sudo RM -RF's the production database</p>
            </div>
          </div>
          <div className='w-full items-start flex justify-start'>
            <div className='flex flex-col'>
              <h1 className='font-semibold text-2xl'>Pager</h1>
              <p className='text-neutral-300 text-sm'>Get your responders where they need to be and call them instantly</p>
            </div>
          </div>
          <div className='w-full items-end flex justify-end'>
            <div className='flex flex-col items-end'>
              <h1 className='font-semibold text-2xl'>Direct Messages</h1>
              <p className='text-neutral-300 text-sm'>Collaborate with your team on tasks in a 1 to 1 chat or group chat!</p>
            </div>
          </div>
          <div className='w-full items-start flex justify-start'>
            <div className='flex flex-col'>
              <h1 className='font-semibold text-2xl'>Real Time Team Collaboration</h1>
              <p className='text-neutral-300 text-sm'>Our real time system </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
    </>
  );
}
