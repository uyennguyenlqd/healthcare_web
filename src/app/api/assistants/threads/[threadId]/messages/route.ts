import { assistantId } from "@/app/assistant-config";
import { openai } from "@/app/openai";

export const runtime = "nodejs";

// Send a new message to a thread
export async function POST(
  request: { json: () => PromiseLike<{ content: any }> | { content: any } },
  { params: { threadId } }: { params: { threadId: string } }
) {
  const { content } = await request.json();

  await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  });

  const stream = openai.beta.threads.runs.stream(threadId, {
    assistant_id: assistantId,
  });
  // const threadMessages = await openai.beta.threads.messages.list(threadId);
  // // Log danh sách messages
  // console.log(
  //   "Thread Messages for threadId:",
  //   threadId,
  //   JSON.stringify(threadMessages, null, 2)
  // );

  return new Response(stream.toReadableStream());
}
