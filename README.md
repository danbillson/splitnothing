# splitnothing

Negotiation training app inspired by "Never Split the Difference" (Chris Voss). Practice real-world negotiation scenarios with AI-powered roleplay and get feedback on your technique.

---

## Features

- **Scenario-based negotiation**: Practice with realistic AI counterparts (car dealer, manager, landlord, etc.)
- **Vercel AI SDK v5**: Uses `useChat()` with streaming for natural, real-time conversation
- **Prompt injection**: Each session includes scenario + negotiation system prompt
- **Negotiation feedback**: (Planned) Get coaching on your last message using Vossian techniques (mirroring, labeling, tactical empathy, etc.)
- **Simple UX**: Chat window, scenario prompt, (future: scenario picker, feedback toggle)

---

## Tech Stack

- **Framework**: Next.js (App Router)
- **AI SDK**: Vercel AI SDK v5 (alpha)
- **LLMs**: OpenAI
- **Runtime**: Edge functions for low-latency streaming
- **UI**: TailwindCSS, shadcn/ui and Kibo UI

---

## Getting Started

1. **Install dependencies**

   ```bash
   bun install # or npm install, yarn, pnpm
   ```

2. **Set environment variables**

   Create a `.env.local` file with:

   ```env
   OPENAI_API_KEY=sk-...
   ```

3. **Run the dev server**

   ```bash
   bun dev # or npm run dev, yarn dev, pnpm dev
   ```

4. **Open** [http://localhost:3000/chat](http://localhost:3000/chat)

---

## Usage

- Start a chat and describe the negotiation scenario you want to practice (e.g., "negotiating a raise").
- The AI will roleplay as your counterpart, using realistic negotiation tactics.
- (Planned) Toggle feedback to get coaching on your negotiation technique.

---

## Environment Variables

- `OPENAI_API_KEY` – Your OpenAI API key

---

## Example Scenarios

- Negotiating the price of a used car
- Requesting a raise from your manager
- Lowering rent with your landlord
- Freelance client contract discussion
- Corporate partnership terms
