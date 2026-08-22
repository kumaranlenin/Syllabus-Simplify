"use client";

import { ChevronLeft, ChevronRight, Download, Plus, Search } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { CATEGORY_LABELS } from "@/types";
import type { EventCategory } from "@/types";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface CalendarToolbarProps {
  date: Date;
  onDateChange: (date: Date) => void;
  search: string;
  onSearchChange: (value: string) => void;
  category: EventCategory | "all";
  onCategoryChange: (value: EventCategory | "all") => void;
  onAddEvent: () => void;
}

export function CalendarToolbar({
  date,
  onDateChange,
  search,
  onSearchChange,
  category,
  onCategoryChange,
  onAddEvent,
}: CalendarToolbarProps) {
  function changeMonth(delta: number) {
    onDateChange(new Date(date.getFullYear(), date.getMonth() + delta, 1));
  }

  return (
    <div className="flex flex-col gap-4 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" onClick={() => changeMonth(-1)} aria-label="Previous month">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Select
          value={date.getMonth()}
          onChange={(e) => onDateChange(new Date(date.getFullYear(), Number(e.target.value), 1))}
          className="w-36"
        >
          {MONTHS.map((month, i) => (
            <option key={month} value={i}>
              {month}
            </option>
          ))}
        </Select>
        <Select
          value={date.getFullYear()}
          onChange={(e) => onDateChange(new Date(Number(e.target.value), date.getMonth(), 1))}
          className="w-24"
        >
          {Array.from({ length: 6 }, (_, i) => date.getFullYear() - 2 + i).map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
        <Button variant="outline" size="icon" onClick={() => changeMonth(1)} aria-label="Next month">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-1 flex-wrap items-center gap-2 md:justify-end">
        <div className="relative w-full sm:w-48">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search events"
            className="pl-9"
          />
        </div>
        <Select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as EventCategory | "all")}
          className="w-40"
        >
          <option value="all">All categories</option>
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <a href="/api/ics" download className={cn(buttonVariants({ variant: "outline", size: "sm" }))}>
          <Download className="h-4 w-4" /> .ics
        </a>
        <Button size="sm" onClick={onAddEvent}>
          <Plus className="h-4 w-4" /> Add event
        </Button>
      </div>
    </div>
  );
}
