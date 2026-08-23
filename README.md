<div align="center">

# 📚 Syllabus Simplify

### Turn any course syllabus into a fully-scheduled academic calendar — in seconds.

**Syllabus Simplify** uses AI to automatically extract deadlines, exams, and assignments from syllabus text and converts them into ready-to-import calendar events. Just paste your syllabus text in — no file uploads, no manual parsing setup.

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

**Syllabus Simplify** solves this by letting you paste your syllabus text directly into a text box and automatically:

1. Sending that raw text to an AI model for analysis
2. Using AI to identify and structure every date-bound academic event
3. Storing that data securely, scoped to your account
4. Exporting it as a standard `.ics` file you can drop straight into Google Calendar, Apple Calendar, or Outlook

No manual data entry. No missed deadlines.

---

## ✨ Core Features

<table>
<tr>
<td width="50%" valign="top">

### 📝 Paste-and-Go Text Input

No file uploads or parsing pipelines required — simply paste your syllabus text into the app's text box and let the AI take it from there.

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

| Layer                | Technology                               | Purpose                                                       |
| -------------------- | ---------------------------------------- | ------------------------------------------------------------- |
| **Frontend**         | Next.js (React)                          | Server-rendered, performant UI framework                      |
| **Frontend**         | TypeScript                               | Type-safe application logic end-to-end                        |
| **Frontend**         | Tailwind CSS                             | Utility-first styling                                         |
| **Frontend**         | shadcn/ui                                | Accessible, composable UI component library                   |
| **Backend / API**    | Next.js API Routes / Server Actions      | Handles text submission and AI extraction requests            |
| **Database**         | Supabase (PostgreSQL)                    | Persistent storage for users, syllabi, and extracted events   |
| **Auth & Security**  | Supabase Auth + Row Level Security (RLS) | User authentication and per-user data isolation               |
| **AI / ML**          | Mistral AI API                           | Natural language understanding for deadline/event extraction  |
| **AI / ML**          | Zod                                      | Runtime schema validation of AI-generated structured output   |
| **Calendar Export**  | ICS / iCalendar generation               | Produces `.ics` files compatible with all major calendar apps |
| **DevOps / Hosting** | Vercel                                   | CI/CD and production deployment                               |

</details>

---

## 🔄 Architecture & Workflow

Here's how a syllabus travels from pasted text to a synced calendar event:

```text
┌──────────────────────────┐
│  1. Text Input             │  User pastes their syllabus text directly
│                             │  into the app's text box (no file upload)
└─────────┬───────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│  2. AI Extraction (Mistral API)   │  The pasted text is sent to Mistral AI,
│                                    │  prompted to identify dates, exams,
│                                    │  assignments, and deadlines
└─────────┬──────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│  3. Schema Validation (Zod)       │  AI's JSON response is validated
│                                    │  against a strict Zod schema to
│                                    │  guarantee type-safe, clean data
└─────────┬──────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│  4. Database Storage (Supabase)   │  Validated events are persisted in
│                                    │  PostgreSQL, scoped to the user via
│                                    │  Row Level Security policies
└─────────┬──────────────────────────┘
          │
          ▼
┌──────────────────────────────────┐
│  5. Calendar Export (.ics)        │  User triggers export; events are
│                                    │  serialized into a standards-compliant
│                                    │  iCalendar file for download
└──────────────────────────────────┘
```

**In short:** `Pasted Text → AI Extraction → Validated JSON → Database → .ics Export`

---

## 🚀 Getting Started

Follow these steps to run Syllabus Simplify locally.

### Prerequisites

Make sure you have the following installed and ready:

- **Node.js** `v18.x` or later
- **npm**, **pnpm**, or **yarn**
- A **[Supabase](https://supabase.com/)** account and project (free tier works)
- A **[Mistral AI](https://mistral.ai/)** API key

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

# ── JWT Secret (Used to sign/verify server-side tokens) ────────────────────────────────────────────
JWT_SECRET=your_generated_random_string_here
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
