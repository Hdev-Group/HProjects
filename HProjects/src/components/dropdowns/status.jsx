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
import { InProgress, Done, Todo, BackLog } from "./status/status";

export default function StatusTime({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Project Status" />
      </SelectTrigger>
      <SelectContent className="z-[100000000000000000000000]">
        <SelectGroup>
          <SelectLabel>Project Status</SelectLabel>
          <SelectItem value="backlog">
            <BackLog />
          </SelectItem>
          <SelectItem value="todo">
            <Todo />
          </SelectItem>
          <SelectItem value="inprogress">
            <InProgress />
          </SelectItem>
          <SelectItem value="done">
            <Done />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}