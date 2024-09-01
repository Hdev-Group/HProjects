import * as React from "react";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";


export function PagerSelector({
    value, // This is the current lead responder ID
    onValueChange,
    id,
    incidentid,
  }: {
    value: string;
    onValueChange: (value: string) => void;
    id: { id: string };
    incidentid: string;
  }) {
    const { user } = useUser();
    const projectsholder = useQuery(api.idgetprojects.get, { _id: id });
    const getpagers = useQuery(api.pagerget.get);  
    const [users, setUsers] = useState<
      { id: string; firstName: string; lastName: string; imageUrl: string }[]
    >([]);
  
    useEffect(() => {
        async function fetchUsers() {
          if (getpagers) {
            // Filter the pagers by projectid
            const filteredPagers = getpagers.filter((pager: any) => pager.projectid === id);      
            if (filteredPagers.length === 0) {
              console.error("No incident found with the provided incident ID.");
              return;
            }
            // Extract userIds from the filtered pagers
            const userIds = filteredPagers.map((pager: any) => pager.userId);
            try {
              // Fetch user data for each userId
              const userPromises = userIds.map(async (userId: string) => {
                const response = await fetch(`/api/get-user?userId=${userId}`);
                if (!response.ok) {
                  throw new Error(`Failed to fetch user data: ${response.status}`);
                }
                const data = await response.json();
                return { id: userId, ...data };
              });
      
              // Wait for all promises to resolve and set the users state
              const fetchedUsers = await Promise.all(userPromises);
              setUsers(fetchedUsers);
                  } catch (error) {
              console.error("Error fetching user data:", error);
              setUsers([]);
            }
          }
        }
      
        fetchUsers();
      }, [getpagers, id]);
  
    if (!projectsholder || !user) {
      return <div>Loading...</div>;
    }
  
    const renderUser = (user: any) => (
      <SelectItem key={user.id} value={user.id}>
        <div className="flex flex-row items-center gap-2 p-1">
          <img
            src={user.imageUrl}
            alt="avatar"
            className="h-8 w-8 rounded-full"
          />
          <h2 className="text-white ml-2 font-semibold">
            {user.firstName} {user.lastName}
          </h2>
        </div>
      </SelectItem>
    );
  
    return (
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a user or a custom setting" />
        </SelectTrigger>
        <SelectContent className="z-50">

          <SelectGroup>
            {users.map((user) => renderUser(user))}
          </SelectGroup>
          <SelectGroup>
            <SelectItem key={"all"} value={"all"}>
                <div className="flex flex-row items-center gap-2 p-1">
                <h2 className="text-white ml-2 font-semibold">
                    All Responders
                </h2>
                </div>
            </SelectItem>
        </SelectGroup>
        </SelectContent>
      </Select>
    );
  }
