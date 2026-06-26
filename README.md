# Smart Note

A minimal, zen-inspired smart note-taking application powered by AI.

## Features
- **Premium Aesthetics**: Zen, minimal design with customizable themes (dark, light, blue, pink, slate) and handwriting fonts.
- **Smart AI Integration**: Built-in ports to connect your notes with local LLMs (Ollama, LMStudio) or Cloud APIs (Gemini, OpenAI) for semantic search, summarization, and auto-tagging.
- **Advanced Organization**: Organize notes via Folders, Tags, or visually on a Calendar.
- **Privacy First**: Secure important notes with password locking.
- **Exporting**: Share your thoughts or export them directly to PDF.

## Tech Stack
- **Frontend**: Next.js (App Router), TypeScript, Vanilla CSS, TanStack Query.
- **Backend**: NestJS, TypeScript, Prisma ORM, Zod.
- **Database**: PostgreSQL (Neon).
- **Authentication**: Auth0 + JWT.
- **Hosting Strategy**: Vercel (Frontend), Render (Backend).

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL instance running
- Auth0 Account

### 1. Backend Setup (`api/`)
```bash
cd api
npm install
```
Create a `.env` file based on `.env.example` and set your `DATABASE_URL` and Auth0 keys.
```bash
npx prisma db push
npm run start:dev
```

### 2. Frontend Setup (`web/`)
```bash
cd web
npm install
```
Create a `.env.local` file and add your Auth0 keys and the API URL.
```bash
npm run dev
```

Visit `http://localhost:3000` to view the app!

## Documentation
- [App User Guide](./docs/USER_GUIDE.md)
- [Privacy Policy](./docs/PRIVACY_POLICY.md)
