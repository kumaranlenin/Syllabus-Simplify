import ical from "ical-generator";
import { createClient } from "@/lib/supabase/server";
import type { CalendarEvent } from "@/types";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new Response("Not authenticated", { status: 401 });
  }

  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", user.id)
    .order("event_date", { ascending: true });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  const calendar = ical({ name: "Syllabus Simplify" });

  ((events ?? []) as CalendarEvent[]).forEach((event) => {
    const start = new Date(`${event.event_date}T09:00:00`);
    calendar.createEvent({
      start,
      end: new Date(start.getTime() + 60 * 60 * 1000),
      allDay: true,
      summary: `[${event.category}] ${event.title}`,
      description: event.description ?? "",
    });
  });

  return new Response(calendar.toString(), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="syllabus-simplify.ics"',
    },
  });
}
