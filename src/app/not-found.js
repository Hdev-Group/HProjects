"use client";
import NavigationMenuMain from '../components/header/header';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const randomtext = () => {
    const texts = ['Oops, Looks like we lost track of this page. But your projects are fine.', 'We found you! Get back to your projects.', 'Looks like you are lost, but your projects are safe.', 'This page is not found, but your projects are safe.', 'Looks like we lost track of this page. But your projects are fine.', 'Your lost, Get back to your projects.']
    return texts[Math.floor(Math.random() * texts.length)]
  }
  const pathname = usePathname()
  return (
    <>
      <title>
        404 - Page Not Found
      </title>
      <NavigationMenuMain />
      <div className='h-full pt-40 px-2 md:px-20 relative bg-gradient-to-r from-cyan-500 to-blue-500 w-full flex-row md:flex-row'>
        <div className='flex flex-col md:flex-row w-full'>
        <div className='w-full z-[100] relative md:w-[45%] mt-[0rem] flex flex-col gap-10'>
          <h1 className='font-bold text-5xl w-full boxtexts leading-snug'>{randomtext()}</h1>
          <p className='text-xl'>Get back to your projects.</p>
          <a href='/dashboard' className='font-semibold text-white p-2 rounded-3xl w-full md:w-auto text-center bg-black border'>Dashboard</a>
          <p className='text-xs'><b>Nerd stuff:</b> 404 - Unable to find page: <br></br> <b>{pathname}</b></p>
        </div>
        <div className='flex relative pt-[45rem]  items-center  justify-center w-full md:w-[50%] z-[10]'>
          <div className='absolute left-[55rem] md:left-[60rem]'>
          <div className='arm hidden md:flex bg-gray-700 h-80 rounded-full w-20 absolute rotate-[50deg] bottom-[20rem] right-[59rem]'></div>
          <div className='arm1 bg-gray-700 h-80 rounded-full w-20 absolute rotate-[-50deg] bottom-[20rem] right-[10rem]'></div>
          <div className='clipboard bg-neutral-600 rounded-2xl p-5 h-[30rem] w-[40rem] absolute bottom-[15rem] right-[17rem]'>
            <div>
              <div className='bg-neutral-500 h-10 w-30 rounded-2xl'></div>
            </div>
            <div className='flex flex-col mt-10 gap-5 h-1/2 justify-between'>
              <div className='gap-4 flex flex-col'>
                <div className='bg-neutral-500 h-5 w-20 rounded-2xl'></div>
                <div className='bg-neutral-500 h-5 w-50 rounded-2xl'></div>
              </div>
              <div className='gap-4 flex flex-col'>
                <div className='bg-neutral-500 h-5 w-20 rounded-2xl'></div>
                <div className='bg-neutral-500 h-5 w-50 rounded-2xl'></div>
              </div>
              <div className='gap-4 flex flex-col'>
                <div className='bg-neutral-500 h-5 w-20 rounded-2xl'></div>
                <div className='bg-neutral-500 h-5 w-50 rounded-2xl'></div>
              </div>
              <div className='gap-4 flex flex-col'>
                <div className='bg-neutral-500 h-5 w-20 rounded-2xl'></div>
                <div className='bg-neutral-500 h-5 w-50 rounded-2xl'></div>
              </div>
            </div>
          </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
