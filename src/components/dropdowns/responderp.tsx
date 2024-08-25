import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Critical, High, Medium, Low } from "./priorities/critical"

export default function PriorityResponse({ value, onChange }: any) {
  return (
    <>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Priority" />
      </SelectTrigger>
      <SelectContent className="z-50">
        <SelectGroup>
          <SelectLabel>Priority</SelectLabel>
          <SelectItem value="critical">
            <Critical />
          </SelectItem>
          <SelectItem value="high">
            <High />
          </SelectItem>
          <SelectItem value="medium">
            <Medium />
          </SelectItem>
          <SelectItem value="low">
            <Low />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>

    </>
  )
}