export type EventCategory = "assignment" | "exam" | "lab" | "project" | "quiz";

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface Syllabus {
  id: string;
  user_id: string;
  original_text: string;
  uploaded_at: string;
}

export interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  category: EventCategory;
  event_date: string; // ISO date (yyyy-MM-dd)
  is_manual: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProcessingLog {
  id: string;
  user_id: string;
  status: "success" | "failed" | "retried";
  tokens_used: number | null;
  created_at: string;
}

export interface ExtractedEvent {
  title: string;
  description: string;
  date: string;
  category: EventCategory;
}

export const CATEGORY_LABELS: Record<EventCategory, string> = {
  assignment: "Assignment",
  exam: "Exam",
  lab: "Lab",
  project: "Project",
  quiz: "Quiz",
};

export const CATEGORY_COLORS: Record<EventCategory, string> = {
  assignment: "#3d4de0",
  exam: "#e0473d",
  lab: "#0f9e8f",
  project: "#8c4de0",
  quiz: "#f2a93b",
};
