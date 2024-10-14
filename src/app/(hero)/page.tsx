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
import { Inter } from 'next/font/google'
import Head from 'next/head';
import { Shield, Lock, Users, Eye, Server, RefreshCw } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { Card, CardContent } from "../../components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel"
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Customize weights here
});

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  function textloop() {
    const [isCritical, setIsCritical] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        setIsCritical((prevIsCritical) => !prevIsCritical);
      }, 5000);

      return () => clearInterval(interval);
    }, []);

    return (
      <>
        {isCritical ? (
          <>
            <h1 className='text-red-200 font-semibold text-md text-left'>You have been paged.</h1>
            <p className='text-neutral-300 text-xs'>Click to go to the incident</p>
          </>
        ) : (
          <>
          <h1 className='font-semibold text-md text-left text-white'>You're on pager</h1>
          <p className='text-neutral-300 text-xs'>For the next 2h 40m</p>
          </>
        )}
      </>
    );
  }

  return (
    <>
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com"  />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
    </Head>
    <NavigationMenuMain />
    <main className='flex flex-col bg-neutral-200 h-auto'>
      <section className='bg-gradient-to-r from-[#1E3A8A] h-auto to-[#3B82F6] mx-auto w-full rounded-b-[5rem] px-2 pb-[12rem] md:px-[4.5rem] py-3' id='home'>
        <div className='flex flex-col mt-[120px] gap-3 items-center'>
        <h1 style={{ fontFamily: 'Inter, sans-serif' }} className='text-5xl text-center md:text-6xl'>
          Seamless Planning. Instant Response. Total Control.
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif' }} className='text-md md:text-lg mt-5 font-lg md:w-[40rem] text-[#F9FAFB] text-center'>
          Plan smarter, push tasks faster, respond instantly, and stay connected with user feedback. Everything you need, all in one place.
        </p>
        <div className='flex gap-3 mt-5'>
          <Link href='/sign-up'>
            <div style={{ fontFamily: 'Inter, sans-serif' }} className='bg-[#F9FAFB] backdrop-blur-lg transition-all hover:text-white  hover:bg-[#f9fafb62] text-[#060507] px-10 py-4 text-xl rounded-3xl'>Get Started</div>
          </Link>
        </div>
        <div className='flex lg:flex-row flex-col mt-[100px] gap-4'>
          <div className='flex flex-col justify-between gap-3'> 
            <div className="pr-5 border dark:border-green-400 backdrop-blur-lg  dark:bg-green-400/20 items-center h-[4rem] w-auto flex rounded-lg">
              <div className='pl-2 flex justify-center items-center h-full'>
                <div className='w-1.5 h-[3rem] flex items-end justify-center rounded-lg dark:bg-green-400/20 bg-green-700/20 overflow-hidden'>
                  <div className='w-full' style={{ height: `35%`, backgroundColor: 'green' }}></div>
                </div>
              </div>
              <div className='pl-3 h-max flex justify-center flex-col text-left'>
                <h1 className='font-semibold text-md text-left text-white'>You're on pager</h1>
                <p className='text-neutral-300 text-xs'>For the next 2h 40m</p>
              </div>
            </div>
            <div id="pageroncall" className="w-max hidden lg:flex items-center justify-center animate-ping rounded-lg">
              <div className={`pr-5 border dark:border-red-400 border-red-600 bg-red-700/20 dark:bg-red-400/20 items-center h-[4rem] w-full flex rounded-lg`}>
                <div className='pl-2 flex justify-center items-center h-full'>
                  <div className='w-1.5 h-[3rem] flex items-end justify-center rounded-lg dark:border-red-400 border-red-600 bg-red-700/20 dark:bg-red-400/20 overflow-hidden'>
                    <div className='w-full flex items-center justify-center font-semibold text-xl' style={{ height: `35%`, backgroundColor: 'red' }}>!</div>
                  </div>
                </div>
                <div className='pl-3 h-max flex justify-center flex-col text-left'>
                  <h1 className='text-red-200 font-semibold text-md text-left'>You have been paged.</h1>
                  <p className="text-xs font-normal text-neutral-200">Click to go to the incident</p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col bg-neutral-300/25 lg:w-[50rem] h-[30rem] backdrop-blur-lg border border-white/40 rounded-xl  gap-5'>
          <div className="flex-col w-full  border-b-neutral-100 border-transparent border gap-4 justify-between pb-5 mt-5 flex">
            <div className="px-7 flex flex-row items-center justify-between">
                <div className='flex flex-row gap-2 items-center'>
                    <div className="p-2 dark:bg-red-500 text-white rounded-md ">
                        <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.00001 20V14C4.00001 9.58172 7.58173 6 12 6C16.4183 6 20 9.58172 20 14V20H21V22H3.00001V20H4.00001ZM6.00001 14H8.00001C8.00001 11.7909 9.79087 10 12 10V8C8.6863 8 6.00001 10.6863 6.00001 14ZM11 2H13V5H11V2ZM19.7782 4.80761L21.1924 6.22183L19.0711 8.34315L17.6569 6.92893L19.7782 4.80761ZM2.80762 6.22183L4.22183 4.80761L6.34315 6.92893L4.92894 8.34315L2.80762 6.22183Z"></path></svg>
                    </div>
                    <div className='flex flex-col'>
                        <p className='text-sm mb-[-6px] font-medium'>Incidents</p>
                        <h1 className="flex text-2xl font-bold text-white gap-2" id="tasksproject">IND-16 <span className='md:flex hidden'>Sign-in Flow Failed</span></h1>
                    </div>
                </div>
                <div className='flex flex-row gap-2'>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                        <div className="p-2 font-semibold items-center flex justify-center text-lg  text-white rounded-md ">
                            <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10ZM19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path></svg>
                        </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800">
                                Page Responders
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800">
                                Delete Incident
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
        <div className='flex flex-col px-5'>

        <div className="w-full h-auto gap-2 flex-row flex">
            <div className="flex flex-col items-center">
          <img className="w-8 h-8 rounded-full" src="/staff/jamesblackhurst.jpeg" alt={`James Blackhurst`} />
          <div className="border-l h-full" />
            </div>
            <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
          <div className="flex flex-row items-center gap-3 ml-2">
          <div className="text-md font-normal text-black dark:text-white">
            <span className="font-semibold">James Blackhurst</span> declared an incident
          </div>
              <p className="text-md font-normal sm:flex hidden text-neutral-200"> 46 seconds ago</p>
          </div>
          <div className="flex flex-col bg-neutral-400/20 rounded-md gap-1 py-3 px-4 ml-2">
              <p className="text-neutral-800 dark:text-neutral-300 font-semibold gap-4 flex">Status <span className="text-black dark:text-white">Investigating</span></p>
              <div className=" text-neutral-800 dark:text-neutral-300 font-semibold gap-4 flex flex-row">Severity <Critical /></div>
          </div>
          </div>
            </div>
            <div className="w-full h-auto gap-2 flex-row flex">
            <div className="flex flex-col items-center">
                <img className="w-8 rounded-full h-8" src="/staff/jamesblackhurst.jpeg"></img>
            </div>
            <div className="flex flex-col h-full pb-9 w-full gap-4 justify-center">
                <div className="flex flex-row items-center gap-3 ml-2">
                    <p className="text-md font-normal text-black dark:text-white"><span className="font-semibold">James Blackhurst</span> has sent a pager to</p>
                    <p className="text-md font-normal text-neutral-200 sm:flex hidden">23 seconds ago</p>
                </div>
                <div className="flex flex-col bg-neutral-400/20 rounded-md gap-1 py-3 px-4 ml-2">
                    <div className="text-neutral-300 font-semibold items-center gap-3 flex">
                        <img className="w-8 h-8 rounded-full" src="/harrycampbell.jpeg"></img>
                        <span className="text-black dark:text-white">Harry Campbell</span>
                    </div>
                </div>
            </div>
        </div>
          </div>
          </div>
          <div id="pageroncall" className="w-full lg:hidden flex items-center justify-center animate-ping rounded-lg">
              <div className={`pr-5 border dark:border-red-400 border-red-600 bg-red-700/20 dark:bg-red-400/20 items-center h-[4rem] w-full flex rounded-lg`}>
              <div className='pl-2 flex justify-center items-center h-full'>
                <div className='w-1.5 h-[3rem] flex items-end justify-center rounded-lg dark:border-red-400 border-red-600 bg-red-700/20 dark:bg-red-400/20 overflow-hidden'>
                <div className='w-full flex items-center justify-center font-semibold text-xl' style={{ height: `35%`, backgroundColor: 'red' }}>!</div>
                </div>
              </div>
              <div className='pl-3 h-max flex justify-center flex-col text-left'>
                <h1 className='text-red-200 font-semibold text-md text-left'>You have been paged.</h1>
                <p className='text-neutral-300 text-xs'>Click to go to the incident</p>
              </div>
              </div>
            </div>
          <div className='flex lg:flex-col flex-col gap-3 justify-between'>
          <div className='flex flex-row justify-between bg-neutral-300/25 futuristicbounce  w-full h-[7rem] backdrop-blur-lg border border-white/40 rounded-xl px-5 py-5 gap-5'>
            <div className='flex flex-col justify-between gap-3'>
              <h1 className='font-medium text-md'>Refactor Code for Performance</h1>
              <div className='flex flex-row gap-2'>
                <Critical />
                <BackLog />
              </div>
            </div>
            <div className='flex flex-col items-end justify-end h-full'>
              <div className='w-7 h-7 rounded-full bg-red-500'>
                <img src='/staff/jamesblackhurst.jpeg' className='rounded-full' />
              </div>
            </div>
          </div>
          <div className='flex flex-row justify-between bg-neutral-300/25 invertedfuturisticbounce w-full h-[7rem] backdrop-blur-lg border border-white/40 rounded-xl px-5 py-5 gap-5'>
            <div className='flex flex-col justify-between gap-3'>
              <h1 className='font-medium text-md'>Fix API Rate Limiting</h1>
              <div className='flex flex-row gap-2'>
                <High />
                <Todo />
              </div>
            </div>
            <div className='flex flex-col items-end justify-end h-full'>
              <div className='w-7 h-7 rounded-full bg-red-500'>
                <img src='harrycampbell.jpeg' className='rounded-full' />
              </div>
            </div>
          </div>
          </div>
        </div>
        </div>
      </section>
      <section className=' mx-auto px-2 lg:mx-40 items-center flex justify-center w-full text-black pb-[12rem] pt-[12rem] md:px-[4.5rem] py-3 white' id='products'>
        <div className='max-w-[1900px] flex items-center justify-center flex-col w-full'>
          <div className='w-full flex items-start justify-start'>
            <h1 style={{ fontFamily: 'Inter, sans-serif' }} className='text-4xl md:text-5xl'>One Project,<br/> Multiple Branches</h1>
          </div>
          <div className='flex flex-col md:flex-row gap-5 mt-9'>
            <div className='border-t md:w-[25%] border-neutral-950 px-4 py-3'>
              <h1 className='font-semibold text-lg'>Start a project</h1>
              <p>Add team members, Design, Push and Respond if something goes down.</p>
            </div>

            <div className='border-t md:w-[25%] border-neutral-950 px-4 py-3'>
              <h1 className='font-semibold text-lg'>Manage Incidents</h1>
              <p>Identify and address issues immediately. Collaborate with team members in real-time to solve problems.</p>
            </div>
            <div className='border-t md:w-[25%] border-neutral-950 px-4 py-3'>
              <h1 className='font-semibold text-lg'>Receive Feedback</h1>
              <p>Submit and view feedback from stakeholders and users to continuously improve the project.</p>
            </div>
          </div>
        </div>
      </section>
      <SectionUses />
      <SecuritySection />
      <SignupBaseSection />
    </main>
    <Footer />
    </>
  );
}

