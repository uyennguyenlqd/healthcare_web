"use client";

import React, { FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  DashboardOutlined,
  DollarOutlined,
  FileDoneOutlined,
  FileProtectOutlined,
  FormOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";

import HeaderTitle from "../header/header_title";

const SiderContent: FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const items = [
    {
      key: "Dashboard",
      label: "DashBoard",
      icon: <DashboardOutlined style={{ fontSize: "20px" }} />,
      style: { color: "#06417C", fontSize: "16px", marginBottom: "12px" },
      url: "/doctor",
    },
    {
      key: "Appointment",
      label: "Appointment",
      icon: <FileDoneOutlined style={{ fontSize: "20px" }} />,
      style: { color: "#06417C", fontSize: "16px", marginBottom: "12px" },
      url: "/doctor/appointments",
    },
    {
      key: "Patients",
      label: "Patients",
      icon: <TeamOutlined style={{ fontSize: "20px" }} />,
      style: { color: "#06417C", fontSize: "16px", marginBottom: "12px" },
      url: "/doctor/patients",
    },
    {
      key: "Therapist's Corner",
      label: "Therapist's Corner",
      icon: <FileProtectOutlined style={{ fontSize: "20px" }} />,
      style: { color: "#06417C", fontSize: "16px", marginBottom: "12px" },
      url: "/doctor",
    },
    {
      key: "Notes",
      label: "Notes",
      icon: <FormOutlined style={{ fontSize: "20px" }} />,
      style: { color: "#06417C", fontSize: "16px", marginBottom: "12px" },
      url: "/doctor",
    },
    {
      key: "Billing",
      label: "Billings",
      icon: <DollarOutlined style={{ fontSize: "20px" }} />,
      style: { color: "#06417C", fontSize: "16px", marginBottom: "12px" },
      url: "/doctor",
    },

    {
      key: "Settings",
      label: "Settings",
      icon: <SettingOutlined style={{ fontSize: "20px" }} />,
      style: { color: "#06417C", fontSize: "16px", marginBottom: "12px" },
      url: "/doctor",
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
            console.log("button");
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

export default SiderContent;
