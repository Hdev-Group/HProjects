import * as React from "react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function TimeUpdate({ value, onValueChange }: any) {
    const [time, setTime] = useState("30");
    const handleChange = (newValue: string) => {
        if (onValueChange) {
            onValueChange(newValue);
            setTime(newValue);
        }
    };

    return (
        <Select value={time} onValueChange={handleChange}>
            <SelectTrigger>
                <SelectValue className="px-2" />
            </SelectTrigger>
            <SelectContent className="z-[100000000000000000000000]">
                <SelectGroup>
                    <SelectLabel>Process</SelectLabel>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="10">10 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="180">3 hours</SelectItem>
                    <SelectItem value="360">6 hours</SelectItem>
                    <SelectItem value="750">12 hours</SelectItem>
                    <SelectItem value="1440">1 day</SelectItem>
                    <SelectItem value="2880">2 days</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
