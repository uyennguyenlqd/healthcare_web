"use client";

import React, { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { SendHorizontal } from "lucide-react";
import { AssistantStream } from "openai/lib/AssistantStream";
// @ts-expect-error - no types for this yet
import { AssistantStreamEvent } from "openai/resources/beta/assistants/assistants";
import { RequiredActionFunctionToolCall } from "openai/resources/beta/threads/runs/runs";

import styles from "./chat.module.css";

type MessageProps = {
  role: "user" | "assistant" | "code";
  text: string;
  avatar?: string;
};

// const UserMessage = ({ text }: { text: string }) => {
//   return <div className={styles.userMessage}>{text}</div>;
// };

// const AssistantMessage = ({ text }: { text: string }) => {
//   return (
//     <div className={styles.assistantMessage}>
//       <Markdown>{text}</Markdown>
//     </div>
//   );
// };

// const CodeMessage = ({ text }: { text: string }) => {
//   return (
//     <div className={styles.codeMessage}>
//       {text.split("\n").map((line, index) => (
//         <div key={index}>
//           <span>{`${index + 1}. `}</span>
//           {line}
//         </div>
//       ))}
//     </div>
//   );
// };
const UserMessage = ({ text }: { text: string }) => {
  return <div className={styles.userMessage}>{text}</div>;
};

const CodeMessage = ({ text }: { text: string }) => {
  return (
    <div className={styles.codeMessage}>
      {text.split("\n").map((line, index) => (
        <div key={index}>
          <span>{`${index + 1}. `}</span>
          {line}
        </div>
      ))}
    </div>
  );
};
const AssistantMessage = ({
  text,
  avatar,
}: {
  text: string;
  avatar: string;
}) => {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {" "}
      <img
        src={avatar}
        alt="Assistant Avatar"
        style={{
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          marginTop: "12px",
        }}
      />
      <div className={styles.assistantMessage}>
        <Markdown>{text}</Markdown>
      </div>
    </div>
  );
};

const Message = ({ role, text, avatar }: MessageProps) => {
  switch (role) {
    case "user":
      return <UserMessage text={text} />;
    case "assistant":
      return <AssistantMessage text={text} avatar={"/icons/health_logo.png"} />;
    case "code":
      return <CodeMessage text={text} />;
    default:
      return null;
  }
};

type ChatProps = {
  functionCallHandler?: (
    toolCall: RequiredActionFunctionToolCall
  ) => Promise<string>;
};

