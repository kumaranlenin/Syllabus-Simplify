import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Log in — Syllabus Simplify" };

export default function LoginPage() {
  return (
    <AuthCard title="Welcome back" description="Log in to see your calendar.">
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
