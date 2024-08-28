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

export default function RolerAssigneeSelect({
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
  const incident = useQuery(api.incident.get);
  const incidentfilter = incident?.filter((inc: any) => inc._id === incidentid);

  const [users, setUsers] = useState<
    { id: string; firstName: string; lastName: string; imageUrl: string }[]
  >([]);

  useEffect(() => {
    async function fetchUsers() {
      if (incident) {
        // Find the incident with the given incidentid
        const filteredIncident = incident.find(
          (inc: any) => inc._id === incidentid
        );

        if (!filteredIncident) {
          console.error("No incident found with the provided incident ID.");
          return;
        }

        const { reporterid, responders } = filteredIncident;

        // Combine all user IDs and remove empty or undefined values
        const userIds = [
          reporterid,
          ...(responders || []),
        ].filter((id) => id && id.trim() !== "");

        // Log the user IDs to debug

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

          // Log out fetched users to debug
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUsers([]);
        }
      }
    }

    fetchUsers();
  }, [incident, incidentid]);

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
        <SelectValue placeholder="Lead Responder" />
      </SelectTrigger>
      <SelectContent className="z-50">
        <SelectGroup>
          <SelectItem key={"none"} value={"none"}>
            <div className="flex flex-row items-center gap-2 p-1">
              <h2 className="text-white ml-2 font-semibold">None</h2>
            </div>
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          {users.map((user) => renderUser(user))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
