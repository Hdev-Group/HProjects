import React, { useState, useEffect } from 'react';
import { api } from '../../../convex/_generated/api';
import { useQuery } from 'convex/react';
import { useMutation } from 'convex/react';
import { useAuth } from "@clerk/nextjs";
import NewPagerModal from '../modals/newpagermodal';
import { useToast } from "../ui/use-toast"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu"
export default function PagerEl({ _id }: any) {
  const { userId } = useAuth();
  const pagerholder = useQuery(api.pagerget.get);
  const pagerhold = pagerholder?.find(pager => pager.userId === userId);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [percentage, setPercentage] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState('');
  const paramsmain = _id
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // if minus is detected we will remove the pager from the database
  const deletePager = useMutation(api.pagerdelete.deletePager);

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
    console.log("clicked");

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
        <div className='border dark:border-neutral-400 border-neutral-600 bg-yellow-700/20 dark:bg-neutral-400/20 pr-5 items-center h-[3rem] w-full flex rounded-lg'>
          <div className='pl-2 flex justify-center items-center h-full'>
            <div className='w-1.5 h-[2rem] flex items-end justify-center rounded-lg dark:bg-neutral-400/20 bg-neutral-700'>
              <div className='w-full' style={{ height: '0%', backgroundColor: 'neutral' }}></div>
            </div>
          </div>
          <div className='pl-3 h-max flex justify-center flex-col text-left'>
            <h1 className='font-semibold text-md text-left dark:text-white text-black'>You're off pager</h1>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className='text-green-300 cursor-pointer' onClick={handleClick}>Go on Pager</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
    );
  }
  function PagerOnCall({ percentage, time }: { percentage: number, time: string, paramsmain: { _id: string } }) {
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
          <div className='border dark:border-green-400 border-green-600 bg-green-700/20 dark:bg-green-400/20 pr-5 items-center h-[4rem] w-full flex rounded-lg'>
            <div className='pl-2 flex justify-center items-center h-full'>
              <div className='w-1.5 h-[3rem] flex items-end justify-center rounded-lg dark:bg-green-400/20 bg-green-700/20 overflow-hidden'>
                <div className='w-full' style={{ height: `${percentage}%`, backgroundColor: 'green' }}></div>
              </div>
            </div>
            <div className='pl-3 h-max flex justify-center flex-col text-left'>
              <h1 className='font-semibold text-md text-left dark:text-white text-black'>You're on pager</h1>
              <p className='dark:text-neutral-300 text-neutral-700 text-xs'>For the next {time}</p>
            </div>
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

  if (pagerhold) {
    if (timeRemaining.includes('-')) {
      return <PagerOff />;
    } else if (pagerhold.status === 'active') {
      return <PagerOnCall percentage={percentage} time={timeRemaining} paramsmain={paramsmain} />;
    } else if (pagerhold.status === 'break') {
      return <PagerOnBreak percentage={percentage} />;
    } else {
      return <PagerOff />;
    }
  } else {
    return <PagerOff />;
  }
}



function PagerOnBreak({ percentage }: { percentage: number }) {
  const { userId } = useAuth();
  const mutatebreak = useMutation(api.pagerupdate.editpager);
  const pagerholder = useQuery(api.pagerget.get);
  const pagerhold = pagerholder?.find(pager => pager.userId === userId);
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
      <div className='border dark:border-yellow-400 border-yellow-600 bg-yellow-700/20 dark:bg-yellow-400/20 pr-5 items-center h-[4rem] w-full flex rounded-lg'>
        <div className='pl-2 flex justify-center items-center h-full'>
          <div className='w-1.5 h-[3rem] flex items-end justify-center rounded-lg dark:bg-yellow-400/20 overflow-hidden bg-yellow-700'>
            <div className='w-full' style={{ height: `${percentage}%`, backgroundColor: 'yellow' }}></div>
          </div>
        </div>
        <div className='pl-3 h-max flex justify-center flex-col text-left'>
          <h1 className='font-semibold text-md text-left dark:text-white text-black'>You're on break</h1>
        </div>
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

