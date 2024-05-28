"use client";

import React, { FC, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  CalendarOutlined,
  DashboardOutlined,
  FileDoneOutlined,
  MessageOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/hooks/useItems";

import HeaderTitle from "../header/header_title";

const SiderContent: FC = () => {
  //   const router = useRouter();
  const pathname = usePathname();
  const handleClickMenuItem: MenuProps["onClick"] = (e) => {
    // router.push(e.key);
    console.log(e);
  };

  const items = useMemo<ItemType<MenuItemType>[]>(
    () => [
      {
        // key: router.paths.get("Dashboard"),
        key: "Dashboard",
        label: "DashBoard",
        icon: <DashboardOutlined size={24} />,
        style: { color: "#06417C" },
      },
      {
        // key: router.paths.get("projects"),
        key: "Calendar",
        label: "Calendar",
        icon: <CalendarOutlined size={24} />,
        style: { color: "#06417C" },
      },
      {
        // key: router.paths.get("work-orders"),
        key: "Appointment",
        label: "Appointment",
        icon: <FileDoneOutlined size={24} />,
        style: { color: "#06417C" },
      },
      {
        // key: router.paths.get("work-orders"),
        key: "Message",
        label: "Message",
        icon: <MessageOutlined size={24} />,
        style: { color: "#06417C" },
      },
      {
        // key: router.paths.get("site-visits"),
        key: "Patients",
        label: "Patients",
        icon: <TeamOutlined size={24} />,
        style: { color: "#06417C" },
      },
    ],
    []
  );

  // TODO: edit logic when have finalized Sidebar
  const selectedKeys = useMemo(() => {
    const found = items.find((i) => i?.key?.toString() === pathname);
    if (found) return [found.key?.toString() || ""];

    return items
      .filter(
        (i) =>
          i?.key &&
          i.key.toString() !== "/dashboard" &&
          pathname.startsWith(i.key.toString())
      )
      .map((i) => i?.key?.toString() ?? "");
  }, [items, pathname]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: "40px",
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
          selectedKeys={selectedKeys}
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
