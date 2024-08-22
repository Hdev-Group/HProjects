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

interface Valuations {
  value: string;
  onValueChange: (value: string) => void;
}

export default function TimeZoner({ value, onValueChange }: Valuations) {
  const handleChange = (newValue: any) => {
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="Pacific/Pago_Pago">(GMT-11:00) Pago Pago</SelectItem>
          <SelectItem value="Pacific/Honolulu">(GMT-10:00) Hawaii Time</SelectItem>
          <SelectItem value="Pacific/Tahiti">(GMT-10:00) Tahiti</SelectItem>
        </SelectGroup>
        <SelectGroup>
            <SelectItem value="America/Anchorage">(GMT-09:00) Alaska Time</SelectItem>
            <SelectItem value="America/Los_Angeles">(GMT-08:00) Pacific Time</SelectItem>
            <SelectItem value="America/Denver">(GMT-07:00) Mountain Time</SelectItem>
            <SelectItem value="America/Chicago">(GMT-06:00) Central Time</SelectItem>
            <SelectItem value="America/New_York">(GMT-05:00) Eastern Time</SelectItem>
            <SelectItem value="America/Halifax">(GMT-04:00) Atlantic Time - Halifax</SelectItem>
            <SelectItem value="America/Argentina/Buenos_Aires">(GMT-03:00) Buenos Aires</SelectItem>
            <SelectItem value="America/Sao_Paulo">(GMT-02:00) Sao Paulo</SelectItem>
            <SelectItem value="America/Argentina/Buenos_Aires">(GMT-01:00) Azores</SelectItem>
        </SelectGroup>
        <SelectGroup>
            <SelectItem value="Europe/London">(GMT) London</SelectItem>
            <SelectItem value="Europe/Paris">(GMT+01:00) Paris</SelectItem>
            <SelectItem value="Europe/Istanbul">(GMT+02:00) Istanbul</SelectItem>
            <SelectItem value="Europe/Moscow">(GMT+03:00) Moscow</SelectItem>
            <SelectItem value="Asia/Dubai">(GMT+04:00) Dubai</SelectItem>
            <SelectItem value="Asia/Karachi">(GMT+05:00) Karachi</SelectItem>
            <SelectItem value="Asia/Dhaka">(GMT+06:00) Dhaka</SelectItem>
            <SelectItem value="Asia/Bangkok">(GMT+07:00) Bangkok</SelectItem>
            <SelectItem value="Asia/Hong_Kong">(GMT+08:00) Hong Kong</SelectItem>
            <SelectItem value="Asia/Tokyo">(GMT+09:00) Tokyo</SelectItem>
            <SelectItem value="Australia/Sydney">(GMT+10:00) Sydney</SelectItem>
            <SelectItem value="Pacific/Auckland">(GMT+11:00) Auckland</SelectItem>
        </SelectGroup>
        <SelectGroup>
            <SelectItem value="Pacific/Niue">(GMT+12:00) Niue</SelectItem>
            <SelectItem value="Pacific/Tongatapu">(GMT+13:00) Tongatapu</SelectItem>
            <SelectItem value="Pacific/Kiritimati">(GMT+14:00) Kiritimati</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
