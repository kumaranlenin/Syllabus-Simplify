import Link from "next/link";
import { GraduationCap, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-4.5 w-4.5" />
            </span>
            Syllabus Simplify
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Turn any syllabus into a calendar you actually check, in one paste.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Quick links</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link href="/dashboard" className="hover:text-foreground">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/calendar" className="hover:text-foreground">
                Calendar
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-foreground">
                About / FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a
                href="mailto:kumaranlv2006@gmail.com"
                className="hover:text-foreground"
              >
                kumaranlv2006@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6">
        <p className="container text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Syllabus Simplify. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
