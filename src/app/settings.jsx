import React from 'react';
import Head from 'next/head';
import { useUser, useClerk } from '@clerk/clerk-react';
import { ClerkProvider } from "@clerk/nextjs";
import DashboardHeader from '../app/components/dashboardheader';

const Settings = () => {
    const { isLoaded, isSignedIn, user: userInfo } = useUser();

    if (!isLoaded || !isSignedIn) {
        return null;
    }

  return (
    <ClerkProvider>
    <div>
      <Head>
        <title>HProjects | Settings</title>
      </Head>
      <DashboardHeader />
      <main className='flex gap-20 flex-col items-center justify-center mt-20 py-14 px-0 md:w-[100%]'>
        <div className="flex flex-col w-[80%] gap-4">
            <h2 className='flex text-3xl font-bold mb-2 mt-4 '>Settings</h2>
            <div className='flex flex-col gap-5 border-neutral-800 rounded-lg border-[1px]'>
                <div className='flex dark:bg-neutral-800/30 bg-neutral-300/50 px-6 py-5 rounded-t-lg border-neutral-800 border-b-[1px]'>
                    <p className='font-medium text-xl'>Display Name</p>
                </div>
                <div className='px-6 flex flex-col gap-3'>
                    <p className='dark:text-neutral-500 text-neutral-800'>
                        To update your display name, fill out the form below and click the "Save" button.
                    </p>
                    <form className='flex flex-row mb-4 w-[100%]'>
                        <div className='flex flex-col gap-3 w-[100%]'>
                            <label htmlFor='displayname' className='dark:text-neutral-200 text-neutral-900 font-bold text-sm'>Display Name</label>
                            <div className='flex gap-3 items-center'>
                            <input type='text' value={userInfo.firstName} id='displayname' name='displayname' className='border-neutral-800 bg-transparent rounded-lg border-[1px] w-[100%] max-w-[400px] px-4 py-1' />
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg w-[70px]'>Save</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className='flex flex-col gap-5 border-neutral-800 rounded-lg border-[1px]'>
                <div className='flex dark:bg-neutral-800/30 bg-neutral-300/50 px-6 py-5 rounded-t-lg border-neutral-800 border-b-[1px]'>
                    <p className='font-medium text-xl'>Currency</p>
                </div>
                <div className='px-6 flex flex-col gap-3'>
                    <p className='dark:text-neutral-500 text-neutral-800'>
                        To update your currency. please choose from the list below and click the "Save" button.
                    </p>
                    <form className='flex flex-row mb-4 w-[100%]'>
                        <div className='flex flex-col gap-3 w-[100%]'>
                            <label htmlFor='displayname' className='dark:text-neutral-200 text-neutral-900 font-bold text-sm'>Currency</label>
                            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg w-[70px]'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='flex flex-col gap-5 border-neutral-800 rounded-lg border-[1px]'>
                <div className='flex dark:bg-neutral-800/30 bg-neutral-300/50 px-6 py-5 rounded-t-lg border-neutral-800 border-b-[1px]'>
                    <p className='font-medium text-xl'>Timezone</p>
                </div>
                <div className='px-6 flex flex-col gap-3'>
                    <p className='dark:text-neutral-500 text-neutral-800'>
                        To update your timezone, please choose from the list below and click the "Save" button.
                    </p>
                    <form className='flex flex-row mb-4 w-[100%]'>
                        <div className='flex flex-col gap-3 w-[100%]'>
                            <label htmlFor='displayname' className='dark:text-neutral-200 text-neutral-900 font-bold text-sm'>Timezone</label>                                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded-lg w-[70px]'>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </main>
    </div>
    </ClerkProvider>
  );
};

export default Settings;