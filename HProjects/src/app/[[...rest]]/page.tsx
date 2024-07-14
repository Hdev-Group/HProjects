"use client";
import { useState, useEffect, useRef } from 'react';
import { SignedOut, SignedIn, SignUp } from '@clerk/nextjs';
import HeaderIndex from '../../components/header/header';
import Footer from '../../components/footer/footer';
import gsap from 'gsap';
import { Critical } from '../../components/dropdowns/priorities/critical';
import { InProgress } from '../../components/dropdowns/status/status';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../styles/globals.css';
import './index.css';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef();

    useEffect(() => {
      const ctx = gsap.context(() => {
      const element = document.getElementById('blurunblur');
      gsap.set(element, { filter: 'blur(10px)' });

      gsap.fromTo(element, 
        { filter: 'blur(10px)', opacity: 0 },
        { 
        filter: 'blur(0px)',
        opacity: 1,
        duration: 3,
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
        duration: 4,
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
        duration: 3.5,
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
        { width: '100%', opacity: 0, zIndex: '1000000000000', translateY: '100%' },
        {
        opacity: 1,
        width: '100%',
        translateY: '0%',
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
  }, []); // This will run only once after the initial render

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  const handleCloseModal = () => {
    setShowSignUp(false);
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className='flex items-center justify-center w-[100%] flex-col pt-20 overflow-hidden' ref={container}>
      <HeaderIndex />
      <main className='md:max-w-[100%] mt-10 flex items-center flex-col justify-center overflow-x-hidden boxtexts'>
        <div className='flex md:px-[4.5rem] px-0 justify-between w-[100%] flex-wrap lg:flex-nowrap flex-row gap-10 pt-[5rem] pb-40'>
          <div className='md:w-[70%] w-full flex flex-col justify-start gap-5'>
            <div className="grid-background absolute w-[100%] h-10"></div>
            <img src='/logo.png' alt='logo' className='w-[50px] h-[50px] fadein' />
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-4'>
                <h1 className='bg-indigo-600/30 border pushdown border-indigo-500/40 ping-purple text-indigo-400 font-semibold text-sm rounded-xl max-w-[8rem] flex items-center justify-center px-2 py-1'>
                  Latest Updates
                </h1>
                <h1 className='text-neutral-500 pushup font-semibold text-sm flex items-center justify-center'>
                  Just deployed HProjects 
                  <svg className='h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path>
                  </svg>
                </h1>
              </div>
              <h1 className='font-bold text-5xl font-sans pushuptext1'>Plan, Build and Push with confidence</h1>
              <p className='font-medium text-sm text-neutral-400 pushuptext2'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci provident blanditiis dolor repellendus error non quae velit eum et ex repellat quisquam, id inventore quibusdam hic numquam unde. Eligendi, assumenda?
              </p>
              <SignedOut>
                <div className='flex flex-row mt-6 gap-2 md:gap-6 pushupbutton'>
                  <button onClick={handleSignUpClick} className='ease-in-out duration-300 hovmain mb-20 flex items-center justify-center border border-neutral-600 p-1 px-5 bg-neutral-900/30 rounded-md hover:border-neutral-400 hover:bg-neutral-800'>
                    <h1 className='font-semibold text-[20px] flex'>Get Started 
                      <svg xmlns="http://www.w3.org/2000/svg" className='h-[30px] w-5 hovericon' viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 12L10 18V6L16 12Z"></path>
                      </svg>
                    </h1>
                  </button>
                </div>
              </SignedOut>
              <SignedIn>
                <div className='flex flex-row mt-2 gap-2 md:gap-6 pushupbutton'>
                  <a href='/dashboard'>
                    <button className='ease-in-out duration-300 hovmain mb-20 flex items-center justify-center border border-neutral-600 p-1 px-5 bg-neutral-900/30 rounded-md hover:border-neutral-400 hover:bg-neutral-800'>
                      <h1 className='font-semibold text-[20px] flex'>Dashboard 
                        <svg xmlns="http://www.w3.org/2000/svg" className='h-[30px] w-5 hovericon' viewBox="0 0 24 24" fill="currentColor">
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
                    <SignUp appearance={{ baseTheme: dark }} />
                  </div>
                </div>
              )}
            </div>
          </div>
          <div>
            <img src='/indexmainphoto.png' alt='mainphoto' className='w-[100%] pushright h-[100%] rounded-l-[2rem] border' />
          </div>
        </div>
        <div className='flex w-full flex-col boxtexts mt-10 mb-40'>
          <div className='flex gap-10 flex-col flex-wrap items-center w-full justify-between'>
            <div className='flex flex-col w-full lg:w-1/2'>
              <div className='h-40 rounded-[20px] w-full shadow-md mb-5 text-white py-3 px-5 loadingimg'>
                <div className='flex justify-between w-50 flex-col h-full'>
                  <h1 className='font-extrabold text-[20px]'>Got an idea?</h1>
                  <p className='text-[#555555] font-semibold'>P Text</p>
                </div>
              </div>
              <div className='h-40 rounded-[20px] w-full bg-white shadow-md mb-5 loadingimg text-white py-3 px-5'>
                <div className='flex justify-between w-50 flex-col h-full'>
                  <h1 className='font-extrabold text-[20px]'>Got an idea?</h1>
                  <p className='text-[#555555] font-semibold'>P Text</p>
                </div>
              </div>
              <div className='h-40 rounded-[20px] w-full bg-white shadow-md mb-5 loadingimg text-white py-3 px-5'>
                <div className='flex justify-between w-50 flex-col h-full'>
                  <h1 className='font-extrabold text-[20px]'>Got an idea?</h1>
                  <p className='text-[#555555] font-semibold'>P Text</p>
                </div>
              </div>
            </div>
            <div className='flex lg:flex-row justify-between gap-10 max-w-[90rem] flex-col'>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl'>Get Started</h1>
                <div className='bg-white w-full h-40 rounded-[20px] loadingimg px-2 py-4'>
                  <p className='text-white font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci provident blanditiis dolor repellendus error non quae velit eum et ex repellat quisquam, id inventore quibusdam hic numquam unde. Eligendi, assumenda?</p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl'>Get Started</h1>
                <div className='bg-white w-full h-40 rounded-[20px] loadingimg px-2 py-4'>
                  <p className='text-white font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci provident blanditiis dolor repellendus error non quae velit eum et ex repellat quisquam, id inventore quibusdam hic numquam unde. Eligendi, assumenda?</p>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <h1 className='font-bold text-3xl'>Get Started</h1>
                <div className='bg-white w-full h-40 rounded-[20px] loadingimg px-2 py-4'>
                  <p className='text-white font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci provident blanditiis dolor repellendus error non quae velit eum et ex repellat quisquam, id inventore quibusdam hic numquam unde. Eligendi, assumenda?</p>
                </div>
              </div>
            </div>                                                                                                                                                                                                                                                             
          </div> 
        </div>
        <div className='w-[100%] h-auto bg-white mb-10'>
          <div className='flex gap-10 text-black flex-col'>
            <div className='flex items-center justify-center h-10 w-full'>
              <div className='md:w-[90%] w-full flex flex-row h-full relative'>
                <div className='border-t-[0px] border-t-transparent border-r-[75px] border-r-[#09090B] border-b-[40px] border-b-transparent'></div>
                <div className='w-full bg-[#09090B] h-full'></div>
                <div className='border-t-[0px] border-t-transparent border-l-[75px] border-l-[#09090B] border-b-[40px] border-b-transparent'></div>
              </div>
            </div>
            <div className='w-full h-[120rem] items-center flex  flex-col boxtexts'>
              <div className='md:w-[82%] w-full flex-col flex gap-20 mb-40'>
                <div className='flex items-center flex-col'>
                  <h1 className='font-extrabold text-[35px] text-center'>All you need for project management</h1>
                  <h3 className='font-semibold text-[18px] w-[65%] text-center'>Respond to tasks, new developments and incidents in your projects</h3>
                </div>

              </div>
              <div className='md:w-[82%] w-full items-center flex-col flex gap-6 mb-40'>
                <div className='flex flex-col gap-10 h-auto w-1/2'>
                  <div className='flex flex-col relative'>
                    <h1 className='font-bold text-[30px] text-left'>Pager</h1>
                    <div className='bg-white w-full h-6 bottom-0 absolute' id='swiperwhiter'></div>
                    <p className='font-semibold text-md' id='blurunblur'>Get notified on incidents and tasks in real time.</p>
                  </div>
                  <div id="pageroncall" className="w-max flex items-center justify-center">
                    <div className='border border-green-600 bg-green-700/20 pr-5 items-center h-[4rem] w-full flex rounded-lg'>
                      <div className='pl-2 flex justify-center items-center h-full'>
                        <div className='w-1.5 h-[3rem] flex items-end justify-center rounded-lg bg-green-700/20 overflow-hidden'>
                          <div className='w-full' style={{ height: `${Math.floor(Math.random() * 100)}%`, backgroundColor: 'green' }}></div>
                        </div>
                      </div>
                      <div className='pl-3 h-max flex justify-center flex-col text-left'>
                        <h1 className='font-semibold text-md text-left text-black'>You're on pager</h1>
                        <p className='text-neutral-700 text-xs'>For the next {pagerDuration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='md:w-[82%] w-full items-center flex-col flex gap-6'>
                <div className='flex flex-col gap-10 h-auto w-1/2'>
                  <div className='flex flex-col relative text-right'>
                    <h1 className='font-bold text-[30px] text-right'>Comments</h1>
                    <div className='bg-white w-full h-6 bottom-0 absolute' id='aacswhite'></div>
                    <p className='font-semibold text-md' id='blurunblurb'>Get comments on your tasks by team members in real time.</p>
                  </div>
                  <div className='flex flex-col max-h-[30rem] gap-5 overflow-hidden'>
                  <div className='flex flex-col gap-4 w-full text-black' id='firstcomment'>
                    <div className='flex flex-col gap-4 w-full'>
                      <div className='border p-4 flex gap-4 w-full flex-col justify-center rounded-md hover:border-neutral-200 transition-all'>
                        <p>Thanks for the task! I will get on it now.</p>
                        <div className="flex gap-4 items-center">
                          <div className="flex items-center gap-2">
                            <img src="/loadingimg.jpg" alt="Test Comment" className='w-8 h-8 rounded-full' />
                            <p className='text-xs text-neutral-900 font-semibold'>Harry Campbell</p>
                          </div>
                          <p className="text-xs text-neutral-500">9 Hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-4 w-full text-black' id='secondcomment'>
                    <div className='flex flex-col gap-4 w-full'>
                      <div className='border p-4 flex gap-4 w-full flex-col justify-center rounded-md hover:border-neutral-200 transition-all'>
                        <p>90% finished the pager.</p>
                        <div className="flex gap-4 items-center">
                          <div className="flex items-center gap-2">
                            <img src="/loadingimg.jpg" alt="Test Comment" className='w-8 h-8 rounded-full' />
                            <p className='text-xs text-neutral-900 font-semibold'>Harry Campbell</p>
                          </div>
                          <p className="text-xs text-neutral-500">1 Hour ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-4 w-full text-black' id='thirdcomment'>
                    <div className='flex flex-col gap-4 w-full'>
                      <div className='border p-4 flex gap-4 w-full flex-col justify-center rounded-md hover:border-neutral-200 transition-all'>
                        <p>I have completed the task, please review!</p>
                        <div className="flex gap-4 items-center">
                          <div className="flex items-center gap-2">
                            <img src="/loadingimg.jpg" alt="Test Comment" className='w-8 h-8 rounded-full' />
                            <p className='text-xs text-neutral-900 font-semibold'>Harry Campbell</p>
                          </div>
                          <p className="text-xs text-neutral-500">2 Seconds ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                  <div className='flex flex-col relative text-left'>
                    <h1 className='font-bold text-[30px]'>Tasks</h1>
                    <div className='bg-white w-full h-6 bottom-0 absolute' id='cacswhite'></div>
                    <p className='font-semibold text-md' id='blurunblurc'>Read your tasks instantly from the project dashboard.</p>
                  </div>
                  <div className='flex flex-col max-h-[30rem] gap-5 overflow-hidden'>
                  <div id='databasetasks'
            className='border-neutral-800 bg-neutral-300/60 cursor-pointer hover:border-neutral-300 transition-all py-2 border gap-3 flex flex-col rounded-md w-full'>
            <div className='flex gap-3 pl-4'>
                <h1 className='font-bold'>
                    Database is down
                </h1>
            </div>
            <div className='flex justify-between'>
                <div className='flex gap-3 pl-3'>
                    <Critical />
                    <InProgress />
                </div>
                <div className='flex gap-3 pr-3 items-center'>
                        <>
                            <img src='/loadingimg.jpg' className='w-6 h-6 rounded-full' alt="Assignee" />
                        </>
                </div>
            </div>
        </div>
                  </div>
                  </div>

                </div>
              </div>
            </div>
            <div className='flex items-center justify-center h-10 w-full'>
              <div className='md:w-[90%] w-full flex flex-row h-full relative'>
                <div className='border-t-[40px] border-t-transparent border-r-[75px] border-r-[#09090B] border-b-[0px] border-b-transparent'></div>
                <div className='w-full bg-[#09090B] h-full'></div>
                <div className='border-t-[40px] border-t-transparent border-l-[75px] border-l-[#09090B] border-b-[0px] border-b-transparent'></div>
              </div>
            </div>
          </div>
      </main>
      <Footer />
    </div>
  );
}
