import { useAuth } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from '../../../convex/_generated/api';
import { useEffect, useState, useCallback, useRef } from "react";
import DropdownCommentMenu from "../dropdowns/comment";
import React from 'react';
import { Reply } from "lucide-react";

export default function CommentBoxer({ taskId }: { taskId: string }) {
  const { userId } = useAuth();
  const useridentifier = userId;
  const comments = useQuery(api.getcomments.get);
  const filteredComments = comments?.filter((comment: any) => comment.taskId === taskId);
  const [commenterData, setCommenterData] = useState<{ [key: string]: { firstName: string, lastName: string, imageUrl: string } }>({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showReplyDropdown, setShowReplyDropdown] = useState<string | null>(null);

  const commenterIds = filteredComments?.map((comment: any) => comment?.userId) || [];
  const uniqueCommenterIds = Array.from(new Set(commenterIds));

  const replydropdown = (id: any) => {
    if (showReplyDropdown === id) {
      setShowReplyDropdown(null);
    } else {
      setShowReplyDropdown(id);
    }
  };

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


  const sendReplyMutation = useMutation(api.replysender.add);

  const ReplyChecker = ({ commentdata, userId }: { commentdata: any, userId: string }) => {
    const replys = useQuery(api.getreplys.get);
    const filteredReplys = replys?.filter((reply: any) => reply.commentId === commentdata._id);
  
    return (
      <div className="flex flex-col gap-4 relative ml-3 p-1 pl-5 w-full dark:text-white text-black">
        <div className="flex flex-col gap-4 w-full overflow-y-auto replys">
          {filteredReplys?.map((reply: any) => (
            <div key={reply._id} className="flex flex-col gap-3 justify-center relative ">
              <div className="flex flex-row items-center gap-3 ">
                <img src={commenterData[reply.userId]?.imageUrl} alt={commenterData[reply.userId]?.firstName} className='w-8 h-8 z-10 rounded-full' />
                <h2 className="font-semi-bold">{commenterData[reply.userId]?.firstName} {commenterData[reply.userId]?.lastName}</h2>
              </div>
              <p className="ml-11">{reply.CommenterMessage}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CommentReply = ({commentdata }: { commentdata: any }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    async function SendReply(id: any) {
      const textarea = textareaRef.current;
      if (textarea) {
        const reply = textarea.value;
        if (reply) {
          await sendReplyMutation({ commentId: commentdata._id, taskId: commentdata.taskId, userId: userId!, CommenterMessage: reply });
          console.log(reply);
          console.log(userId);
          console.log(id);
          textarea.value = '';
        }
      }
    }

    const handleInput = () => {
      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    };

    return (
      <div className="w-1/2 flex items-center flex-col justify-center border dark:border-neutral-700 rounded-xl p">
        <textarea
          ref={textareaRef}
          onInput={handleInput}
          placeholder={`Reply to ${useridentifier === userId ? 'your' : `${commenterData[userId]?.firstName} ${commenterData[userId]?.lastName}'s`} comment.`}
          className="w-full p-2 break-words h-auto bg-transparent text-wrap overflow-x-hidden resize-none"
          style={{ overflow: 'hidden' }}
        />
        <div className="flex w-full justify-between items-center pr-5 rounded-b-xl overflow-hidden">
          <button
            className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-200 transition-all dark:text-blue-400 font-semibold rounded-md p-2"
            onClick={() => SendReply(commentdata._id)}
          >
            Reply
          </button>
          <div className="flex gap-4 ">
            <p className="grayscale hover:grayscale-0 cursor-pointer transition-all">👍</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-4 border p-1 rounded-t-lg w-full dark:text-white text-black'>
      <div className='flex flex-col gap-4 w-full '>
        {filteredComments?.map((comment: any) => (
          <div key={comment._id} className='p-4 flex gap-4  w-full flex-col justify-center rounded-md hover:border-neutral-200 transition-all'>
            <div className="flex gap-4 items-center justify-between relative replygrabber">
              <div className="flex items-center gap-2 relative ">
                <img src={commenterData[comment.userId]?.imageUrl} alt={commenterData[comment.userId]?.firstName} className='w-8 h-8 rounded-full ' />
                <p className='text-xs dark:text-neutral-200 text-neutral-900 font-semibold'>{commenterData[comment.userId]?.firstName} {commenterData[comment.userId]?.lastName}</p>
              </div>
              <div className="flex gap-4">
                <p className="text-xs dark:text-neutral-500 text-neutral-500">{formatTime(comment._creationTime)}</p>
                <DropdownCommentMenu commentid={comment._id} commentdata={comment} />
              </div>
            </div>
            <div className="gap-3 flex flex-col ml-10">
            <p>{comment.CommenterMessage}</p>
            <div className="flex flex-row gap-3">
              <div className="flex border justify-center items-center rounded-md p-1 gap-2">
                <p>😀 1</p>
              </div>
              <div className="flex border justify-center items-center rounded-md p-1 gap-2">
                <p>😎 1</p>
              </div>
            </div>
            <div className="flex gap-5 relative">
              <button
                id={comment._id}
                onClick={() => replydropdown(comment._id)}
                className={`text-sm dark:text-neutral-500 text-black dark:hover:text-white hover:text-black transition-all ${showReplyDropdown === comment._id ? 'dark:text-white text-black' : ''}`}
              >
                Reply
              </button>

              <button
                id={comment._id}
                className="text-sm dark:text-neutral-500 text-black dark:hover:text-white hover:text-black transition-all beforeitemcommentreact"
              >
                React
              </button>
              </div>
            </div>
            {showReplyDropdown === comment._id && (
              <div className="flex flex-row gap-3">
                <div className="mt-1 beforetoperreply">
                  <img src={commenterData[userId]?.imageUrl} alt={commenterData[userId]?.firstName} className='w-8 h-8 rounded-full' />
                </div>
                <CommentReply commentdata={comment} />
              </div>
            )}
            {/* checking for replys */}
            <ReplyChecker commentdata={comment} />
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
