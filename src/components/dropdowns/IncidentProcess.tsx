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
        <SelectValue className="px-2" placeholder="Process" />
      </SelectTrigger>
      <SelectContent className="z-50">
        <SelectGroup>
          <SelectLabel>Process</SelectLabel>
          <SelectItem value="investigation">Investigation</SelectItem>
          <SelectItem value="fixing">Fixing</SelectItem>
          <SelectItem value="monitoring">Monitoring</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
