"use client";

import { FC } from "react";
import { Layout } from "antd";

import SiderContent from "@/components/doctor/Sider";
import DashboardHeader from "@/components/doctor/dashboardHeader";
// eslint-disable-next-line max-len

const { Content, Sider } = Layout;
const DashboardLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout
      style={{
        flex: 1,
        height: "100vh",
      }}
    >
      <Sider
        theme="light"
        width={240}
        style={{
          padding: "20px 10px",
          borderRight: "1px solid rgba(192, 197, 203, 0.37)",
        }}
      >
        <SiderContent />
      </Sider>
      <Layout>
        <DashboardHeader />
        <Content
          style={{
            padding: "24px 48px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            overflow: "auto",
            backgroundColor: "#f0f8ff",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
