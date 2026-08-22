import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Cta() {
  return (
    <section className="border-t border-border py-20">
      <div className="container">
        <div className="rounded-3xl bg-ink-600 px-8 py-14 text-center text-white dark:bg-ink-700">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Stop copying dates by hand.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-ink-100">
            Create a free account and turn your first syllabus into a calendar in under a minute.
          </p>
          <Link
            href="/register"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 bg-white text-ink-700 hover:bg-ink-50"
            )}
          >
            Get started free <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
