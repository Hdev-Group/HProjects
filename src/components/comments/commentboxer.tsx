import { useAuth } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from '../../../convex/_generated/api';
import { useEffect, useState, useCallback, useRef } from "react";
import DropdownCommentMenu from "../dropdowns/comment";
import React from 'react';
import { useUser } from "@clerk/clerk-react";
import { useToast } from "../ui/use-toast";

interface Comment {
  _id: string;
  taskId: string;
  userId: string;
  CommenterMessage: string;
  _creationTime: string;
}

interface UserData {
  firstName: string;
  lastName: string;
  imageUrl: string;
}

interface CommentBoxerProps {
  taskId: string;
}

export default function CommentBoxer({ taskId }: { taskId: any }) {
  const { userId } = useAuth();
  const {toast} = useToast();
  const useridentifier = userId;
  const comments = useQuery(api.getcomments.get);
  const filteredComments = comments?.filter((comment: any) => comment.taskId === taskId);
  const [commenterData, setCommenterData] = useState<{ [key: string]: { firstName: string, lastName: string, imageUrl: any } }>({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReplyDropdown, setShowReplyDropdown] = useState<string | null>(null);

  // Extract user IDs from comments
  const commenterIds = filteredComments?.map((comment: any) => comment?.userId) || [];

  // Extract user IDs from replies
  const replys = useQuery(api.getreplys.get);
  const replyUserIds = replys?.map((reply: any) => reply?.userId) || [];

  // Combine and deduplicate all user IDs
  const uniqueUserIds = Array.from(new Set([...commenterIds, ...replyUserIds]));

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
        const response = await fetch(`/api/getcommentuser?userIds=${ids.join(',')}&projectId=${taskId}`);
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
        console.error('Error fetching user data:', error);
        setCommenterData({});
      }
    }
  }, []);

  useEffect(() => {
    if (!dataLoaded && uniqueUserIds.length > 0) {
      fetchCommenterData(uniqueUserIds);
    }
  }, [uniqueUserIds, fetchCommenterData, dataLoaded]);

  const sendReplyMutation = useMutation(api.replysender.add);

  const ReplyChecker = ({ commentdata }: { commentdata: any }) => {
    const filteredReplys = replys?.filter((reply: any) => reply.commentId === commentdata._id);
  
    if (!filteredReplys || filteredReplys.length === 0) return null;
  
    return (
      <div className="flex flex-col gap-4 relative ml-3 p-1 pl-5 w-full dark:text-white text-black">
        <div className="flex flex-col gap-4 w-full overflow-y-auto replys">
          {filteredReplys.map((reply: any) => (
            <div key={reply._id} className="flex flex-col gap-3 justify-center relative">
              <div className="flex flex-row items-center gap-3">
              <img
                  src={commenterData[reply.userId]?.imageUrl || '/default-avatar.png'} // Provide a fallback image
                  alt={`${commenterData[reply.userId]?.firstName || 'Unknown'} ${commenterData[reply.userId]?.lastName || ''}`}
                  className="w-8 h-8 rounded-full"
                />
                <h2 className="font-semibold text-xs">
                  {commenterData[reply.userId]?.firstName || 'Unknown'} {commenterData[reply.userId]?.lastName || ''}
                </h2>
              </div>
              <p className="ml-11">{reply.CommenterMessage}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  

  const CommentReply = ({ commentdata }: { commentdata: any }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    async function SendReply(id: any) {
      const textarea = textareaRef.current;
      if (textarea) {
        const reply = textarea.value;
        if (reply.length > 500) {
          toast({
            variant: 'destructive',
            description: 'Reply is too long. Please keep it under 500 characters.',
          })
          return;
        }
        if (reply) {
          await sendReplyMutation({ commentId: commentdata._id, taskId: commentdata.taskId, userId: userId!, CommenterMessage: reply });
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
          id="textreplyarea"
          maxLength={500}
          placeholder={`Reply to ${useridentifier === userId ? 'your' : `${commenterData?.firstName} ${commenterData?.lastName}'s`} comment.`}
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
            <p className="grayscale hover:grayscale-0 cursor-pointer transition-all">
              👍
            </p>
          </div>
        </div>
      </div>
    );
  };

  const emojipopup = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const EmojiPicker = () => {
    return (
      <div className="flex flex-col gap-4 absolute bottom-6 z-2 left-0 p-2 bg-neutral-700 dark:bg-neutral-800 rounded-md emojiselector shadow-lg z-50">
        <div className="flex flex-row gap-3">
          <p>👍</p>
          <p>👎</p>
          <p>👌</p>
          <p>👏</p>
          <p>😎</p>
        </div>
      </div>
    );
  };
  const user = useUser();
  const userimage = user?.user?.imageUrl;
  return (
    <div className='flex flex-col gap-4 border p-1 rounded-t-lg w-full dark:text-white text-black  '>
      <div className='flex flex-col gap-4 w-full '>
        {filteredComments?.map((comment: any) => (
          <div key={comment._id} className='p-4 flex gap-4 bg-neutral-800/10 w-full flex-col justify-center rounded-md hover:border-neutral-200 transition-all'>
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
              {showEmojiPicker && <EmojiPicker />}
              <button
                id={comment._id}
                onClick={emojipopup}
                className="text-sm dark:text-neutral-500  text-black dark:hover:text-white hover:text-black transition-all beforeitemcommentreact"
              >
                React
              </button>
              </div>
            </div>
            {showReplyDropdown === comment._id && (
              <div className="flex flex-row gap-3">
                <div className="mt-1 beforetoperreply">
                  <img src={userimage} alt={`${commenterData?.firstName} ${commenterData?.lastName}`} className='w-8 h-8 rounded-full' />
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
