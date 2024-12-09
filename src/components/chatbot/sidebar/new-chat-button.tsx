import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons"; // Import các icon từ Ant Design
import { Button } from "antd"; // Import Button từ Ant Design

export const NewChatButton = () => {
  // Hàm xử lý khi người dùng nhấn nút "New Chat"
  const handleAdd = async () => {
    try {
      // Gửi yêu cầu POST đến API để tạo chat mới
      const response = await fetch(`/api/assistants/threads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Truyền dữ liệu (nếu cần thiết)
      });

      // Kiểm tra nếu yêu cầu thành công
      if (response.ok) {
        console.log("New chat created successfully!");
      } else {
        console.error("Failed to create new chat");
      }
    } catch (error) {
      console.error("Error creating new chat:", error);
    }
  };

  return (
    <Button
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "inherit",
        padding: 0,
        cursor: "pointer",
      }}
      onClick={handleAdd}
    >
      <PlusCircleOutlined style={{ width: "1.25rem", height: "1.25rem" }} />

      <p
        style={{ fontWeight: "600", textAlign: "start", marginLeft: "0.75rem" }}
      >
        New Chat
      </p>
      <EditOutlined
        style={{ width: "1rem", height: "1rem", marginLeft: "auto" }}
      />
    </Button>
  );
};
