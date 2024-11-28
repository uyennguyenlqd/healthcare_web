// export let assistantId = ""; // set your assistant ID here

// if (assistantId === "") {
//   assistantId = process.env.OPENAI_ASSISTANT_ID;
// }
export let assistantId: string = ""; // set your assistant ID here

// Fallback to process.env.OPENAI_ASSISTANT_ID or an empty string if undefined
assistantId = process.env.OPENAI_ASSISTANT_ID ?? assistantId;
