import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = { title: "About & FAQ — Syllabus Simplify" };

const FAQS = [
  {
    q: "What is Syllabus Simplify?",
    a: "A tool that reads a course syllabus and turns every assignment, exam, lab, project, and quiz date into a calendar you can browse, edit, and export.",
  },
  {
    q: "How does it work?",
    a: "Paste your syllabus text on the dashboard. Mistral AI reads it and extracts dated events as structured data, which is validated and merged into your existing calendar.",
  },
  {
    q: "Will uploading a new syllabus delete my old events?",
    a: "No. Existing events, including ones you added or edited by hand, are never overwritten or removed automatically. Only genuinely new events are added.",
  },
  {
    q: "Can I edit or remove an event?",
    a: "Yes. Open the calendar, click any event, and edit its title, description, date, or category, or delete it entirely.",
  },
  {
    q: "Can I use this calendar in Google Calendar or Outlook?",
    a: "Yes. The calendar page has a Download .ics button that exports a standard iCalendar file compatible with Google Calendar, Apple Calendar, and Outlook.",
  },
  {
    q: "Is my syllabus data private?",
    a: "Yes. Every table is protected with row-level security in Supabase, so only your account can ever read or modify your syllabi and events.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="container max-w-3xl py-16">
        <h1 className="font-display text-4xl font-semibold tracking-tight">
          About Syllabus Simplify
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Syllabus Simplify exists to remove the most tedious part of the first
          week of class: manually copying every deadline from a syllabus PDF
          into a calendar app.
        </p>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">How it works</h2>
          <ol className="mt-4 space-y-3 text-muted-foreground">
            <li>1. Paste the full text of your syllabus into the dashboard.</li>
            <li>
              2. Mistral AI extracts assignments, exams, labs, projects, and
              quizzes with their dates.
            </li>
            <li>
              3. New events merge into your calendar without touching anything
              already there.
            </li>
            <li>
              4. Edit, filter, search, or export your calendar as an .ics file
              at any time.
            </li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Benefits</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
            <li>
              Saves the hour or two usually spent transcribing dates by hand.
            </li>
            <li>One calendar across every course, color-coded by category.</li>
            <li>
              Works with syllabi from any format: PDFs, LMS pages, or plain
              email text.
            </li>
            <li>Syncs to the calendar app you already use.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">FAQ</h2>
          <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
            {FAQS.map((item) => (
              <div key={item.q} className="p-5">
                <h3 className="font-medium">{item.q}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold">Contact</h2>
          <p className="mt-3 text-muted-foreground">
            Questions or feedback? Reach us at{" "}
            <a
              href="mailto:kumaranlv2006@gmail.com"
              className="text-primary hover:underline"
            >
              kumaranlv2006@gmail.com
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
