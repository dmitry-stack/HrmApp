# HRM App

A lightweight recruiting CRM: manage candidates, move them through a Kanban-style deals board, and track pipeline value — all backed by Firebase.

# Deployment link

[pharmaceutical-app-nine.vercel.app](https://hrm-app-omega.vercel.app/)

## Features

- **Authentication** — Google sign-in via Firebase Auth, with protected routes and redirect-back-after-login support.
- **Candidates** — searchable, paginated candidate list with a create-candidate dialog and bulk selection.
- **Deals board** — Kanban-style pipeline grouped by project, with weighted/total pipeline summaries.
- **Add to Project** — bulk-assign selected candidates to a project directly from the candidates table.
- **Chat** — a simple in-app chat view.
- **Responsive UI** — desktop sidebar navigation and a mobile-friendly navbar.

## Tech Stack

- **React 19** + **TypeScript**

- **Vite** — build tool and dev server

- **TanStack Router** — file-based routing with typed search params and route context

- **TanStack Query** — server state, caching, and mutations

- **Firebase** — Auth (Google sign-in) and Firestore (data)

- **Tailwind CSS** + **shadcn/ui** (on top of **Base UI**) — styling and components

- **React Hook Form** — form state and validation

- **Sonner** — toast notifications

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with **Authentication** (Google provider) and **Firestore** enabled

### Setup

1. Clone the repo and install dependencies:

   ```bash
   git clone https://github.com/dmitry-stack/HrmApp.git
   cd HrmApp
   npm install
   ```

2. Copy the environment template and fill in your Firebase config:

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   VITE_FIREBASE_MEASUREMENT_ID=
   ```

   These values are available in your Firebase project settings under **Project settings → General → Your apps**.

3. Start the dev server:

   ```bash
   npm run dev
   ```

   The app runs at `http://localhost:5173` by default.

## Available Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the Vite dev server            |
| `npm run build`     | Type-check and build for production  |
| `npm run preview`   | Preview the production build locally |
| `npm run lint`      | Run ESLint                           |
| `npm run typecheck` | Run TypeScript in check-only mode    |

## Project sturcture

The project follows a Feature-Sliced Design-inspired structure:

```
src/
├── app/          # app-wide setup: routing, providers, global styles
├── pages/        # route-level page components
├── widgets/      # composite UI blocks (header, navbar, layout)
├── features/     # user interactions (add candidate, add to project, ...)
├── entities/     # domain objects (candidate, project, deal, session)
└── shared/       # reusable UI, utils, and API clients
```