function SignupBaseSection() {
  return(
    <section
      className="bg-blue-400 px-2 items-center flex justify-center w-full text-white pb-[6rem] pt-[6rem] md:px-[4.5rem] py-3"

    >
      <div className="flex items-center justify-center flex-col h-full w-full">
        <div className="w-full flex items-center h-full flex-col gap-8 justify-center">
          <h1
            style={{ fontFamily: "Inter, sans-serif" }}
            className="text-4xl md:text-5xl"
          >
            Get your team together and start your project.
          </h1>
          <Link
            href={"/sign-up"}
            className="flex items-center overflow-hidden"
          >
            <button>
              <div
                className="bg-[#F9FAFB] backdrop-blur-lg transition-all hover:text-white  hover:bg-[#f9fafb62] text-[#060507] mb-10 px-10 py-4 text-xl rounded-3xl"
              >
                Get Started
              </div>
            </button>
            </Link>
        </div>
      </div>
    </section>
  )
}

function SecuritySection() {
  const securityFeatures = [
    {
      icon: <Shield className="w-8 h-8 text-[#7DF9FF]" />,
      title: "Encrypted Data",
      description: "Your data is protected with state-of-the-art encryption algorithms, ensuring confidentiality at rest and in transit."
    },
    {
      icon: <Lock className="w-8 h-8 text-[#7DF9FF]" />,
      title: "Secure Authentication",
      description: "Multi-factor authentication and secure password policies protect your account from unauthorized access."
    },
    {
      icon: <Users className="w-8 h-8 text-[#7DF9FF]" />,
      title: "Role-Based Access Control",
      description: "Granular permissions and role management ensure team members only access what they need."
    },
    {
      icon: <Eye className="w-8 h-8 text-[#7DF9FF]" />,
      title: "Activity Monitoring",
      description: "Real-time logs and alerts keep you informed of all activities within your projects."
    },
    {
      icon: <Server className="w-8 h-8 text-[#7DF9FF]" />,
      title: "Secure Infrastructure",
      description: "Our systems are hosted on industry-leading cloud providers with multiple layers of security."
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-[#32dee7]" />,
      title: "Regular Security Updates",
      description: "We continuously update our systems to protect against the latest security threats and vulnerabilities."
    }
  ]

  return (
    <section className='bg-gradient-to-tr from-teal-500 to-blue-500 px-4 h-auto flex justify-center w-full text-white py-24 md:px-12' id='security'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 style={{ fontFamily: 'Inter, sans-serif' }} className='text-4xl md:text-5xl font-bold mb-4'>
            Engineered for <span className="text-[#7DF9FF]">Uncompromising Security</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your projects and team deserve the highest level of protection. Our platform is built from the ground up with security at its core.
          </p>
        </div>
        <div className='grid grid-cols-1 pt-12 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {securityFeatures.map((feature, index) => (
            <div key={index} className='bg-neutral-100/20 backdrop-blur-lg border border-white/40 rounded-lg p-6 shadow-lg hover:bg-neutral-300/40 transition-colors duration-300'>
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className='font-semibold text-xl ml-3'>{feature.title}</h3>
              </div>
              <p className="text-gray-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionUses() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (scrollContainer) {
      const handleWheel = (e: WheelEvent) => {
        e.preventDefault()
        scrollContainer.scrollLeft += e.deltaY
      }

      const handleMouseDown = (e: MouseEvent) => {
        setIsDragging(true)
        setStartX(e.pageX - scrollContainer.offsetLeft)
        setScrollLeft(scrollContainer.scrollLeft)
      }

      const handleMouseUp = () => {
        setIsDragging(false)
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - scrollContainer.offsetLeft
        const walk = (x - startX) * 2
        scrollContainer.scrollLeft = scrollLeft - walk
      }

      scrollContainer.addEventListener('wheel', handleWheel)
      scrollContainer.addEventListener('mousedown', handleMouseDown)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        scrollContainer.removeEventListener('wheel', handleWheel)
        scrollContainer.removeEventListener('mousedown', handleMouseDown)
        window.removeEventListener('mouseup', handleMouseUp)
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [isDragging, startX, scrollLeft])

  return (
    <section className='bg-black mx-auto w-full pt-32 h-auto px-4 pb-24 md:px-12' id='functions'>
      <h1 style={{ fontFamily: 'Inter, sans-serif' }} className='text-4xl text-center md:text-5xl text-white'>
        The project management tool that <br /> makes <b>you</b> deploy on time
      </h1>
      <p className='text-center mt-4 text-lg text-gray-300'>
        Get up to date on your project with our software to ensure that you and your team can deploy on time.
      </p>
      <div 
        ref={scrollRef}
        className='w-full overflow-x-auto no-scrollbar mt-24 scrollbar-hide'
        style={{
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <div className='flex gap-6 pt-12 px-4 md:px-0' style={{ width: 'max-content' }}>
          {[
            { title: "Software Development", description: "HProjects make it easy to plan, develop, and push with your agile team, allowing for efficient management of code deployment, sprints, and incident resolution during software lifecycle stages." },
            { title: "Construction", description: "In construction, HProjects helps streamline resource allocation, track progress, and manage safety incidents, ensuring that complex, multi-phase projects are delivered on time." },
            { title: "IT Services", description: "HProjects enables IT teams to manage infrastructure upgrades, software rollouts, and quickly respond to incidents like server outages or security breaches, all within a structured agile framework." },
            { title: "Telecommunications", description: "Telecommunications firms can use HProjects to manage network expansions, customer service operations, and address incidents such as network downtime, ensuring seamless connectivity." },
            { title: "Healthcare", description: "HProjects helps healthcare organizations manage complex medical projects, coordinate patient care, and quickly resolve incidents related to patient safety or medical data breaches." },
            { title: "Finance", description: "Financial institutions can leverage HProjects to manage compliance projects, develop financial products, and respond swiftly to security incidents or regulatory changes." }
          ].map((card, index) => (
            <Card key={index} className='w-80 flex-shrink-0 bg-gray-800 text-white'>
              <CardContent className="flex aspect-square w-full p-6 select-none">
                <div className='flex flex-col gap-2'>
                  <h2 className='font-semibold text-lg'>{card.title}</h2>
                  <p className='text-gray-100 text-sm'>{card.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}