import * as React from "react";
import { useUser } from '@clerk/nextjs';
import { useQuery } from "convex/react";
import { api } from '../../../convex/_generated/api';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export default function AssigneeSelect({ value, onValueChange, id }) {
  const { user } = useUser();
  const projectsholder = useQuery(api.idgetprojects.get, { _id: id.id });
  const userId = projectsholder?.userId;
  console.log("projectsholder:", projectsholder);

  if (!projectsholder || !user) {
    return <div>Loading...</div>;
  }

  const projectOwner = userId;
  if (!projectOwner) {
    console.error("No project owner found in projectsholder");
    return <div>No project owner found</div>;
  }

  const renderUser = (user) => {
    console.log("rendering user:", user);
    return (
      <SelectItem key={user.id} value={user.id}>
        <div className="flex flex-row items-center gap-4">
          <img src={user.imageUrl} alt="avatar" className="h-8 w-8 rounded-full" />
          <h2 className="text-white ml-2">{user.firstName} {user.lastName}</h2>
        </div>
      </SelectItem>
    );
  };

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Assignee" />
      </SelectTrigger>
      <SelectContent className="z-[100000000000000000000000]">
        <SelectGroup>
          {user && renderUser(user)}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}