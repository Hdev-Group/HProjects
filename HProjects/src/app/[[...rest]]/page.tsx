"use client";
import { useState } from 'react';
import { SignedOut, SignedIn, SignUp, UserButton } from '@clerk/nextjs';
import HeaderIndex from '../../components/header/header';
import '../../styles/globals.css';
import { dark } from '@clerk/themes';
import { add } from '../../../convex/projects';
import { useEffect } from 'react';
import Footer from '../../components/footer/footer';

export default function Home() {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true); // Set showSignUp state to true to show the modal
  };
  const handleCloseModal = () => {
    setShowSignUp(false); // Set showSignUp state to false to hide the modal
  };

  const handleModalClick = (e: any) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };
  return (
    <div className='flex items-center justify-center w-[100%] flex-col pt-20'>
      <HeaderIndex />
      <main className="flex gap-5 flex-col items-center justify-center w-[100%]">
        <div className='flex flex-col w-full justify-center items-center mt-20 p-4 md:p-12 gap-1 md:gap-6 border-b'>
          <h1 className='text-3xl md:text-7xl flex-1 font-extrabold font-sans text-center fontmain'>The Project Planning Tool <br></br> For Your Next Project.</h1>
          <p className='text-xl md:text-2xl mt-4 text-zinc-300 w-full md:w-[40%] text-center fontmain font-medium '>
            <span className='text-cyan-400 font-bold '>HProjects</span> is the project planning tool that helps you manage your projects with ease.
          </p>
          <SignedOut>
          <div className='flex flex-row mt-6 gap-2 md:gap-6'>
            <button onClick={handleSignUpClick} className='ease-in-out duration-300 hovmain flex items-center justify-center border p-2 w-[20rem] bg-neutral-900 rounded-2xl hover:border-neutral-100 hover:bg-neutral-800'>
            <h1 className='font-bold flex text-[20px]'>Get Started  <svg xmlns="http://www.w3.org/2000/svg" className='h-[30px] w-5 hovericon' viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg></h1>
            </button>
          </div>
        </SignedOut>
        <SignedIn>
        <div className='flex  flex-row mt-2 gap-2 md:gap-6'>
          <a href='/dashboard'>
          <button className='ease-in-out duration-300 hovmain mb-20 flex items-center justify-center border p-2 w-[20rem] bg-neutral-900 rounded-2xl hover:border-neutral-100 hover:bg-neutral-800'>
            <h1 className='font-bold text-[20px] flex'>Dashboard <svg xmlns="http://www.w3.org/2000/svg" className='h-[30px] w-5 hovericon' viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg></h1>
          </button>
          </a>
          </div>
        </SignedIn>

        {/* Modal for SignUp */}
        {showSignUp && (
          <div onClick={handleModalClick} className='fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50 flex items-center justify-center'>
                <div className="flex items-center justify-center h-[100%]">
                <SignUp
                appearance={{
                  baseTheme: dark
                }}
                
                />
              </div>
            );
          </div>
        )}
        </div>
        <div className='top-[40rem] grid-background z-[-20] absolute'></div>
        <div className='flex flex-col gap-8 p-4 md:p-12 mt-40 lg:w-[90rem] w-[100%] mb-40'>

          <div className='flex-col gap-4'>
            <h1 className='text-4xl md:text-4xl font-bold font-sans'>Github projects everywhere?</h1>
            <p className='text-sm md:text-base text-zinc-300'>We get <span className='text-cyan-400 font-bold'>you.</span></p>
          </div>
          <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-[100%] lg:w-full'>
            <div className='flex flex-col border border-red-500 bg-red-500/10 w-[100%] lg:w-full px-4 lg:px-6 py-6 lg:py-8 rounded'>
              <h2 className='text-xl md:text-2xl font-bold font-sans '>Without HProjects</h2>
              <p className='text-sm text-zinc-400'>you get:</p>
              <ul className='list-none pl-0 mt-2'>
                <li className='text-xs md:text-sm flex items-center gap-1'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='xnono' fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg> <p className='text-lg dark:text-stone-100 font-bold'>Overwhelmed by projects</p>
                </li>
                <li className='text-xs md:text-sm flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='xnono' fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg> <p className='text-lg dark:text-stone-100 font-bold'>Lose track of project progress</p>
                </li>
                <li className='text-xs md:text-sm flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='xnono' fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg> <p className='text-lg dark:text-stone-100 font-bold'>Waste time setting back up</p>
                </li>
                <li className='text-xs md:text-sm flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='xnono' fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg> <p className='text-lg dark:text-stone-100 font-bold'>Cant add team members</p>
                </li>
                <li className='text-xs md:text-sm flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='xnono' fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg> <p className='text-lg dark:text-stone-100 font-bold'>Unecessary complexity</p>
                </li>
                <li className='text-xs md:text-sm flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='xnono' fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg> <p className='text-lg dark:text-stone-100 font-bold'>Inefficient communication</p>
                </li>
              </ul>
            </div>
            <div className='flex flex-col border border-emerald-600 bg-emerald-600/10 w-[100%] lg:w-full px-4 lg:px-6 py-6 lg:py-8 rounded'>
            <h2 className='text-xl md:text-2xl font-bold font-sans '>With HProjects</h2>
            <p className='text-sm text-zinc-400'>you get:</p>
              <ul className='list-none pl-0 mt-2'>
                <li className='text-xs md:text-sm flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='yesyes' fill="currentColor"><path d="M10.9996 16.1719L19.1924 7.97914L20.6066 9.39336L10.9996 19.0003L3.99957 12.0003L5.41379 10.5861L10.9996 16.1719Z"></path></svg> <p className='text-lg dark:text-stone-100 font-bold'>Easy project management</p>
                </li>
                <li className='text-xs md:text-sm flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='yesyes' fill="currentColor"><path d="M10.9996 16.1719L19.1924 7.97914L20.6066 9.39336L10.9996 19.0003L3.99957 12.0003L5.41379 10.5861L10.9996 16.1719Z"></path></svg> <p className='text-lg dark:text-stone-100 font-bold'>Track progress effortlessly</p>
                </li>
                <li className='text-xs md:text-sm flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='yesyes' fill="currentColor"><path d="M10.9996 16.1719L19.1924 7.97914L20.6066 9.39336L10.9996 19.0003L3.99957 12.0003L5.41379 10.5861L10.9996 16.1719Z"></path></svg> <p className='text-lg dark:text-stone-100 font-bold'>Quick setup and onboarding</p>
                </li>
                <li className='text-xs md:text-sm flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='yesyes' fill="currentColor"><path d="M10.9996 16.1719L19.1924 7.97914L20.6066 9.39336L10.9996 19.0003L3.99957 12.0003L5.41379 10.5861L10.9996 16.1719Z"></path></svg> <p className='text-lg dark:text-stone-100 font-bold'>Easily add team members</p>
                </li>
                <li className='text-xs md:text-sm flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='yesyes' fill="currentColor"><path d="M10.9996 16.1719L19.1924 7.97914L20.6066 9.39336L10.9996 19.0003L3.99957 12.0003L5.41379 10.5861L10.9996 16.1719Z"></path></svg> <p className='text-lg dark:text-stone-100 font-bold'>Intuitive and simple interface</p>
                </li>
                <li className='text-xs md:text-sm flex items-center'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='yesyes' fill="currentColor"><path d="M10.9996 16.1719L19.1924 7.97914L20.6066 9.39336L10.9996 19.0003L3.99957 12.0003L5.41379 10.5861L10.9996 16.1719Z"></path></svg> <p className='text-lg dark:text-stone-100 font-bold'>Effective communication tools</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className='bg-white w-[100%] h-[60rem] relative flex justify-center' id='whitesection'>
          <div className='innerholdtransitioner'></div>
          <div className='flex flex-col md:max-w-[1533px] w-[100%] p-4 md:p-12 z-30 border-l-black/15 border-r-black/15 border border-dashed border-transparent'>
            <p className='text-blue-800 font-semibold md:text-sm mt-9'>Scaleable project building</p>
            <h1 className='text-black font-semibold md:text-3xl text-xl'>The easy project planning solution</h1>
            <div className='mt-20'>
            <p className='text-blue-800 font-semibold md:text-sm mt-9'>Simplicity at its best</p>
              <h2 className='text-black font-semibold text-lg md:text-2xl'>Track your progress with a glance</h2>
              <p className='text-black'>With HProjects</p>
              <div className='flex flex-wrap flex-row'>
                
              </div>
            </div>
          </div>
          <div className='outerholdtransitioner'></div>
        </div>
        <div className='flex flex-col gap-8 p-4 md:p-12 mt-20 lg:w-[70rem] w-[100%]'>
          </div>
      </main>
      <Footer />
    </div>
  );
}
