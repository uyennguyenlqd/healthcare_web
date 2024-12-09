import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";

import { cn } from "@/utils/cn";

interface ChatBoxProps {
  chat: { _id: string; title: string };
  selected: boolean;
}

export const ChatBox = ({ chat, selected }: ChatBoxProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);

  const router = useRouter();

  // Điều hướng đến chat khi click
  const handleClick = () => {
    if (!selected) {
      router.push(`user/help/${chat._id}`);
    }
  };

  // Kết thúc chỉnh sửa tên
  const handleRename = () => {
    setIsEditing(false);
    console.log("Renamed title:", title); // Thực hiện logic rename sau
  };

  return (
    <div
      className={cn(
        "group relative flex w-full items-center p-2 rounded-md hover:bg-neutral-100 cursor-pointer text-black text-sm",
        selected && "bg-neutral-200"
      )}
      onClick={handleClick}
    >
      {isEditing ? (
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onPressEnter={handleRename}
          onBlur={handleRename}
          autoFocus
          style={{ maxWidth: 200 }}
        />
      ) : (
        <div className="truncate max-w-[200px]">{chat.title}</div>
      )}

      <div className="ml-auto flex space-x-2">
        {isEditing ? (
          <Button
            type="primary"
            shape="circle"
            icon={<CheckOutlined />}
            onClick={handleRename}
          />
        ) : (
          <>
            <Button
              type="default"
              shape="circle"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation(); // Ngăn chặn sự kiện click vào toàn bộ item
                setIsEditing(true);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};
