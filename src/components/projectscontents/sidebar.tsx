import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { QuickMenu } from './quickmenu';
import '../../styles/globals.css';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

interface SideBarProps {
  activeSection: string;
  _id: string;
  projectname: any;
}

function SideBar({ activeSection, _id, projectname }: SideBarProps) {
  const [isSidebarClosed, setIsSidebarClosed] = useState(true);

  // check screen width if it is less than 524px then close the sidebar
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 524) {
        setIsSidebarClosed(true);
      }
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [prevIsSidebarClosed, setPrevIsSidebarClosed] = useState(true);
  function sidebarcloser() {
    const newSidebarClosedState = !isSidebarClosed;
    // Store the opposite value of isSidebarClosed in local storage
    localStorage.setItem('sidebarclosed', JSON.stringify(newSidebarClosedState));
    // Set isSidebarClosed to the opposite value
    setIsSidebarClosed(newSidebarClosedState);
    // Set the previous state
    setPrevIsSidebarClosed(isSidebarClosed);

    // Play the appropriate animation based on the new state
    if (newSidebarClosedState) {
      document.querySelector('article')?.classList.add('closesidebaranim');
      document.querySelector('article')?.classList.remove('openedsidebaranim');
    } else {
      document.querySelector('article')?.classList.add('openedsidebaranim');
      document.querySelector('article')?.classList.remove('closesidebaranim');
    }
  }

  // check if the sidebar is closed in local storage
  // if sidebarclosed is true then set isSidebarClosed to true
  useEffect(() => {
    const isSidebarClosedInStorage = JSON.parse(localStorage.getItem('sidebarclosed') || 'false');
    setIsSidebarClosed(isSidebarClosedInStorage);
    setPrevIsSidebarClosed(isSidebarClosedInStorage);
  }, []);

  useEffect(() => {
    if (prevIsSidebarClosed !== isSidebarClosed) {
      if (isSidebarClosed) {
        document.querySelector('article')?.classList.add('closesidebaranim');
        document.querySelector('article')?.classList.remove('openedsidebaranim');
      } else {
        document.querySelector('article')?.classList.add('openedsidebaranim');
        document.querySelector('article')?.classList.remove('closesidebaranim');
      }
    }
  }, [isSidebarClosed, prevIsSidebarClosed]);
  
  const getItemClass = (section: string) =>
    `${!isSidebarClosed ? "" : "items-start justify-start"} flex hover:bg-neutral-400/30 hover:text-white text-zinc-400 p-1 rounded-md transition-all font-semibold w-full text-md flex-row gap-2 ${activeSection === section ? "bg-neutral-300/20 !text-white" : ""}`;

  return (
    <article data-closed={isSidebarClosed}
    className={`${!isSidebarClosed ? "w-full justify-center openedsidebar" : "closedsidebar"} z-100 min-w-[45px] flex max-w-[248px] sticky overflow-x-hidden h-full flex-col justify-between bg-bglightbars dark:bg-bgdarkbars !rounded-none overflow-auto p-2 border-transparent border-r-neutral-600/40`}>
      <ProgressBar
        height="1px"
        color="#89bff8"
        options={{ showSpinner: true }}
        shallowRouting
      />
      <div className='w-full mt-2 flex items-center justify-center flex-col'>
        <div className='w-full flex flex-row px-2 justify-between items-center'>
          {!isSidebarClosed &&
            <a href='/dashboard' className='hover:bg-neutral-500/50 transition-all p-1 rounded-md px-2'><h1 className='w-full font-semibold overflow-clip flex-nowrap'>{projectname}</h1></a>
          }
            <button onClick={sidebarcloser} className="w-6 hidden sm:flex bg-neutral-500/20 p-0.5 dark:bg-neutral-500/20 dark:hover:bg-neutral-200/20 transition-all hover:bg-neutral-700/20 rounded-md items-center justify-center">
              {!isSidebarClosed ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.071 4.92902L11.4852 6.34323L6.82834 11.0001L16.0002 11.0002L16.0002 13.0002L6.82839 13.0001L11.4852 17.6569L10.071 19.0712L2.99994 12.0001L10.071 4.92902ZM18.0001 19V5.00003H20.0001V19H18.0001Z"></path>
              </svg>) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.9999 4.99982L21.0001 11.9999L13.9999 18.9998V13H7.99983L7.99981 11H13.9999V4.99982ZM3.99988 18.9998L3.99988 4.99982H5.99988V18.9998H3.99988Z"></path></svg>
              )
            }
            </button>
        </div>
        <div className='mt-4 flex justify-start w-full'>
          <div className='flex flex-col justify-start max-w-[240px] w-full items-start font-semibold  text-md gap-2'>

            <Link href={`/projects/${encodeURIComponent(_id)}`} className={getItemClass("Dashboard")}>
              <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM7 15V17H17V15H7Z"></path></svg>              
                  {!isSidebarClosed && <p>Dashboard</p>}
            </Link>
            <Link href={`/projects/${encodeURIComponent(_id)}/tasks`}  className={getItemClass("Tasks")}>
            <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.25098 3H18.751C19.993 3 21.001 4.00737 21.001 5.25V18.75C21.001 19.992 19.9935 21 18.751 21H5.25098C4.00898 21 3.00098 19.9925 3.00098 18.75V5.25C3.00098 4.008 4.00835 3 5.25098 3ZM13.171 6.42054V12.1795C13.171 12.7762 13.6545 13.26 14.2507 13.26H17.5812C18.1776 13.26 18.661 12.7765 18.661 12.1795V6.42054C18.661 5.82384 18.1774 5.34 17.5812 5.34H14.2507C13.6543 5.34 13.171 5.82348 13.171 6.42054ZM5.34098 6.42045V16.6796C5.34098 17.2762 5.82455 17.76 6.42071 17.76H9.75125C10.3476 17.76 10.831 17.277 10.831 16.6796V6.42045C10.831 5.82375 10.3474 5.34 9.75125 5.34H6.42071C5.82428 5.34 5.34098 5.82303 5.34098 6.42045Z"></path></svg>              {!isSidebarClosed && <p>Tasks</p>}
            </Link>
            <Link href={`/projects/${encodeURIComponent(_id)}/incident`} className={getItemClass("incident")}>
              <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.00001 20V14C4.00001 9.58172 7.58173 6 12 6C16.4183 6 20 9.58172 20 14V20H21V22H3.00001V20H4.00001ZM6.00001 14H8.00001C8.00001 11.7909 9.79087 10 12 10V8C8.6863 8 6.00001 10.6863 6.00001 14ZM11 2H13V5H11V2ZM19.7782 4.80761L21.1924 6.22183L19.0711 8.34315L17.6569 6.92893L19.7782 4.80761ZM2.80762 6.22183L4.22183 4.80761L6.34315 6.92893L4.92894 8.34315L2.80762 6.22183Z"></path></svg>
              {!isSidebarClosed && <p>Incidents</p>}
            </Link>
            <Link href={`/projects/${encodeURIComponent(_id)}/pager`}  className={getItemClass("pager")}>
              <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.38231 5.9681C7.92199 4.73647 9.87499 4 12 4C14.125 4 16.078 4.73647 17.6177 5.9681L19.0711 4.51472L20.4853 5.92893L19.0319 7.38231C20.2635 8.92199 21 10.875 21 13C21 17.9706 16.9706 22 12 22C7.02944 22 3 17.9706 3 13C3 10.875 3.73647 8.92199 4.9681 7.38231L3.51472 5.92893L4.92893 4.51472L6.38231 5.9681ZM13 12V7.4952L8 14H11V18.5L16 12H13ZM8 1H16V3H8V1Z"></path></svg>
              {!isSidebarClosed && <p>Pager</p>}
            </Link>
            <Link href={`/projects/${encodeURIComponent(_id)}/changelog`} className={getItemClass("changelog")}>
              <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4V8H18V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H6ZM9 17H7V19H9V17ZM9 14H7V16H9V14ZM9 11H7V13H9V11ZM16 2V6H8V2H16Z"></path></svg>
              {!isSidebarClosed && <p>Changelog</p>}
            </Link>
            <Link href={`/projects/${encodeURIComponent(_id)}/chat`} className={getItemClass("Chat")}>
              <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3Z"></path></svg>
              {!isSidebarClosed && <p>Messages</p>}
            </Link>
            <Link href={`/projects/${encodeURIComponent(_id)}/project-settings`} className={getItemClass("Project settings")}>
              <svg className='w-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"></path></svg>
              {!isSidebarClosed && <p>Settings</p>}
            </Link>
          </div>
        </div>
      </div>
      <QuickMenu id={_id} isSidebarClosed={isSidebarClosed} />
    </article>
  );
}

export default SideBar;
