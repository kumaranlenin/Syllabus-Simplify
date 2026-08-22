const STEPS = [
  {
    step: "01",
    title: "Paste your syllabus",
    description: "Copy the text from your course PDF, LMS page, or email and drop it into the dashboard.",
  },
  {
    step: "02",
    title: "Let the AI read it",
    description: "Mistral scans the text for dated events and classifies each one as an assignment, exam, lab, project, or quiz.",
  },
  {
    step: "03",
    title: "Review your calendar",
    description: "Everything lands on your calendar automatically. Edit, delete, or add events by hand any time.",
  },
  {
    step: "04",
    title: "Sync anywhere",
    description: "Download an .ics file that works with Google Calendar, Apple Calendar, and Outlook.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20">
      <div className="container">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
          How it works
        </h2>
        <p className="mt-3 max-w-lg text-muted-foreground">
          Four steps, most of which happen automatically.
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.step} className="relative">
              <span className="font-display text-4xl font-semibold text-ink-200 dark:text-ink-800">
                {s.step}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
