import { useAuth } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react";
import { api } from '../../../convex/_generated/api';

interface AssigneeData {
  firstName: string;
  lastName: string;
  imageUrl: string;
  id: string;
}

interface ChatsideProps {
  chat: {
    _id: string;
    userId: string;
    otherchatter: string;
  };
  projectid: string;
}

export default function Chatside({ chat, projectid }: ChatsideProps) {
  const jobtitlealready = useQuery(api.getjob.get);
  const { userId: currentUserId } = useAuth();
  const [assigneeData, setAssigneeData] = useState<AssigneeData | null>(null);

  useEffect(() => {
    async function fetchAssigneeData() {
      const userIdToFetch = chat.userId === currentUserId ? chat.otherchatter : chat.userId;

      if (userIdToFetch) {
        try {
          const response = await fetch(`/api/get-user?userId=${userIdToFetch}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setAssigneeData(data);
        } catch (error) {
          console.error('Error fetching assignee data:', error);
          console.error('Fetch URL:', `/api/get-user?userId=${userIdToFetch}`);
          setAssigneeData(null);
        }
      } else {
        console.warn('No valid userId to fetch data for.');
        setAssigneeData(null);
      }
    }

    fetchAssigneeData();
  }, [chat.userId, chat.otherchatter, currentUserId]);


  return (
    <div className="flex flex-row items-center gap-4 cursor-pointer transition-all hover:bg-neutral-700/30 w-full h-16 pl-4">
      {assigneeData ? (
        <>
          <a href={chat._id ? `/projects/${projectid}/chat/${chat._id}` : `/projects/${projectid}/chat`} className="flex flex-row w-full items-center gap-3">
            <img src={assigneeData.imageUrl} alt="Assignee Avatar" className="w-8 h-8 rounded-full" />
            <div className="flex flex-col gap-0.5">
              <p className="text-md font-semibold">
                {assigneeData.firstName} {assigneeData.lastName}
              </p>
              <p className="text-sm text-neutral-500">
                {jobtitlealready?.find(job => job.userid === assigneeData.id)?.jobtitle || 'No job title'}
              </p>
            </div>
          </a>
        </>
      ) : (
        <>
          <img alt="Assignee Avatar" className="w-8 h-8 bg-neutral-500 animate-pulse rounded-full" />
          <div className="flex flex-col gap-0.5">
            <p className="text-md font-semibold bg-neutral-500 animate-pulse w-10"></p>
            <p className="text-sm text-neutral-500 bg-neutral-500 animate-pulse w-20"></p>
          </div>
        </>
      )}
    </div>
  );
}
