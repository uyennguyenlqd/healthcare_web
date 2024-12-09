import React from "react";
import Link from "next/link";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function NewButton({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  return (
    <Button style={{ border: "1px solid #ccc" }}>
      <Link href={href}>
        <PlusOutlined />
        {title}
      </Link>
    </Button>
  );
}
