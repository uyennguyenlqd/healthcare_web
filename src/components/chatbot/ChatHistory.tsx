import { useEffect, useState } from "react";
type ChatHistoryProps = {
  threadId: string;
};
type Message = {
  role: string;
  content: string;
};
const ChatHistory: React.FC<ChatHistoryProps> = ({ threadId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch(`/api/chat/${threadId}`, {
          method: "POST",
          body: JSON.stringify({ content: "" }), // Gửi nội dung trống để chỉ lấy lịch sử
        });
        const data = await response.json();
        setMessages(data.messages); // Lưu tin nhắn vào state
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [threadId]);

  if (loading) return <div>Loading chat history...</div>;

  return (
    <div>
      {messages.length === 0 ? (
        <p>No messages in this chat.</p>
      ) : (
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <strong>{message.role}:</strong> {message.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChatHistory;
