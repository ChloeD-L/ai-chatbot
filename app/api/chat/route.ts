import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4-turbo"),
    system: `You are a care workflow assistant specialized in disability and aged care. 
        Your task is to analyze care needs and generate structured workflows.
        When users describe care needs, use the generateCareWorkflow tool to create a detailed care plan.
        Always consider safety, compliance, and accessibility requirements.`,
    messages,
  });

  return result.toDataStreamResponse();
}
