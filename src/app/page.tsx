"use client";
import { useState } from 'react';
import { SignedOut, SignedIn, SignUp, UserButton } from '@clerk/nextjs';
import HeaderIndex from '../components/header/header';
import '../styles/globals.css';
import { dark } from '@clerk/themes';

export default function Home() {
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUpClick = () => {
    setShowSignUp(true); // Set showSignUp state to true to show the modal
  };
  const handleCloseModal = () => {
    setShowSignUp(false); // Set showSignUp state to false to hide the modal
  };

  const handleModalClick = (e) => {
    if (e.target === e.currentTarget) {
      // Click on the outer section of modal (background)
      handleCloseModal();
    }
  };

  return (
    <>
      <HeaderIndex />
      <main className="flex gap-20 flex-col items-center justify-center mt-20 p-12 md:p-12 w-[100%]">

        <div className='top-[9rem] grid-background z-[-20] absolute'></div>
        <div className='flex flex-col justify-center items-center p-4 md:p-12 gap-1 md:gap-7 mt-6'>
          <h1 className='w-full text-3xl md:text-7xl flex-1 font-bold font-mono text-center'>Start your next big thing</h1>
          <p className='text-1xl md:text-2xl mt-4 text-zinc-300 w-11/12 md:w-[92%] text-center font-sans'>
            <span className='text-cyan-400 font-bold'>Track, Build, and maintain</span> every part of your projects, With HProjects!
          </p>
          <SignedOut>
          <div className='flex flex-row mt-6 gap-2 md:gap-6'>
            <button onClick={handleSignUpClick} className='ease-in-out duration-300 border dark:border-gunmetal cta hover:border-teal-300 bg-gunmetal/30 px-10 md:px-20 py-4 md:py-4 rounded-2xl hover:bg-teal-300/40 transform shadow-gunmetal text-xs md:text-sm flex items-center justify-center'>
            <h1 className='font-bold text-[20px]'>Get Started</h1>
            </button>
          </div>
        </SignedOut>
        <SignedIn>
        <div className='flex flex-row mt-6 gap-2 md:gap-6'>
          <a href='/dashboard'>
          <button className='ease-in-out duration-300 border dark:border-gunmetal cta hover:border-teal-300 bg-gunmetal/10 px-10 md:px-20 py-4 md:py-4 rounded-2xl hover:bg-teal-300/40 transform shadow-gunmetal text-xs md:text-sm flex items-center justify-center'>
            <h1 className='font-bold text-[20px]'>Dashboard</h1>
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
        <div className='flex flex-col relative items-center md:p-1 bg-neutral-100/10 rounded-xl z-5'>
          <img src='/logo.png' alt='Chat' className='w-10 md:w-[100%] h-auto rounded-xl' />
        </div>
        <div className='flex flex-col gap-8 p-4 md:p-12 mt-20 md:w-[90rem] md:w-max-[50rem]'>
          <div className='flex-col gap-4'>
            <h1 className='text-4xl md:text-4xl font-bold font-sans'>Github projects everywhere?</h1>
            <p className='text-sm md:text-base text-zinc-300'>We get <span className='text-cyan-400 font-bold'>you.</span></p>
          </div>
          <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-[91%] md:w-full'>
            <div className='flex flex-col border border-red-500 dark:bg-red-500/10 bg-red-500/40 w-[100%] md:w-full px-4 md:px-6 py-6 md:py-8 rounded'>
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
            <div className='flex flex-col border border-emerald-600 bg-emerald-600/10 w-[100%] md:w-full px-4 md:px-6 py-6 md:py-8 rounded'>
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
      </main>
    </>
  );
}