const Chat = ({
  functionCallHandler = () => Promise.resolve(""), // default to return empty string
}: ChatProps) => {
  const [userInput, setUserInput] = useState("");
  // const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState<MessageProps[]>([]); // <-- Updated here
  const [displayResult, setDisplayResult] = useState(false);

  const [inputDisabled, setInputDisabled] = useState(false);
  const [threadId, setThreadId] = useState("");

  // automatically scroll to bottom of chat
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // };
  const scrollToBottom = () => {
    // Kiểm tra nếu có messagesEndRef và nó có element
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useEffect(() => {
    //scrollToBottom();
  }, [messages]);

  // create a new threadID when chat component created
  useEffect(() => {
    const createThread = async () => {
      const res = await fetch(`/api/assistants/threads`, {
        method: "POST",
      });
      const data = await res.json();
      setThreadId(data.threadId);
    };
    createThread();
  }, []);

  // Gửi tin nhắn
  const sendMessage = async (text: string) => {
    const response = await fetch(
      `/api/assistants/threads/${threadId}/messages`,
      {
        method: "POST",
        body: JSON.stringify({
          content: text,
        }),
      }
    );
    //const stream = AssistantStream.fromReadableStream(response.body);
    //handleReadableStream(stream);
    if (response.body) {
      const stream = AssistantStream.fromReadableStream(response.body);
      handleReadableStream(stream);
    } else {
      // Handle the case where response.body is null (optional)
      console.error("Response body is null");
    }
  };

  const submitActionResult = async (runId: any, toolCallOutputs: any) => {
    const response = await fetch(
      `/api/assistants/threads/${threadId}/actions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          runId: runId,
          toolCallOutputs: toolCallOutputs,
        }),
      }
    );
    if (response.body) {
      const stream = AssistantStream.fromReadableStream(response.body);
      handleReadableStream(stream);
    } else {
      console.error("Response body is null");
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    sendMessage(userInput);
    // Update messages state
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", text: userInput },
    ]);
    setDisplayResult(true); // Đảm bảo cập nhật giá trị displayResult
    setUserInput("");
    setInputDisabled(true);
    //scrollToBottom();
  };

  /* Stream Event Handlers */

  // textCreated - create new assistant message
  const handleTextCreated = () => {
    appendMessage("assistant", "");
  };

  // textDelta - append text to last assistant message
  // const handleTextDelta = (delta: { value: null; annotations: null }) => {
  //   if (delta.value != null) {
  //     appendToLastMessage(delta.value);
  //   }
  //   if (delta.annotations != null) {
  //     annotateLastMessage(delta.annotations);
  //   }
  // };
  const handleTextDelta = (delta: { value?: string; annotations?: any }) => {
    // Check if value is defined and not null before appending
    if (delta.value != null) {
      appendToLastMessage(delta.value); // Append the value to the last message
    }
    if (delta.annotations != null) {
      annotateLastMessage(delta.annotations); // Handle annotations if available
    }
  };

  // imageFileDone - show image in chat
  const handleImageFileDone = (image: { file_id: any }) => {
    appendToLastMessage(`\n![${image.file_id}](/api/files/${image.file_id})\n`);
  };

  // toolCallCreated - log new tool call
  const toolCallCreated = (toolCall: { type: string }) => {
    if (toolCall.type != "code_interpreter") return;
    appendMessage("code", "");
  };

  // toolCallDelta - log delta and snapshot for the tool call
  // const toolCallDelta = (
  //   delta: { type: string; code_interpreter: { input: any } },
  //   snapshot: any
  // ) => {
  //   if (delta.type != "code_interpreter") return;
  //   if (!delta.code_interpreter.input) return;
  //   appendToLastMessage(delta.code_interpreter.input);
  // };
  const toolCallDelta = (
    delta: { type: string; code_interpreter?: { input?: any } },
    snapshot: any
  ) => {
    // Check if the type is "code_interpreter" and if code_interpreter exists
    if (delta.type !== "code_interpreter" || !delta.code_interpreter) return;

    // Destructure and safely access input
    const { input } = delta.code_interpreter;

    // Proceed only if input exists
    if (input !== undefined) {
      appendToLastMessage(input);
    }
  };

  // handleRequiresAction - handle function call
  const handleRequiresAction = async (
    event: AssistantStreamEvent.ThreadRunRequiresAction
  ) => {
    const runId = event.data.id;
    const toolCalls = event.data.required_action.submit_tool_outputs.tool_calls;
    // loop over tool calls and call function handler
    const toolCallOutputs = await Promise.all(
      toolCalls.map(async (toolCall: RequiredActionFunctionToolCall) => {
        const result = await functionCallHandler(toolCall);
        return { output: result, tool_call_id: toolCall.id };
      })
    );
    setInputDisabled(true);
    submitActionResult(runId, toolCallOutputs);
  };

  // handleRunCompleted - re-enable the input form
  const handleRunCompleted = () => {
    setInputDisabled(false);
  };

  const handleReadableStream = (stream: AssistantStream) => {
    // messages
    stream.on("textCreated", handleTextCreated);
    stream.on("textDelta", handleTextDelta);

    // image
    stream.on("imageFileDone", handleImageFileDone);

    // code interpreter
    stream.on("toolCallCreated", toolCallCreated);
    stream.on("toolCallDelta", toolCallDelta);

    // events without helpers yet (e.g. requires_action and run.done)
    stream.on("event", (event) => {
      if (event.event === "thread.run.requires_action")
        handleRequiresAction(event);
      if (event.event === "thread.run.completed") handleRunCompleted();
    });
  };

  /*
    =======================
    === Utility Helpers ===
    =======================
  */

  const appendToLastMessage = (text: string) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
        text: lastMessage.text + text,
      };
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };

  // const appendMessage = (role: string, text: string) => {
  //   setMessages((prevMessages) => [...prevMessages, { role, text }]);
  // };
  const appendMessage = (role: "user" | "assistant" | "code", text: string) => {
    setMessages((prevMessages) => [...prevMessages, { role, text }]);
  };

  const annotateLastMessage = (annotations: any[]) => {
    setMessages((prevMessages) => {
      const lastMessage = prevMessages[prevMessages.length - 1];
      const updatedLastMessage = {
        ...lastMessage,
      };
      annotations.forEach(
        (annotation: {
          type: string;
          text: any;
          file_path: { file_id: any };
        }) => {
          if (annotation.type === "file_path") {
            updatedLastMessage.text = updatedLastMessage.text.replaceAll(
              annotation.text,
              `/api/files/${annotation.file_path.file_id}`
            );
          }
        }
      );
      return [...prevMessages.slice(0, -1), updatedLastMessage];
    });
  };
  const questions = [
    "How can I manage my stress and anxiety effectively?",
    "How can I improve my mental health and well-being?",
    "What are some strategies for coping with anxiety?",
    "How can I support someone who is struggling with depression?",
  ];
  const QuestionButton: React.FC<{ text: string; onClick: () => void }> = ({
    text,
    onClick,
  }) => {
    return (
      <button
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "12rem", // h-48
          padding: "1rem", // p-4
          border: "none",
          borderRadius: "1rem", // rounded-xl
          position: "relative",
          cursor: "pointer",
          transition: "background-color 0.3s",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          fontSize: "18px",
        }}
        onClick={onClick}
      >
        <p>{text}</p>
      </button>
    );
  };
  return (
    <div
      style={{
        maxWidth: "990px",
        display: "flex",
        flexDirection: `column${displayResult ? "-reverse" : ""}`,
        height: "100%",
        width: "100%",
        margin: "auto",
      }}
    >
      {!displayResult ? (
        <>
          <div
            style={{
              marginTop: "24px",
              marginBottom: "24px",
              fontSize: "3rem",
              fontWeight: 500,
              padding: "0 20px",
            }}
          >
            <p style={{ marginBottom: "36px" }}>
              <span
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "transparent",
                  backgroundClip: "text",
                  backgroundImage:
                    "linear-gradient(to right, #1677FF, #f472b6)",
                }}
              >
                Welcome to UTE Mental Health
              </span>
            </p>
            <p
              style={{
                marginTop: "24px",
                marginBottom: "36px",
              }}
            >
              How can I help you today?
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.25rem",
              padding: "1.25rem",
              height: "100vh",
            }}
          >
            {questions.map((question, index) => (
              <QuestionButton
                key={index}
                text={question}
                onClick={() => setUserInput(question)}
              />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.messages}>
          {messages.map((msg, index) => (
            <Message key={index} role={msg.role} text={msg.text} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
      {/* <div className={styles.messages}>
        {messages.map((msg, index) => (
          <Message key={index} role={msg.role} text={msg.text} />
        ))}
        <div ref={messagesEndRef} />
      </div> */}
      <form
        onSubmit={handleSubmit}
        className={`${styles.inputForm} ${styles.clearfix}`}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1.25rem",
              backgroundColor: "#f3f4f6",
              padding: "0.625rem 1.25rem",
              borderRadius: "45px",
              width: "100%",
            }}
          >
            <input
              type="text"
              // className={styles.input}
              style={{
                flex: 1,
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                padding: "8px",
                fontSize: "16px",
                color: "#6B7280",
              }}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Enter your question"
            />
            <button
              type="submit"
              disabled={inputDisabled}
              style={{ border: "none" }}
            >
              <SendHorizontal type="submit" size={24} />
            </button>
          </div>
          <p
            style={{
              color: "#9ca3af",
              fontSize: "15px",
              padding: "0.5rem",
              marginLeft: "4px",
            }}
          >
            UTE Health may show inaccurate information, including about
            individuals, so please double-check its responses. Your privacy is
            important to us.
          </p>
        </div>
      </form>
    </div>
  );
};

export default Chat;
