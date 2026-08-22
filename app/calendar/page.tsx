import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
import { CalendarView } from "@/components/calendar/calendar-view";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "@/types";
import type { CalendarEvent } from "@/types";

export const metadata: Metadata = { title: "Calendar — Syllabus Simplify" };

export default async function CalendarPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", user.id)
    .order("event_date", { ascending: true });

  return (
    <>
      <SiteHeader />
      <main className="container py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight">Your calendar</h1>
            <p className="mt-1 text-muted-foreground">Click any day to add an event, or click an event to edit it.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <div key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: CATEGORY_COLORS[key as keyof typeof CATEGORY_COLORS] }}
                />
                {label}
              </div>
            ))}
          </div>
        </div>

        <CalendarView initialEvents={(events ?? []) as CalendarEvent[]} />
      </main>
      <Footer />
    </>
  );
}
