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

export default function IncidentProcess({ value, onValueChange }: any) {
  const handleChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger>
        <SelectValue className="px-2" />
      </SelectTrigger>
      <SelectContent className="z-[100000000000000000000000]">
        <SelectGroup>
          <SelectLabel>Role</SelectLabel>
          <SelectItem value="investigation">Investigation</SelectItem>
          <SelectItem value="fixing">Fixing</SelectItem>
          <SelectItem value="monitoring">Monitoring</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
