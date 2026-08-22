import type { CalendarEvent, ExtractedEvent } from "@/types";

// Normalize a title for duplicate comparison
function normalize(title: string): string {
  return title.trim().toLowerCase().replace(/\s+/g, " ");
}

export interface MergeResult {
  toInsert: ExtractedEvent[];
  skippedCount: number;
}

// Existing events are never overwritten. Only events with a new title+date pair are added.
export function mergeExtractedEvents(
  extracted: ExtractedEvent[],
  existing: CalendarEvent[]
): MergeResult {
  const existingKeys = new Set(existing.map((e) => `${normalize(e.title)}|${e.event_date}`));
  const toInsert: ExtractedEvent[] = [];
  const seenInBatch = new Set<string>();

  for (const event of extracted) {
    const key = `${normalize(event.title)}|${event.date}`;
    if (existingKeys.has(key) || seenInBatch.has(key)) continue;
    seenInBatch.add(key);
    toInsert.push(event);
  }

  return { toInsert, skippedCount: extracted.length - toInsert.length };
}
