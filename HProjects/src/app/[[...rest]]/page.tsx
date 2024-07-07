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
  <div className='flex items-center justify-center w-[100%] flex-col pt-20 overflow-hidden'>
    <HeaderIndex />
    <main className='md:max-w-[110rem] flex items-center justify-center overflow-x-hidden px-2'>
      <div className='flex justify-between w-[100%] flex-wrap lg:flex-nowrap flex-row gap-10 pt-[5rem] pb-20'>
        <div className='w-[70%] flex flex-col justify-start gap-5'>
        <div className="grid-background absolute w-[100%] h-10"></div>
          <img src='/logo.png' alt='logo' className='w-[50px] h-[50px]' />
          <div className='flex flex-col gap-4'>
            <div className='flex items-center gap-4'>
            <h1 className='bg-indigo-600/30 border border-indigo-500/40 ping-purple text-indigo-400 font-semibold text-sm rounded-xl max-w-[8rem] flex items-center justify-center px-2 py-1'>Latest Updates</h1> <h1 className='text-neutral-500 font-semibold text-sm flex items-center justify-center'>Just deployed HProjects <svg className='h-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></h1>
            </div>
            <h1 className='font-bold text-5xl font-sans'>Plan Build and Push with confidence</h1>
            <p className='font-medium text-sm text-neutral-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci provident blanditiis dolor repellendus error non quae velit eum et ex repellat quisquam, id inventore quibusdam hic numquam unde. Eligendi, assumenda?</p>
            <SignedOut>
          <div className='flex flex-row mt-6 gap-2 md:gap-6'>
            <button onClick={handleSignUpClick}className='ease-in-out duration-300 hovmain mb-20 flex items-center justify-center border border-neutral-600 p-1 px-5  bg-neutral-900/30 rounded-md hover:border-neutral-400 hover:bg-neutral-800'>
            <h1 className='font-semibold text-[20px] flex'>Get Started <svg xmlns="http://www.w3.org/2000/svg" className='h-[30px] w-5 hovericon' viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg></h1>
          </button>
          </div>
        </SignedOut>
        <SignedIn>
        <div className='flex  flex-row mt-2 gap-2 md:gap-6'>
          <a href='/dashboard'>
          <button className='ease-in-out duration-300 hovmain mb-20 flex items-center justify-center border border-neutral-600 p-1 px-5  bg-neutral-900/30 rounded-md hover:border-neutral-400 hover:bg-neutral-800'>
            <h1 className='font-semibold text-[20px] flex'>Dashboard <svg xmlns="http://www.w3.org/2000/svg" className='h-[30px] w-5 hovericon' viewBox="0 0 24 24" fill="currentColor"><path d="M16 12L10 18V6L16 12Z"></path></svg></h1>
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
        </div>
        <div>
          <img src='/indexmainphoto.png' alt='mainphoto' className='w-[100%] h-[100%] rounded-l-[2rem] border' />
        </div>
      </div>
    </main>
    <Footer />
  </div>
  );
}
