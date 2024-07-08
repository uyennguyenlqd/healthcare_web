"use client";

import { FC } from "react";
import { Divider, Layout } from "antd";

import MenuProfile from "@/components/user/menuProfile";

const { Content } = Layout;

const BookingLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout
      style={{
        display: "grid",
        gridTemplateColumns: "0.3fr 0fr 0.7fr",
        backgroundColor: "#F9FBFC",
      }}
    >
      <MenuProfile />
      <Divider type="vertical" style={{ height: "100%", margin: 0 }} />
      <Layout>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            backgroundColor: "#F9FBFC",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BookingLayout;
