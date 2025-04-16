# Care Workflow Assistant

This is a Next.js project powered by the [Vercel AI SDK](https://sdk.vercel.ai) and OpenAI (GPT-4o), providing a generative UI experience that supports:

- 🤖 **General AI Chat** powered by OpenAI
- 👩‍⚕️ **Caregiver task assistant** that converts natural language into structured care workflows
- ✨ **Generative UI** integration via tool calling (function calling)

## Features

- ✨ **Built with Vercel AI SDK's Generative UI** — uses `useChat` and tool calling to dynamically generate structured UI from model responses
- ⚡ **OpenAI GPT-4o integration** for both general-purpose chat and task-specific logic
- 🧠 **Caregiver assistant** that transforms natural language into actionable workflows
- 🔧 **Tool-based architecture** with structured task generation via Zod schema validation
- 🎨 Clean, responsive design using **Tailwind CSS** and **shadcn/ui**
- ⚙️ Built with **Next.js App Router** for modern routing and layout structure

## 💡 Use Case

Caregivers can describe their tasks in plain language (e.g., _"Morning routine for John: medication, breakfast, and mobility exercises"_) and receive a structured task workflow including:

- Task title and description
- Status and priority
- Required equipment
- Safety and compliance notes

## 🚀 Getting Started

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

## Project Structure

```bash
/app
├── layout.tsx                # App-wide layout
├── page.tsx                  # General chat page
├── care-workflow/page.tsx    # Care assistant UI - Generative UI
├── api/
│   ├── care-workflow/route.ts # Task generator (tool calling)
│   └── chat/route.ts         # General chat handler

/components
├── care-workflow/            # Care assistant components
│   ├── CareWorkflow.tsx      # Generative UI
│   └── Task.tsx
├── chat/Chat.tsx             # General chat UI
├── layout/                   # Shared layout components
├── ui/                       # Base UI primitives (button, card, input, label)

lib/ai/utils.ts               # AI-related helpers

public/favicon.ico            # Static assets
styles/globals.css            # Tailwind CSS
```
