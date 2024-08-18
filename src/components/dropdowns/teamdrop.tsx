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

export default function Role({ value, onValueChange }: any) {
  const handleChange = ({newValue}: any) => {
    if (onValueChange) {
      onValueChange(newValue);
    }
    // find the role of the user and set it to the new value
    
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue className="px-2" />
      </SelectTrigger>
      <SelectContent className="z-[100000000000000000000000]">
        <SelectGroup>
          <SelectLabel >Role</SelectLabel>
            <SelectItem value="member">
                Member
            </SelectItem>
            <SelectItem value="manager">
                Manager
            </SelectItem>
            <SelectItem value="admin">
                Admin
            </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
