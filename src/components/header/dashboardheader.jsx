import { useEffect } from 'react';
import Image from 'next/image';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react';
import Link from 'next/link';
import Router from 'next/router';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';


import '../../styles/globals.css';

const DashboardHeader = ({ activeSection, onSectionChange }) => {

  const { user } = useClerk();
  const { isLoaded, isSignedIn, user: userInfo } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }
  const isElementPresent = (id) => {
    return document.getElementById(id) !== null;
  };


  return (
    <>
      <ProgressBar
        height="1px"
        color="#89bff8"
        options={{ showSpinner: true }}
        shallowRouting
      />
    <header className={`fixed flex-col top-[0px] max-[460px]:block  border-b pb-12 bg-bglightbars dark:bg-bgdarkbars sm:block md:flex left-0 right-0 z-50 flex items-center justify-center p-8 transition-colors  duration-300 ${user ? '' : ''}`}>
      <div className="flex flex-row items-center gap-10 justify-between md:w-[100%]">
        <div className="flex items-center justify-center g-5">
          <a href='/'>
            <div className="flex items-center cursor-pointer">
              <Image
                src="/logo.png"
                alt="HProjects"
                width={32}
                height={32}
              />
              <h1 className="text-2xl font-bold">Projects</h1>
            </div>
          </a>
          <div className="flex items-center flex-row justify-center">
            <p className='text-gray-500 font-bold text-[20px] ml-3 mr-3'>/</p>
            <span className='border border-slate-950 bg-slate-500/20 dark:border-slate-600 justify-center dark:bg-slate-600/20 py-1 mt-2 flex px-5 items-center gap-3 text-[13px] font-medium rounded-lg'>
                  <UserButton
                      appearance={{
                        variables: {
                          height: '400px',
                          width: '400px',
                        }
                      }}
                  />
              <p className='mb-[1px] max-w-[100px] truncate'>{userInfo.firstName}</p>
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 w-[100%] mt-7 mb-[-26px]">
        <div className="flex items-center justify-center gap-5">
        <Link href="/dashboard" className={`cursor-pointer text-[13px] font-medium ${activeSection === 'projects' ? 'text-white  underline underline-offset-8 decoration-2 font-bold' : 'text-gray-500'}`}>
            <strong>{activeSection === 'projectspage' ? 'Projects' : 'Projects'}</strong>
          </Link>
          <Link href="/teams" className={`cursor-pointer text-[13px] font-medium ${activeSection === 'teams' ? 'text-white underline underline-offset-8 decoration-2 font-bold' : 'text-gray-500'}`}>
            <strong>{activeSection === 'teams' ? 'Teams' : 'Teams'}</strong>
          </Link>
          <Link href="/settings" className={`cursor-pointer text-[13px] font-medium ${activeSection === 'settings' ? 'text-white underline underline-offset-8 decoration-2 font-bold' : 'text-gray-500'}`}>
            <strong>{activeSection === 'settings' ? 'Settings' : 'Settings'}</strong>
          </Link>

        </div>
      </div>
    </header>
    </>
  );
};

export default DashboardHeader;