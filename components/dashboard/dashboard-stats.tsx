import { CalendarDays, ListChecks, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { CalendarEvent } from "@/types";

export function DashboardStats({ events }: { events: CalendarEvent[] }) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.event_date >= today);
  const next7Days = upcoming.filter((e) => {
    const diff = (new Date(e.event_date).getTime() - new Date(today).getTime()) / 86_400_000;
    return diff <= 7;
  });

  const stats = [
    { label: "Total events", value: events.length, icon: ListChecks },
    { label: "Upcoming", value: upcoming.length, icon: CalendarDays },
    { label: "Due in 7 days", value: next7Days.length, icon: Clock },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-50 text-ink-600 dark:bg-ink-900/40 dark:text-ink-300">
              <stat.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-2xl font-semibold leading-none">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
