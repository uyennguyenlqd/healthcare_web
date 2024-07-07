import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

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
