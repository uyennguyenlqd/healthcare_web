import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Empty, List, Spin } from "antd";

import { ChatBox } from "./chat-box";

interface Chat {
  _id: string;
  title: string;
}

export const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]); // State lưu danh sách các cuộc trò chuyện
  const [loading, setLoading] = useState<boolean>(true); // State kiểm tra trạng thái tải
  const { chatId } = useParams<{ chatId: string }>(); // Lấy chatId từ URL
  const router = useRouter();
  //TODO => NEED API GET LIST ALL THREADS
  // Fetch danh sách các cuộc trò chuyện
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch("/api/chats"); // Gọi API
        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu");
        }
        const data = await response.json();
        setChats(data); // Cập nhật danh sách chat vào state
      } catch (error) {
        console.error("Có lỗi xảy ra:", error);
      } finally {
        setLoading(false); // Kết thúc quá trình tải
      }
    };

    fetchChats(); // Gọi hàm fetch
  }, []); // Chỉ gọi khi component mount

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin size="large" /> {/* Hiển thị loading indicator của Ant Design */}
      </div>
    );
  }

  if (chats.length === 0) {
    return null; // Hiển thị thông báo nếu không có chat
  }

  return (
    <List
      className="chat-list"
      itemLayout="horizontal"
      dataSource={chats}
      renderItem={(chat) => (
        <ChatBox
          key={chat._id}
          chat={chat}
          selected={chat._id === chatId} // Chọn chat đã được chọn
        />
      )}
    />
  );
};
