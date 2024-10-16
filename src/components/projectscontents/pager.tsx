import React, { useState, useEffect } from 'react';
import { api } from '../../../convex/_generated/api';
import { useQuery } from 'convex/react';
import { useMutation } from 'convex/react';
import { useAuth } from "@clerk/nextjs";
import NewPagerModal from '../modals/newpagermodal';
import { useToast } from "../ui/use-toast"
import Link from 'next/link';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu"

interface Pagerr {
  _id: string;
  projectid: string;
  userId: string;
  _creationTime: string;
  time: string;
  status: 'active' | 'break' | 'inactive';
}

export default function PagerEl({ _id, isSidebarClosed }: any) {
  const incidentdatbase = useQuery(api.incident.get);
  const { userId } = useAuth();
  const pagerholder = useQuery(api.pagerget.get);
  const pagerhold = pagerholder?.find((pager: Pagerr) => pager.userId === userId && pager.projectid === _id);
  const [currentTime, setCurrentTime] = useState(new Date());
  const getincident = useQuery(api.pagerincidents.get);
  const filteredincident = getincident?.filter((inc: any) => inc.pagerid === userId && inc.acknowledged === false && inc.projectid === _id);
  const [percentage, setPercentage] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const removeincident = useMutation(api.pagerincidents.deletepage);

  const paramsmain = _id
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // if minus is detected we will remove the pager from the database
  const deletePager = useMutation(api.pageradd.deletePager);

  useEffect(() => {
    if (pagerhold && timeRemaining.includes('-')) {
      deletePager({ _id: pagerhold._id });
    }
  }, [pagerhold, timeRemaining]);

  const handleClose = () => {
    setIsModalOpen(false);
};
  const handleClick = () => {
    setIsModalOpen(true);

  return (
    <>
      {isModalOpen && (
        <NewPagerModal id={paramsmain} onClose={handleClose} />
      )}
    </>
  );
}

  function PagerOff() {
    return (
      <ContextMenu>
      <ContextMenuTrigger id="pageroff" className="w-max flex items-center justify-center">
        <div className={`${isSidebarClosed ? "pr-2" : "pr-5"} border dark:border-neutral-400 justify-center border-neutral-600 bg-neutral-900/20 dark:bg-neutral-400/20  items-center h-[3rem] w-full flex rounded-lg`}>
          <div className='pl-2  flex justify-center items-center h-full'>
            <div className='w-1.5 h-[2rem] flex items-center justify-center rounded-lg dark:bg-neutral-400/20 bg-neutral-700'>
              <div className='w-full flex items-center justify-center' style={{ height: '0%', backgroundColor: 'neutral' }}></div>
            </div>
          </div>
          {isSidebarClosed ? null : (
          <div className='pl-3 h-max flex justify-center flex-col text-left'>
            <h1 className='font-semibold text-md text-left text-white'>You're off pager</h1>
          </div> )}
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <Link href={`/projects/${encodeURI(_id)}/pager?startpager=true`}>        <ContextMenuItem className='text-green-300 cursor-pointer' onClick={handleClick}>Go on Pager</ContextMenuItem>        </Link>
      </ContextMenuContent>
    </ContextMenu>
    );
  }
  function PagerOnCall({ percentage, time, paramsmain }: { percentage: number, time: string, paramsmain: { _id: string } }) {
    const { userId } = useAuth();
    const mutatebreak = useMutation(api.pagerupdate.editpager);
  
    function startBreak() {
      if (userId) {
        mutatebreak({ id: pagerhold._id,  status: 'break'}).catch(err => console.error(err));
      } else {
        console.error('User ID is not available.');
      }
    }

  
    function endPager() {
    }
    const ToastOnBreak = () => {
      const { toast } = useToast()
    
      return (
        <ContextMenuItem
          className='text-yellow-300 cursor-pointer bg-transparent' 
          onClick={() => {
            startBreak();
            toast({
              description: "Your break has started",
            })
          }}
        >
          Start Break
        </ContextMenuItem>
      )
    }

  
    return (
      <ContextMenu>
        <ContextMenuTrigger id="pageroncall" className="w-max flex items-center justify-center">
          <div className={`${isSidebarClosed ? "pr-2" : "pr-5"} border dark:border-green-400 border-green-600 bg-green-700/20 dark:bg-green-400/20 items-center h-[4rem] w-full flex rounded-lg`}>
            <div className='pl-2 flex justify-center items-center h-full'>
              <div className='w-1.5 h-[3rem] flex items-end justify-center rounded-lg dark:bg-green-400/20 bg-green-700/20 overflow-hidden'>
                <div className='w-full' style={{ height: `${percentage}%`, backgroundColor: 'green' }}></div>
              </div>
            </div>
            {isSidebarClosed ? null : (
            <div className='pl-3 h-max flex justify-center flex-col text-left'>
              <h1 className='font-semibold text-md text-left text-white'>You're on pager</h1>
              <p className='text-neutral-300 text-xs'>For the next {time}</p>
            </div>
            )}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ToastOnBreak />
          <ContextMenuSeparator />
          <ContextMenuItem className='text-red-400 cursor-pointer' onClick={endPager}>End Pager</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    );
  }
  function PagerIncident({ percentage, time }: { percentage: number, time: string, paramsmain: { _id: string } }) {
    const { userId } = useAuth();
    const mutatebreak = useMutation(api.pagerupdate.editpager);
  
    function startBreak() {
      if (userId) {
        mutatebreak({ id: pagerhold._id,  status: 'break'}).catch(err => console.error(err));
      } else {
        console.error('User ID is not available.');
      }
    }
  
  
    function endPager() {
    }
    const ToastOnBreak = () => {
      const { toast } = useToast()
    
      return (
        <ContextMenuItem
          className='text-yellow-300 cursor-pointer bg-transparent' 
          onClick={() => {
            startBreak();
            toast({
              description: "Your break has started",
            })
          }}
        >
          Start Break
        </ContextMenuItem>
      )
    }
    const filtermain = filteredincident[0]
    function acknowledgedpager() {
      removeincident
      ({_id: filtermain?._id }).catch(err => console.error(err));
    }
    // differentiate between the time then show the appropriate message
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
            <p className='text-neutral-300 text-xs'>For the next {time}</p>
            </>
          )}
        </>
      );
    }


    return (
      <Link href={`/projects/${_id}/incident/${filtermain.incidentid}`} onClick={acknowledgedpager}>
        <ContextMenu>
          <ContextMenuTrigger id="pageroncall" className="w-max flex items-center justify-center animate-ping rounded-lg">
            <div className={`${isSidebarClosed ? "pr-2" : "pr-5"} border dark:border-red-400 border-red-600 bg-red-700/20 dark:bg-red-400/20 items-center h-[4rem] w-full flex rounded-lg`}>
            <div className='pl-2 flex justify-center items-center h-full'>
              <div className='w-1.5 h-[3rem] flex items-end justify-center rounded-lg dark:border-red-400 border-red-600 bg-red-700/20 dark:bg-red-400/20 overflow-hidden'>
              <div className='w-full flex items-center justify-center font-semibold text-xl' style={{ height: `${percentage}%`, backgroundColor: 'red' }}>!</div>
              </div>
            </div>
            {isSidebarClosed ? null : (
            <div className='pl-3 h-max flex justify-center flex-col text-left'>
              {textloop()}
            </div>
            )}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ToastOnBreak />
            <ContextMenuSeparator />
            <ContextMenuItem className='text-red-400 cursor-pointer' onClick={endPager}>End Pager</ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Link>
    );
  }
  useEffect(() => {
    if (pagerhold) {
      const pagerStartTime = new Date(pagerhold._creationTime);
      const pagerEndTime = new Date(pagerhold.time);
      const totalTime = Math.floor((pagerEndTime.getTime() - pagerStartTime.getTime()) / 60000); // in minutes

      const updateElapsedTime = () => {
        const elapsedTime = Math.floor((new Date().getTime() - pagerStartTime.getTime()) / 60000); // in minutes
        const percentage = Math.floor((elapsedTime / totalTime) * 100);

        const timeRemainingMinutes = totalTime - elapsedTime;
        const hours = Math.floor(timeRemainingMinutes / 60);
        const minutes = timeRemainingMinutes % 60;
        const timeRemaining = `${hours}h ${minutes < 10 ? '0' + minutes : minutes}m`;

        setPercentage(percentage);
        setTimeRemaining(timeRemaining);
      };

      updateElapsedTime(); // Initial call to set values
      const interval = setInterval(updateElapsedTime, 60000); // Update every minute

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [pagerhold]);
  if (pagerhold && paramsmain === pagerhold.projectid) {
    if (timeRemaining.includes('-')) {
      return <PagerOff />;
    } else if (filteredincident && filteredincident.length > 0) {
      return <PagerIncident percentage={percentage} time={timeRemaining} paramsmain={paramsmain} />;
    } else if (pagerhold.status === 'active') {
      return <PagerOnCall percentage={percentage} time={timeRemaining} paramsmain={paramsmain} />;
    } else if (pagerhold.status === 'break') {
      return <PagerOnBreak percentage={percentage} isSidebarClosed={isSidebarClosed} />;
  }
    else 
      return <PagerOff />;
  } else {
    return <PagerOff />;
  }
}



function PagerOnBreak({ percentage, isSidebarClosed }: { percentage: number, isSidebarClosed: boolean }) {
  const { userId } = useAuth();
  const mutatebreak = useMutation(api.pagerupdate.editpager);
  const pagerholder = useQuery(api.pagerget.get);
  const pagerhold = pagerholder?.find((pager: Pagerr) => pager.userId === userId);
  const ToastBeginPager = () => {
    const { toast } = useToast()
  
    return (
      <ContextMenuItem
      className='text-green-300 cursor-pointer' 
        onClick={() => {
          endBreak();
          toast({
            description: "Your pager has started",
          })
        }}
      >
        Go on Pager
      </ContextMenuItem>
    )
  }
  function endBreak() {

    if (userId) {
      mutatebreak({ id: pagerhold._id,  status: 'active'}).catch(err => console.error(err));
    } else {
      console.error('User ID is not available.');
    }
  }
  return (
    <ContextMenu>
    <ContextMenuTrigger id="pageronbreak" className="w-max flex items-center justify-center">
      <div className={`${isSidebarClosed ? "pr-2" : "pr-5"} border dark:border-yellow-400 border-yellow-600 bg-yellow-700/20 dark:bg-yellow-400/20 items-center h-[4rem] w-full flex rounded-lg`}>
        <div className='pl-2 flex justify-center items-center h-full'>
          <div className='w-1.5 h-[3rem] flex items-end justify-center rounded-lg dark:bg-yellow-400/20 overflow-hidden bg-yellow-700'>
            <div className='w-full' style={{ height: `${percentage}%`, backgroundColor: 'yellow' }}></div>
          </div>
        </div>
        {isSidebarClosed ? null : (
        <div className='pl-3 h-max flex justify-center flex-col text-left'>
          <h1 className='font-semibold text-md text-left text-white'>You're on break</h1>
        </div>
        )}
      </div>
      </ContextMenuTrigger>
        <ContextMenuContent>
          <ToastBeginPager />
          <ContextMenuSeparator />
          <ContextMenuItem className='text-red-400 cursor-pointer'>End Pager</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
  );
}

