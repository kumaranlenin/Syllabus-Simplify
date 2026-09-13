import { extractedEventsSchema } from "@/schemas";
import type { ExtractedEvent } from "@/types";

const MISTRAL_URL = "https://api.mistral.ai/v1/chat/completions";
const MODEL = "mistral-small-latest";

const SYSTEM_PROMPT = `You are an assistant that extracts academic deadlines from a course syllabus.

Read the syllabus text and find every dated event: assignments, exams, midterms, finals, labs, projects, and quizzes.

Respond with ONLY a JSON object of this exact shape, nothing else, no markdown fences:
{"events": [{"title": string, "description": string, "date": "YYYY-MM-DD", "category": "assignment" | "exam" | "lab" | "project" | "quiz"}]}

Rules:
- "date" must be a real calendar date in YYYY-MM-DD format. Infer the year from context; assume the current academic year if not stated.
- "category" must be exactly one of the five listed values. Pick the closest match.
- "description" is a short one-sentence summary (chapters, topics, format). Use an empty string if nothing useful is stated.
- Skip vague mentions with no date (e.g. "readings due weekly").
- If no events are found, return {"events": []}.`;

interface MistralResponse {
  choices: { message: { content: string } }[];
  usage?: { total_tokens: number };
}

async function callMistral(text: string): Promise<{ raw: string; tokens: number }> {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) throw new Error("MISTRAL_API_KEY is not configured");

  const res = await fetch(MISTRAL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: text },
      ],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Mistral API error (${res.status}): ${body}`);
  }

  const data = (await res.json()) as MistralResponse;
  const raw = data.choices[0]?.message.content ?? "";
  const tokens = data.usage?.total_tokens ?? 0;
  return { raw, tokens };
}

// Strip accidental markdown fences before parsing
function cleanJson(raw: string): string {
  return raw.trim().replace(/^```json/i, "").replace(/^```/, "").replace(/```$/, "").trim();
}

export interface ExtractionResult {
  events: ExtractedEvent[];
  tokensUsed: number;
}

// Extracts events from syllabus text. Retries once if the model returns invalid JSON.
export async function extractEventsFromSyllabus(text: string): Promise<ExtractionResult> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const { raw, tokens } = await callMistral(text);
      const parsed = JSON.parse(cleanJson(raw));
      const events = extractedEventsSchema.parse(parsed.events ?? []);
      return { events, tokensUsed: tokens };
    } catch (err) {
      lastError = err;
    }
  }

  throw new Error(
    `Could not extract valid events after retrying: ${
      lastError instanceof Error ? lastError.message : "unknown error"
    }`
  );
}
