"use client";

import { EllipsisOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, Typography } from "antd";

const DashboardHeader = () => {
  //TODO

  return (
    <Layout.Header
      style={{
        display: "flex",
        alignItems: "center",
        // justifyContent: "space-between",
        justifyContent: "flex-end",
        width: "100%",
        backgroundColor: "#f0f8ff",
      }}
    >
      {/* <DynamicBreadcrumb /> */}
      <div
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <Notification /> */}
        <div
          style={{
            padding: "0 10px 0 10px",
            boxSizing: "border-box",
            height: 55,
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderRadius: 8,
          }}
        >
          {/* <Avatar size="large">{user?.display_name?.[0] ?? ""}</Avatar> */}
          <Avatar size="large">J</Avatar>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography.Text style={{ fontSize: 13, fontWeight: 600 }}>
              {/* {user?.display_name ?? ""} */}
              Jennie Kim
            </Typography.Text>
          </div>
          <Button
            type="text"
            size="small"
            style={{ height: 36, borderRadius: "50%", marginLeft: 20 }}
          >
            <EllipsisOutlined
              style={{ fontSize: 24, transform: "rotate(90deg)" }}
            />
          </Button>
        </div>
      </div>
    </Layout.Header>
  );
};

export default DashboardHeader;
