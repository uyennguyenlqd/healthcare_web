import { logOut } from "@/hooks/auth";
import type { MenuProps } from "antd";
export const items: MenuProps["items"] = [
  {
    label: "Online Counselling",
    key: "counselling",
  },
  {
    label: "Medical News",
    key: "news",
  },
  {
    label: "About us",
    key: "aboutus",
  },
];
export const profileItems: MenuProps["items"] = [
  {
    label: "My Profile",
    key: "profile",
  },
  {
    label: "My booking history",
    key: "history_booking",
  },
  {
    label: "Logout",
    key: "logout",
    onClick: () => handleLogout(),
  },
];
export const handleLogout = () => {
  logOut();
};
