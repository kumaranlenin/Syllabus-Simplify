import { format, parseISO } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/types";
import type { CalendarEvent } from "@/types";

export function UpcomingDeadlines({ events }: { events: CalendarEvent[] }) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events
    .filter((e) => e.event_date >= today)
    .sort((a, b) => a.event_date.localeCompare(b.event_date))
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming deadlines</CardTitle>
        <CardDescription>Your next five events, soonest first.</CardDescription>
      </CardHeader>
      <CardContent>
        {upcoming.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No upcoming events yet. Analyze a syllabus to populate your calendar.
          </p>
        ) : (
          <ul className="space-y-1">
            {upcoming.map((event) => (
              <li
                key={event.id}
                className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-secondary/60"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLORS[event.category] }}
                  />
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{CATEGORY_LABELS[event.category]}</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-muted-foreground">
                  {format(parseISO(event.event_date), "MMM d")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
