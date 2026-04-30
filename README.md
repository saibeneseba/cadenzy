# Cadenzy

> **AI-native project management where the AI executes work, not just suggests it.**
> Speak naturally — the AI acts — your team sees it in real-time.

[![Status](https://img.shields.io/badge/status-in%20development-yellow)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()

---

## What is Cadenzy?

Cadenzy is an open-source project management tool inspired by Linear, but with **AI as a first-class citizen**. Instead of a chatbot pasted on the side, the AI can directly create tickets, move them across boards, run bulk actions, and analyze your workspace — all through natural language commands.

**The team that finds its cadence ships faster.** That's the idea.

## The "wow moment"

Open Cadenzy in two browser tabs:

1. In tab 1, hit `⌘K` and type:
   > *"Create a sprint to implement OAuth: research, backend, frontend, tests. Assign them to me, high priority."*
2. In tab 2, watch as 4 tickets appear in the board, animated, in real-time.

That's Cadenzy.

## Core capabilities

- 🏢 **Multi-tenant workspaces** with role-based access control (admin / member / viewer)
- 📋 **Projects and tickets** with rich descriptions, status, priority, labels, assignees
- 🎯 **Kanban board** with optimistic drag-and-drop
- ⚡ **Real-time collaboration** via WebSockets — see teammates' changes instantly
- ⌨️ **Command palette** (`⌘K`) and keyboard shortcuts everywhere
- 🔐 **Custom authentication** (JWT + refresh tokens) — no third-party auth services
- 🤖 **AI command interface** — natural language tool use that executes actions
- 📊 **AI weekly summary** — intelligent workspace briefings
- 🔍 **Semantic duplicate detection** with embeddings (no more "didn't we file this already?")
- ✨ **Auto-classification** — AI suggests priority, labels, assignees on new tickets

## Tech stack

### Frontend
React 18 · Vite · TypeScript · TanStack Query · Zustand · Tailwind CSS · dnd-kit · Tiptap · cmdk · Framer Motion · Vitest · Playwright

### Backend
Node.js · Fastify · TypeScript · Prisma · PostgreSQL + pgvector · Redis · Socket.io · Zod · BullMQ

### AI
Anthropic API (Claude Sonnet 4.6 + Haiku 4.5) · Voyage AI embeddings · Tool Use · Prompt caching · Streaming responses

### Infrastructure
Vercel (frontend) · Railway/Render (backend) · GitHub Actions (CI/CD) · Sentry (error tracking)

## Project status

🚧 **In active development.** Currently in planning + initial build phase.

See [PROJECT_BIBLE.md](./PROJECT_BIBLE.md) for the full product spec, architecture decisions, and roadmap.

## Why this project exists

Cadenzy is a **portfolio project** built to demonstrate:

- Modern fullstack architecture from scratch (no BaaS shortcuts)
- Real-time collaboration with WebSockets and Redis pub/sub
- AI integration that actually does work (tool use, not chatbots)
- Production-grade decisions: testing, CI/CD, observability, multi-tenancy
- Frontend craft: optimistic UI, accessibility, keyboard-first UX

It is not intended to compete with Linear, Jira, or Asana commercially.

## Documentation

- 📖 [PROJECT_BIBLE.md](./PROJECT_BIBLE.md) — Full product and technical spec
- 🚀 [GETTING_STARTED.md](./GETTING_STARTED.md) — How to get the project running
- 🧠 [DECISIONS.md](./DECISIONS.md) — Architecture decision records (ADRs)
- 📘 [GLOSSARY.md](./GLOSSARY.md) — Technical glossary

## License

MIT — see [LICENSE](./LICENSE)

## Author

Built by [@saibeneseba](https://github.com/saibeneseba) as a portfolio project to demonstrate modern fullstack + AI engineering practices.

---

> *"Cadenzy: the rhythm a team finds when it works in sync."*
