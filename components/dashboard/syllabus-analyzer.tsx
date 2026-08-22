"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Sparkles, Loader2, CheckCircle2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface AnalyzeResponse {
  insertedCount: number;
  skippedCount: number;
  totalExtracted: number;
}

const PLACEHOLDER = `Paste your syllabus here...

Example:
Week 6: Assignment 2 due October 3, covering chapters 5-7.
Week 8: Midterm exam on October 17, in class, closed book.
Lab section: Lab 3 report due October 24.`;

export function SyllabusAnalyzer() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const router = useRouter();

  async function handleAnalyze() {
    if (text.trim().length < 20) {
      toast.error("Paste your full syllabus text first");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Analysis failed");
      setResult(json as AnalyzeResponse);
      toast.success(`Added ${json.insertedCount} new event${json.insertedCount === 1 ? "" : "s"}`);
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analyze a syllabus</CardTitle>
        <CardDescription>
          Paste the full text of a course syllabus. New dates merge into your calendar — nothing existing gets overwritten.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={PLACEHOLDER}
          rows={12}
          className="resize-y font-mono text-sm"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">{text.length.toLocaleString()} characters</p>
          <Button onClick={handleAnalyze} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Analyze
              </>
            )}
          </Button>
        </div>

        {result && (
          <div className="flex items-start gap-3 rounded-xl border border-border bg-secondary/50 p-4">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
            <div className="text-sm">
              <p className="font-medium">
                Found {result.totalExtracted} event{result.totalExtracted === 1 ? "" : "s"}
              </p>
              <p className="text-muted-foreground">
                {result.insertedCount} added to your calendar
                {result.skippedCount > 0 && `, ${result.skippedCount} already existed and were skipped`}.{" "}
                <a href="/calendar" className="text-primary hover:underline">
                  View calendar →
                </a>
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
