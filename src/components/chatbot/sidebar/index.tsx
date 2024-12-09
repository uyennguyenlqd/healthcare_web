import { ChatList } from "./chat-list";
import { NewChatButton } from "./new-chat-button";

export const SidebarChatbot = () => {
  return (
    <div
      className="h-full hidden lg:flex lg:flex-col lg:w-[300px] bg-neutral-950 p-4"
      style={{ width: "30%", background: "#F5F5F5", padding: "8px 16px" }}
    >
      <NewChatButton />
      <ChatList />
    </div>
  );
};
