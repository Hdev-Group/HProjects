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
import { Critical, High, Medium, Low, Feature, Security } from "./priorities/critical"

export default function PriorityStatus({ value, onChange }) {
  return (
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
          <SelectItem value="Feature">
            <Feature />
          </SelectItem>
          <SelectItem value="security">
            <Security />
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}