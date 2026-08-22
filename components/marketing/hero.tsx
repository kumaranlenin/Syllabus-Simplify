import Link from "next/link";
import { ArrowRight, CalendarCheck2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="container grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-24">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
          <CalendarCheck2 className="h-3.5 w-3.5" />
          Built for the first week of the semester
        </div>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight md:text-6xl">
          Paste your syllabus.
          <br />
          <span className="highlight-mark">Get every deadline.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-muted-foreground">
          Syllabus Simplify reads any syllabus, pulls out assignments, exams,
          labs, and projects, and drops them straight into a calendar you can
          sync to your phone.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/register" className={cn(buttonVariants({ size: "lg" }))}>
            Simplify my syllabus <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/about" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            How it works
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          No credit card. Works with any course format.
        </p>
      </div>

      <SyllabusMockup />
    </section>
  );
}

// Illustrative before/after mockup: raw syllabus text turning into calendar chips
function SyllabusMockup() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-ink-100/40 to-amber-100/40 blur-2xl dark:from-ink-900/30 dark:to-amber-500/10" />
      <div className="rounded-2xl border border-border bg-card p-5 shadow-lg">
        <p className="font-mono text-[13px] leading-relaxed text-muted-foreground">
          Week 6: <mark className="rounded bg-amber-200/70 px-1 text-foreground dark:bg-amber-500/30">Assignment 2 due Oct 3</mark>{" "}
          covering chapters 5-7.
          <br />
          Week 8: <mark className="rounded bg-amber-200/70 px-1 text-foreground dark:bg-amber-500/30">Midterm exam Oct 17</mark>{" "}
          in class, closed book.
          <br />
          Lab section: <mark className="rounded bg-amber-200/70 px-1 text-foreground dark:bg-amber-500/30">Lab 3 report Oct 24</mark>.
        </p>

        <div className="my-4 flex items-center gap-2 text-xs font-medium text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          becomes
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-2">
          <EventChip title="Assignment 2" date="Oct 3" color="#3d4de0" />
          <EventChip title="Midterm Exam" date="Oct 17" color="#e0473d" />
          <EventChip title="Lab 3 Report" date="Oct 24" color="#0f9e8f" />
        </div>
      </div>
    </div>
  );
}

function EventChip({ title, date, color }: { title: string; date: string; color: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="font-medium">{title}</span>
      </div>
      <span className="font-mono text-xs text-muted-foreground">{date}</span>
    </div>
  );
}
