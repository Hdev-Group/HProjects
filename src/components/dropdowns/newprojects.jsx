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

export default function StatusSelect({ value, onChange }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Project Status" />
      </SelectTrigger>
      <SelectContent className="z-50">
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="planning">
            <div className="flex h-[20px] items-center justify-center p-3 rounded-lg planning gap-2">
              <div className="planningdot" />Planning
            </div>
          </SelectItem>
          <SelectItem value="developing">
            <div className="flex h-[20px] items-center justify-center p-3 rounded-lg developing gap-2">
              <div className="developingdot" />Developing
            </div>
          </SelectItem>
          <SelectItem value="live">
            <div className="flex h-[20px] items-center justify-center p-3 rounded-lg live gap-2">
              <div className="livedot" />Live
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}