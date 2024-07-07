"use client";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from '../../../convex/_generated/api';
import { useEffect, useState } from "react";

export default function CommentBoxer({ taskId }: { taskId: string }) {
  const { userId } = useAuth();
  const comments = useQuery(api.getcomments.get);
  const filteredComments = comments?.filter((comment: any) => comment.taskId === taskId);
  const [commenterData, setCommenterData] = useState(null);
  
  useEffect(() => {
    async function fetchCommenterData() {
      if (userId) {
        try {
          const response = await fetch(`/api/get-user?userId=${userId}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setCommenterData(data);
        } catch (error) {
          console.error('Error fetching commenter data:', error);
          setCommenterData(null);
        }
      }
    }
  
    fetchCommenterData();
  }, [userId]);

  return (
    <div className='flex flex-col gap-4 w-full'>
      <div className='flex flex-col gap-4 w-full'>
        {filteredComments?.map((comment: any) => (
          <div key={comment._id} className='border p-4 flex gap-4 w-full flex-col justify-center rounded-md hover:border-neutral-200 transition-all'>
            <p className=''>{comment.CommenterMessage}</p>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
              <img src={commenterData?.imageUrl} alt={commenterData?.firstName} className='w-8 h-8 rounded-full' />
              <p className='text-xs text-neutral-200 font-semibold'>{commenterData?.firstName} {commenterData?.lastName}</p>
              </div>
              <p className="text-xs text-neutral-500">{formatTime(comment._creationTime)}</p>
            </div>
          </div>
        ))}
        {filteredComments?.length === 0 && (
          <div className='border-2 border-neutral-700 bg-neutral-700/40 flex justify-center items-center rounded-md min-h-[10rem]'>
            <p className='font-semibold text-lg'>No comments yet, be the first to comment on this task</p>
          </div>
        )}
      </div>
    </div>
  );

  function formatTime(creationTime: string): JSX.Element {
    const datenow = Date.now();
    const creationDate = new Date(creationTime);
    const diff = datenow - creationDate.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);

    if (months > 0) {
      return `${months} months ago`;
    } else if (weeks > 0) {
      return <p className='font-semibold rounded-md p-1 gap-2'>{weeks} weeks ago</p>;
    } else if (days > 0) {
      return <p className='font-semibold rounded-md p-1 flex items-center justify-center gap-2'>{days} days ago <div className="low animate-ping h-1 w-1 rounded-full"></div></p>;
    } else if (hours > 0) {
      return <p className='font-semibold rounded-md p-1 gap-2 flex items-center justify-center'>{hours} hours ago <div className="high animate-ping h-1 w-1 rounded-full"></div></p>;
    } else if (minutes > 0) {
      return <p className='font-semibold rounded-md p-1 flex items-center justify-center gap-2'>{minutes} minutes ago <div className="critical animate-ping h-1 w-1 rounded-full"></div></p>;
    } else {
      return <p className='font-semibold rounded-md p-1 gap-2 flex items-center justify-center'>{seconds} seconds ago <div className="critical animate-ping h-1 w-1 rounded-full"></div></p>;
    }
  }
}