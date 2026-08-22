import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";
import { SyllabusAnalyzer } from "@/components/dashboard/syllabus-analyzer";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { UpcomingDeadlines } from "@/components/dashboard/upcoming-deadlines";
import type { CalendarEvent } from "@/types";

export const metadata: Metadata = { title: "Dashboard — Syllabus Simplify" };

export default async function DashboardPage() {
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

  const name = (user.user_metadata?.name as string | undefined) ?? user.email?.split("@")[0];

  return (
    <>
      <SiteHeader />
      <main className="container py-10">
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          Welcome back{name ? `, ${name}` : ""}
        </h1>
        <p className="mt-1 text-muted-foreground">Paste a syllabus below to keep your calendar current.</p>

        <div className="mt-8">
          <DashboardStats events={(events ?? []) as CalendarEvent[]} />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SyllabusAnalyzer />
          </div>
          <UpcomingDeadlines events={(events ?? []) as CalendarEvent[]} />
        </div>
      </main>
      <Footer />
    </>
  );
}
