import * as React from "react";
import { useUser } from '@clerk/nextjs';
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from '../../../convex/_generated/api';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

interface ChatSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  id: { id: string };
}

export default function ChatSelector({ value, onValueChange, id }: ChatSelectorProps) {
  const { user } = useUser();
  const projectsholder = useQuery(api.idgetprojects.get, { _id: id.toString() });
  const userId = projectsholder?.userId;
  const [ownerData, setOwnerData] = useState<UserData | null>(null);
  const [otherUsers, setOtherUsers] = useState<UserData[]>([]);
  const ownerid = projectsholder?.userId;

  useEffect(() => {
    async function fetchProjectOwnerData() {
      if (ownerid) {
        try {
          const response = await fetch(`/api/get-user?userId=${ownerid}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setOwnerData({ id: ownerid, ...data });
        } catch (error) {
          console.error('Error fetching project owner data:', error);
          setOwnerData(null);
        }
      }
    }

    fetchProjectOwnerData();
  }, [ownerid]);

  useEffect(() => {
    async function fetchOtherUsersData(){
      if (projectsholder && projectsholder.otherusers.length > 0) {
        try {
          const userPromises = projectsholder.otherusers.map(async (userId) => {
            const response = await fetch(`/api/get-user?userId=${userId}`);
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return { id: userId, ...data };
          });

          const usersData = await Promise.all(userPromises);
          setOtherUsers(usersData);
        } catch (error) {
          console.error('Error fetching assignee data:', error);
          setOtherUsers([]);
        }
      }
    }
    fetchOtherUsersData();
  }, [projectsholder]);

  if (!projectsholder || !user) {
    return <div>Loading...</div>;
  }

  if (!userId) {
    console.error("No project owner ID found in projectsholder");
    return <div>No project owner found</div>;
  }

  const renderUser = (user: UserData) => {
    const userInfoArray = [user.id, user.firstName, user.lastName];
  
    return (
      <SelectItem key={user.id} value={JSON.stringify(userInfoArray)}>
        <div className="flex flex-row items-center gap-2 p-1">
          <img src={user.imageUrl} alt="avatar" className="h-8 w-8 rounded-full" />
          <h2 className="text-white ml-2 font-semibold">{user.firstName} {user.lastName}</h2>
        </div>
      </SelectItem>
    );
  };

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select a user to chat with" />
      </SelectTrigger>
      <SelectContent className="z-[100000000000000000000000]">
        <SelectGroup>
          {ownerData && renderUser(ownerData)}
        </SelectGroup>
        <SelectGroup>
          {otherUsers.map((user) => renderUser(user))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
