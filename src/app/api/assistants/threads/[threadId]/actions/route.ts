// import { openai } from "@/app/openai";

// // Send a new message to a thread
// export async function POST(request, { params: { threadId } }) {
//   const { toolCallOutputs, runId } = await request.json();

//   const stream = openai.beta.threads.runs.submitToolOutputsStream(
//     threadId,
//     runId,
//     // { tool_outputs: [{ output: result, tool_call_id: toolCallId }] },
//     { tool_outputs: toolCallOutputs }
//   );

//   return new Response(stream.toReadableStream());
// }

import { openai } from "@/app/openai";

// Send a new message to a thread
export async function POST(
  request: {
    json: () =>
      | PromiseLike<{ toolCallOutputs: any; runId: any }>
      | { toolCallOutputs: any; runId: any };
  },
  { params: { threadId } }: { params: { threadId: string } }
) {
  const { toolCallOutputs, runId } = await request.json();

  const stream = openai.beta.threads.runs.submitToolOutputsStream(
    threadId,
    runId,
    // { tool_outputs: [{ output: result, tool_call_id: toolCallId }] },
    { tool_outputs: toolCallOutputs }
  );

  return new Response(stream.toReadableStream());
}
