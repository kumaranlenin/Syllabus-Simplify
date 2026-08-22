import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { analyzeRequestSchema } from "@/schemas";
import { extractEventsFromSyllabus } from "@/services/mistral";
import { mergeExtractedEvents } from "@/services/events";
import type { CalendarEvent } from "@/types";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = analyzeRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const { text } = parsed.data;

  // Extract events with Mistral
  let extraction;
  try {
    extraction = await extractEventsFromSyllabus(text);
  } catch (err) {
    await supabase.from("processing_logs").insert({
      user_id: user.id,
      status: "failed",
      tokens_used: 0,
    });
    const message = err instanceof Error ? err.message : "Extraction failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  // Store the raw syllabus text
  const { error: syllabusError } = await supabase.from("syllabi").insert({
    user_id: user.id,
    original_text: text,
  });
  if (syllabusError) {
    return NextResponse.json({ error: syllabusError.message }, { status: 500 });
  }

  // Fetch existing events to merge against
  const { data: existing, error: fetchError } = await supabase
    .from("events")
    .select("*")
    .eq("user_id", user.id);
  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  const { toInsert, skippedCount } = mergeExtractedEvents(
    extraction.events,
    (existing ?? []) as CalendarEvent[]
  );

  let inserted: CalendarEvent[] = [];
  if (toInsert.length > 0) {
    const { data, error: insertError } = await supabase
      .from("events")
      .insert(
        toInsert.map((e) => ({
          user_id: user.id,
          title: e.title,
          description: e.description,
          category: e.category,
          event_date: e.date,
          is_manual: false,
        }))
      )
      .select("*");
    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }
    inserted = (data ?? []) as CalendarEvent[];
  }

  await supabase.from("processing_logs").insert({
    user_id: user.id,
    status: "success",
    tokens_used: extraction.tokensUsed,
  });

  return NextResponse.json({
    inserted,
    insertedCount: inserted.length,
    skippedCount,
    totalExtracted: extraction.events.length,
  });
}
