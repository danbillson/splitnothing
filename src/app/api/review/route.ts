import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, messageId }: { messages: UIMessage[]; messageId: string } =
    await req.json();

  const focusMessage = messages.find((m) => m.id === messageId);

  if (!focusMessage) {
    return new Response(
      JSON.stringify({ error: "Message with the given id not found." }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const result = streamText({
    model: openai("gpt-4.1-mini"),
    system: systemPrompt(focusMessage),
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}

function systemPrompt(focusMessage: UIMessage) {
  // Extract text from the message parts for clarity in the prompt
  const focusText = focusMessage.parts
    .filter((p) => p.type === "text")
    .map((p) => (p.type === "text" ? p.text : ""))
    .join(" ");

  return `
You are a negotiation coach trained in the techniques from "Never Split the Difference" by Chris Voss.

You will be given the full chat history and a specific user message to review (shown below).

---
Message to review:
"${focusText}"
---

Your feedback must include:
- What the user did well and what could be improved in that message
- Missed opportunities for negotiation techniques
- A suggested optimal or improved reply (write it out)
- An explanation of why your suggestion is better, and what negotiation techniques it uses (e.g., tactical empathy, mirroring, labeling, calibrated questions, "no"-oriented questions, accusation audit, effective pauses)

Be concise, practical, and specific. Respond like a coach reviewing a real negotiation.
`;
}
