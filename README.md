# Syllabus Simplify

Paste a syllabus, get a calendar. Syllabus Simplify uses Mistral AI to read course
syllabi and extract every assignment, exam, lab, project, and quiz into a calendar
you can browse, edit, and export as an `.ics` file.

## Project Overview

Students receive a syllabus and copy every deadline into a planner by hand. Syllabus
Simplify automates that: paste the syllabus text, and an LLM extracts structured
events, which are merged into a running calendar without ever overwriting events you
already added or edited.

## Features

- Email/password and Google OAuth authentication (Supabase Auth)
- AI-powered date extraction from raw syllabus text (Mistral AI)
- Zod-validated, retrying extra<div align="center">

# 📚 Syllabus Simplify

### Turn any course syllabus into a fully-scheduled academic calendar — in seconds.

**Syllabus Simplify** uses AI-powered document parsing to automatically extract deadlines, exams, and assignments from PDF syllabi and converts them into ready-to-import calendar events.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Mistral AI](https://img.shields.io/badge/Mistral_AI-FA520F?style=for-the-badge&logo=mistralai&logoColor=white)](https://mistral.ai/)

[![Vercel Deploy](https://img.shields.io/badge/deployed%20on-vercel-black?style=flat-square&logo=vercel)](https://syllabus-simplify.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/kumaranlenin/Syllabus-Simplify?style=flat-square&logo=github)](https://github.com/kumaranlenin/Syllabus-Simplify/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/kumaranlenin/Syllabus-Simplify?style=flat-square)](https://github.com/kumaranlenin/Syllabus-Simplify/issues)

**[🚀 Live Demo](https://syllabus-simplify.vercel.app/)** &nbsp;•&nbsp; **[📦 Repository](https://github.com/kumaranlenin/Syllabus-Simplify)** &nbsp;•&nbsp; **[🐛 Report Bug](https://github.com/kumaranlenin/Syllabus-Simplify/issues)** &nbsp;•&nbsp; **[✨ Request Feature](https://github.com/kumaranlenin/Syllabus-Simplify/issues)**

</div>

---

## 📖 Table of Contents

- [About The Project](#-about-the-project)
- [Core Features](#-core-features)
- [Tech Stack](#-tech-stack)
- [Architecture & Workflow](#-architecture--workflow)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Project Structure](#-project-structure)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Author & Contact](#-author--contact)

---

## 🎯 About The Project

Every semester, students receive dense, unstructured PDF syllabi packed with critical dates — exams, assignment due dates, project milestones — buried in paragraphs of text. Manually transcribing these into a calendar is tedious and error-prone.

**Syllabus Simplify** solves this by letting you upload a syllabus PDF and automatically:

1. Extracting the raw text/content from the document
2. Using AI to identify and structure every date-bound academic event
3. Storing that data securely, scoped to your account
4. Exporting it as a standard `.ics` file you can drop straight into Google Calendar, Apple Calendar, or Outlook

No manual data entry. No missed deadlines.

---

## ✨ Core Features

<table>
<tr>
<td width="50%" valign="top">

### 📄 Automated PDF Parsing

Upload any syllabus PDF and let the parsing engine extract clean, structured text — even from multi-column or inconsistently formatted documents.

</td>
<td width="50%" valign="top">

### 🤖 AI-Powered Extraction

Leverages the **Mistral AI API** combined with **Zod schema validation** to reliably extract structured JSON — exam dates, assignment deadlines, and event titles — with type-safe guarantees on every response.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### 📅 One-Click Calendar Export

Instantly generate a standards-compliant **`.ics` / iCalendar** file from extracted events, ready to import into any calendar app on any platform.

</td>
<td width="50%" valign="top">

### 🔒 Secure Multi-Tenant Data Isolation

Built on **Supabase Row Level Security (RLS)**, ensuring every user's syllabi and extracted data remain fully isolated and private at the database level.

</td>
</tr>
</table>

---

## 🛠 Tech Stack

<details open>
<summary><b>Click to expand full technology breakdown</b></summary>

<br>

| Layer                   | Technology                               | Purpose                                                       |
| ----------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| **Frontend**            | Next.js (React)                          | Server-rendered, performant UI framework                      |
| **Frontend**            | TypeScript                               | Type-safe application logic end-to-end                        |
| **Frontend**            | Tailwind CSS                             | Utility-first styling                                         |
| **Frontend**            | shadcn/ui                                | Accessible, composable UI component library                   |
| **Backend / API**       | Next.js API Routes / Server Actions      | Handles upload, parsing, and extraction requests              |
| **Database**            | Supabase (PostgreSQL)                    | Persistent storage for users, syllabi, and extracted events   |
| **Auth & Security**     | Supabase Auth + Row Level Security (RLS) | User authentication and per-user data isolation               |
| **AI / ML**             | Mistral AI API                           | Natural language understanding for deadline/event extraction  |
| **AI / ML**             | Zod                                      | Runtime schema validation of AI-generated structured output   |
| **Document Processing** | LlamaParse / Document Extractors         | Converts raw PDF syllabi into machine-readable text           |
| **Calendar Export**     | ICS / iCalendar generation               | Produces `.ics` files compatible with all major calendar apps |
| **DevOps / Hosting**    | Vercel                                   | CI/CD and production deployment                               |

</details>

---

## 🔄 Architecture & Workflow

Here's how a syllabus travels from a raw PDF to a synced calendar event:

```text
┌──────────────────┐
│  1. PDF Upload    │  User uploads a syllabus PDF via the web UI
└─────────┬─────────┘
          │
          ▼
┌──────────────────────────┐
│  2. Document Parsing      │  LlamaParse / Document Extractors convert
│                            │  the PDF into clean, structured plain text
└─────────┬─────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│  3. AI Extraction (Mistral API)   │  Parsed text is sent to Mistral AI,
│                                    │  prompted to identify dates, exams,
│                                    │  assignments, and deadlines
└─────────┬──────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│  4. Schema Validation (Zod)       │  AI's JSON response is validated
│                                    │  against a strict Zod schema to
│                                    │  guarantee type-safe, clean data
└─────────┬──────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│  5. Database Storage (Supabase)   │  Validated events are persisted in
│                                    │  PostgreSQL, scoped to the user via
│                                    │  Row Level Security policies
└─────────┬──────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│  6. Calendar Export (.ics)        │  User triggers export; events are
│                                    │  serialized into a standards-compliant
│                                    │  iCalendar file for download
└──────────────────────────────────┘
```

**In short:** `PDF → Text → AI Extraction → Validated JSON → Database → .ics Export`

---

## 🚀 Getting Started

Follow these steps to run Syllabus Simplify locally.

### Prerequisites

Make sure you have the following installed and ready:

- **Node.js** `v18.x` or later
- **npm**, **pnpm**, or **yarn**
- A **[Supabase](https://supabase.com/)** account and project (free tier works)
- A **[Mistral AI](https://mistral.ai/)** API key
- (Optional) A **LlamaParse** API key if using LlamaCloud for document extraction

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kumaranlenin/Syllabus-Simplify.git
   cd Syllabus-Simplify
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```

### Environment Variables

Create a `.env.local` file in the project root and populate it with your own keys:

```env
# ── Supabase ──────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# ── AI / Mistral ──────────────────────────────────────────
MISTRAL_API_KEY=your_mistral_api_key

# ── Document Parsing ──────────────────────────────────────
LLAMA_CLOUD_API_KEY=your_llamaparse_api_key

# ── App Config ────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> ⚠️ **Never commit `.env.local` to version control.** Ensure it's listed in your `.gitignore`.

### Running Locally

```bash
npm run dev
```

The app will be available at **[http://localhost:3000](http://localhost:3000)**.

<details>
<summary><b>Other useful scripts</b></summary>

```bash
npm run build      # Create a production build
npm run start      # Run the production build locally
npm run lint       # Lint the codebase
```

</details>

---

## 📂 Project Structure

<details>
<summary><b>Click to expand a high-level directory overview</b></summary>

```text
Syllabus-Simplify/
├── app/                  # Next.js app router pages & API routes
├── components/           # Reusable React + shadcn/ui components
├── lib/                  # Supabase client, Mistral client, ICS generator, utils
├── schemas/              # Zod schemas for AI-extracted structured data
├── public/               # Static assets
├── styles/               # Tailwind/global styles
├── .env.local            # Local environment variables (not committed)
└── package.json
```

</details>

---

## 🗺 Roadmap

Planned enhancements for future releases:

- [ ] 🔗 **Google Calendar OAuth Integration** — direct one-click sync instead of manual `.ics` import
- [ ] 📚 **Multi-file Bulk Processing** — upload and process an entire semester's syllabi at once
- [ ] 🎓 **Direct LMS Integration** — native connectors for Canvas, Brightspace, and Moodle
- [ ] 📱 **Mobile-optimized PWA experience**
- [ ] 🔔 **Smart reminders & notification support**

Have an idea? [Open a feature request →](https://github.com/kumaranlenin/Syllabus-Simplify/issues)

---

## 🤝 Contributing

Contributions are what make the open-source community amazing. Any contributions you make are **greatly appreciated**.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](./LICENSE) for more information.

```
MIT License

Copyright (c) 2026 Kumaran Lenin Vijayalakshmi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files, to deal in the Software
without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, subject to the inclusion of the above copyright notice in all
copies or substantial portions of the Software.
```

---

## 👤 Author & Contact

**Kumaran Lenin**

- GitHub: [@kumaranlenin](https://github.com/kumaranlenin)
- Project Link: [Syllabus Simplify](https://github.com/kumaranlenin/Syllabus-Simplify)
- Live App: [syllabus-simplify.vercel.app](https://syllabus-simplify.vercel.app/)

<div align="center">

### ⭐ If this project helped you, consider giving it a star!

</div>
ction pipeline
- Non-destructive merge: new events are added, existing and manual events are never
  touched
- Full calendar view (month grid, search, category filters, click-to-edit,
  click-to-create)
- `.ics` export compatible with Google Calendar, Apple Calendar, and Outlook
- Dashboard stats and upcoming deadlines
- Dark mode, responsive layout, loading/empty/error states
- Row-level security on every table

## Tech Stack

**Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS, Lucide Icons,
react-big-calendar

**Backend:** Next.js Route Handlers, Supabase (Postgres + Auth), Mistral AI API

**Libraries:** @supabase/supabase-js, @supabase/ssr, react-hook-form, zod, date-fns,
ical-generator, sonner

## Folder Structure

```
app/                    Routes (App Router)
  api/                  Route handlers (analyze, events, ics)
  dashboard/            Dashboard page
  calendar/             Calendar page
  login/ register/      Auth pages
  about/                About / FAQ page
components/
  ui/                   Design-system primitives (button, card, dialog, ...)
  layout/               Navbar, footer, theme provider
  marketing/            Landing page sections
  auth/                 Login/register forms, Google button
  dashboard/            Syllabus analyzer, stats, upcoming deadlines
  calendar/             Calendar view, toolbar, event form/modal
lib/supabase/           Browser, server, admin clients + middleware
services/               Mistral integration, event merge logic
schemas/                Zod schemas
types/                  Shared TypeScript types
hooks/                  Client-side data hooks
supabase/migrations/    SQL schema, indexes, RLS policies
```

## Installation

```bash
npm install
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in each value:

```bash
cp .env.example .env.local
```

| Variable                        | Where to find it                                                                |
| ------------------------------- | ------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Supabase project → Settings → API → Project URL                                 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API → anon public key                             |
| `SUPABASE_SERVICE_ROLE_KEY`     | Supabase project → Settings → API → service_role key (server-only, keep secret) |
| `MISTRAL_API_KEY`               | [console.mistral.ai](https://console.mistral.ai) → API Keys                     |
| `JWT_SECRET`                    | Any long random string, e.g. `openssl rand -hex 32`                             |

## Supabase Setup

1. Create a project at [supabase.com](https://supabase.com).
2. Copy the project URL and keys into `.env.local`.
3. Run the SQL in **Database Setup** below.
4. Enable the Google provider under Authentication → Providers (see **Google OAuth
   Setup**).
5. Under Authentication → URL Configuration, add your app's URL (e.g.
   `http://localhost:3000/auth/callback`) to the redirect URL allow-list.

## Database Setup / SQL Setup / RLS Setup

Open the Supabase SQL editor and run `supabase/migrations/0001_init.sql`. It creates:

- `profiles`, `syllabi`, `events`, `processing_logs` tables
- Indexes on `events.user_id` and `events.event_date`
- Row-level security, enabled on every table, with per-user `SELECT`/`INSERT`/
  `UPDATE`/`DELETE` policies scoped to `auth.uid() = user_id`
- A trigger that creates a `profiles` row automatically when a user signs up
- A trigger that keeps `events.updated_at` current

## Google OAuth Setup

1. In the [Google Cloud Console](https://console.cloud.google.com/), create an OAuth
   client (Web application).
2. Add `https://<your-supabase-project>.supabase.co/auth/v1/callback` as an
   authorized redirect URI.
3. In Supabase → Authentication → Providers → Google, paste the client ID and
   secret, and enable the provider.

## Mistral Setup

1. Create an account at [console.mistral.ai](https://console.mistral.ai).
2. Generate an API key and add it as `MISTRAL_API_KEY`.
3. No further configuration is needed; the app calls `mistral-large-latest` with a
   JSON-only system prompt and validates the response with Zod.

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. Sign up, then paste a syllabus on the dashboard to
see it land on your calendar.

## Deployment

1. Push the repository to GitHub.
2. Import it into [Vercel](https://vercel.com) (or your platform of choice).
3. Add all variables from `.env.example` in the project's environment settings.
4. Update the Supabase redirect URL allow-list and the Google OAuth redirect URI to
   include your production domain.
5. Deploy.

## Future Improvements

- Supabase realtime subscriptions so the calendar updates live across tabs/devices
- Drag-and-drop rescheduling on the calendar grid
- Multi-syllabus history view with per-upload rollback
- Shareable, read-only calendar links for study groups
- Push/email reminders ahead of deadlines
