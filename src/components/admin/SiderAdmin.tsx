"use client";

import React, { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  DashboardOutlined,
  DollarOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
  ScheduleOutlined,
  SettingOutlined,
  TeamOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";

import HeaderTitle from "../header/header_title";

const SiderAdmin: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const items = [
    {
      key: "Dashboard",
      label: "DashBoard",
      icon: <DashboardOutlined style={{ fontSize: "20px" }} />,
      style: { color: "#06417C", fontSize: "16px", marginBottom: "12px" },
      url: "/admin/dashboard",
    },
    {
      key: "User",
      label: "User",
      icon: <TeamOutlined style={{ fontSize: "20px" }} />,
      style: { color: "#06417C", fontSize: "16px", marginBottom: "12px" },
      url: "/admin/user",
    },
    {
      key: "Doctor",
      label: "Doctor",
      icon: <FileDoneOutlined style={{ fontSize: "20px" }} />,
      style: { color: "#06417C", fontSize: "16px", marginBottom: "12px" },
      url: "/admin/doctor",
    },
    {
      key: "Feedback",
      label: "Feedback",
      icon: <SmileOutlined style={{ fontSize: "20px" }} />,
      style: { color: "#06417C", fontSize: "16px", marginBottom: "12px" },
      url: "/admin/feedback",
    },
    {
      key: "Schedule",
      label: "Schedule",
      icon: <ScheduleOutlined style={{ fontSize: "20px" }} />,
      style: { color: "#06417C", fontSize: "16px", marginBottom: "12px" },
      url: "/admin/schedule",
    },

    {
      key: "Settings",
      label: "Settings",
      icon: <SettingOutlined style={{ fontSize: "20px" }} />,
      style: { color: "#06417C", fontSize: "16px", marginBottom: "12px" },
      url: "/admin",
    },
  ];
  const handleClickMenuItem: MenuProps["onClick"] = (e) => {
    const key = e.key as string; // Ensure 'key' is treated as string
    const item = items.find((item) => item.key === key);
    if (item?.url) {
      router.push(item.url);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "64px",
      }}
    >
      <div style={{ paddingLeft: "24px" }}>
        <HeaderTitle />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <Menu
          mode="inline"
          items={items}
          onClick={handleClickMenuItem}
          style={{
            border: "none",
            fontWeight: 500,
            fontSize: "16px",
          }}
        />
        <Button
          type="primary"
          onClick={() => {
            signOut({ callbackUrl: "/" }).then(() => {});
          }}
          style={{
            width: "100%",
            fontSize: "16px",
            fontWeight: 500,
            padding: "8px",
            height: "fit-content",
          }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default SiderAdmin;
