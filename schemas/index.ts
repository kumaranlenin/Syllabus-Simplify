import { z } from "zod";

// Auth forms
export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterInput = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

// Event category enum shared across schemas
export const eventCategorySchema = z.enum(["assignment", "exam", "lab", "project", "quiz"]);

// One event extracted by Mistral
export const extractedEventSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).default(""),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  category: eventCategorySchema,
});

// Full array returned by Mistral
export const extractedEventsSchema = z.array(extractedEventSchema).max(200);
export type ExtractedEventsInput = z.infer<typeof extractedEventsSchema>;

// Analyze request body
export const analyzeRequestSchema = z.object({
  text: z.string().min(20, "Paste your full syllabus text first").max(50000),
});

// Manual event create/edit form
export const eventFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000).optional().default(""),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a valid date"),
  category: eventCategorySchema,
});
export type EventFormInput = z.infer<typeof eventFormSchema>;
