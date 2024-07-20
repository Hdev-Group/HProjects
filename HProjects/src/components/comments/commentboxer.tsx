import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from '../../../convex/_generated/api';
import { useEffect, useState, useCallback } from "react";
import DropdownCommentMenu from "../dropdowns/comment";

export default function CommentBoxer({ taskId }: { taskId: string }) {
  const { userId } = useAuth();
  const comments = useQuery(api.getcomments.get);
  const filteredComments = comments?.filter((comment: any) => comment.taskId === taskId);
  const [commenterData, setCommenterData] = useState<{ [key: string]: { firstName: string, lastName: string, imageUrl: string } }>({});
  const [dataLoaded, setDataLoaded] = useState(false);

  const commenterIds = filteredComments?.map((comment: any) => comment?.userId) || [];
  const uniqueCommenterIds = Array.from(new Set(commenterIds));

  const fetchCommenterData = useCallback(async (ids: string[]) => {
    if (ids.length > 0) {
      try {
        const response = await fetch(`/api/getcommentuser?userIds=${ids.join(',')}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const dataById = data.reduce((acc: any, user: any) => {
          acc[user.id] = user;
          return acc;
        }, {});
        setCommenterData(dataById);
        setDataLoaded(true);
      } catch (error) {
        console.error('Error fetching commenter data:', error);
        setCommenterData({});
      }
    }
  }, []);

  useEffect(() => {
    if (!dataLoaded && uniqueCommenterIds.length > 0) {
      fetchCommenterData(uniqueCommenterIds);
    }
  }, [uniqueCommenterIds, fetchCommenterData, dataLoaded]);

  return (
    <div className='flex flex-col gap-4 border p-1 rounded-lg w-full dark:text-white text-black'>
      <div className='flex flex-col gap-4 w-full overflow-y-auto max-h-[20rem]'>
        {filteredComments?.map((comment: any) => (
          <div key={comment._id} className='p-4 flex gap-4 w-full flex-col justify-center rounded-md hover:border-neutral-200 transition-all'>
            <div className="flex gap-4 items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={commenterData[comment.userId]?.imageUrl} alt={commenterData[comment.userId]?.firstName} className='w-8 h-8 rounded-full' />
                <p className='text-xs dark:text-neutral-200 text-neutral-900 font-semibold'>{commenterData[comment.userId]?.firstName} {commenterData[comment.userId]?.lastName}</p>
              </div>
              <div className="flex gap-4">
              <p className="text-xs dark:text-neutral-500 text-neutral-500">{formatTime(comment._creationTime)}</p>
              <DropdownCommentMenu commentid={comment._id} />
              </div>
            </div>
            <p className=''>{comment.CommenterMessage}</p>
            <div className="flex flex-row gap-3">
              <div className="flex border justify-center items-center rounded-md p-1 gap-2">
                <p>😀 1</p>
              </div>
              <div className="flex border justify-center items-center rounded-md p-1 gap-2">
                <p>😎 1</p>
              </div>
            </div>
            <div className="flex gap-5 relative">
              <p className="text-sm dark:text-neutral-500 text-black">Reply</p>
              
              <p className="text-sm dark:text-neutral-500 text-black beforeitemcommentreact">React</p>
            </div>
          </div>
        ))}
        {filteredComments?.length === 0 && (
          <div className='border-2 border-neutral-700 bg-neutral-700/40 flex justify-center items-center rounded-md min-h-[10rem]'>
            <p className='font-semibold text-lg dark:text-white text-black'>No comments yet, be the first to comment on this task</p>
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
      return <p className='font-semibold rounded-md p-1 gap-2'>{months} months ago</p>;
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
