import { CalendarClock, Merge, ShieldCheck, Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: Sparkles,
    title: "AI extraction that reads the whole page",
    description:
      "Mistral parses free-form syllabus text, tables, or bullet lists and pulls out titles, dates, and categories automatically.",
  },
  {
    icon: Merge,
    title: "Never lose an event",
    description:
      "Upload a second syllabus, or a revised one, and new dates merge in without touching what you already added or edited.",
  },
  {
    icon: CalendarClock,
    title: "One calendar for every course",
    description:
      "Color-coded assignments, exams, labs, projects, and quizzes sit on a single month view you can search and filter.",
  },
  {
    icon: ShieldCheck,
    title: "Your data stays yours",
    description:
      "Row-level security on every table means only you can ever read or edit your syllabi and events.",
  },
];

export function Features() {
  return (
    <section className="border-t border-border bg-secondary/40 py-20">
      <div className="container">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          Everything a busy semester needs
        </h2>
        <p className="mt-3 max-w-lg text-muted-foreground">
          Not another to-do app. A focused tool that turns the document you
          already have into the calendar you already use.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink-50 text-ink-600 dark:bg-ink-900/40 dark:text-ink-300">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
