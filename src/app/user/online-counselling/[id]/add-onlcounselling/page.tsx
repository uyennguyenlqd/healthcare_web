"use client";
import { Tabs, TabsProps } from "antd";

import AddOnlineCounsellingTab from "@/components/doctor/addNewAppointment/addOnlineCounsellingTab";
import UserProfile from "@/components/user/userProfile";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Add Online Counselling",
    children: <AddOnlineCounsellingTab />,
  },
  {
    key: "2",
    label: "Patient Record",
    children: <UserProfile />,
  },
  {
    key: "3",
    label: "Confirmation",
    children: "Content of Tab Pane 3",
  },
  {
    key: "4",
    label: "Payment",
    children: "Content of Tab Pane 3",
  },
  {
    key: "5",
    label: "Receive an appointment",
    children: "Content of Tab Pane 3",
  },
];
const onTabChange = (key: string) => {
  console.log(key);
};

export default function OnlineCounselling() {
  return (
    <div
      style={{
        padding: "24px 96px",
        gap: "24px",
        backgroundColor: "#F9FBFC",
      }}
    >
      <Tabs defaultActiveKey="1" items={items} onChange={onTabChange} />
    </div>
  );
}
