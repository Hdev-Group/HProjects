import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
export default function Role({ value, onValueChange, _id, userid }: any) {
  const handleChange = ({ newValue }: any) => {
    if (onValueChange) {
      onValueChange(newValue);
    }
    // set users as the value of the role
  };
  const getuserss = useQuery(api.userstab.get);
  const users = getuserss?.find((user: any) => user.userid === userid && user.projectID === _id);

  return (
    <Select value={users?.role} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue className="px-2" />
      </SelectTrigger>
      <SelectContent className="z-[100000000000000000000000]">
        <SelectGroup>
          <SelectLabel>Role</SelectLabel>
          <SelectItem value="member">Member</SelectItem>
          <SelectItem value="manager">Manager</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
