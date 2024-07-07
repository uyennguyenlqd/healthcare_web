"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Divider, Flex } from "antd";

import MenuProfile from "@/components/user/menuProfile";
import Profile from "@/components/user/profile";
import { handleMenuClick } from "@/components/header/menuItems";
import ProfilePage from "./profile/page";
const BookingPage: React.FC = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<JSX.Element | null>(<ProfilePage />);

  return (
    <Flex
      style={{
        flexDirection: "column",
        padding: "24px 96px",
        backgroundColor: "#F9FBFC",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.6fr 0fr 1.4fr",
          gap: "32px",
        }}
      >
        {/* <MenuProfile onMenuClick={handleMenuClick} /> */}
        <MenuProfile
          onMenuClick={(key) => handleMenuClick(key, setSelectedComponent)}
        />

        <Divider type="vertical" style={{ height: "100%" }} />
        <div>{selectedComponent}</div>
      </div>
    </Flex>
  );
};
export default BookingPage;
