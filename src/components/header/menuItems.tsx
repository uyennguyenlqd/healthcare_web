import type { MenuProps } from "antd";

import RecordPage from "@/app/user/booking/counselling-records/page";
import MyAppointmentPage from "@/app/user/booking/payment/page";
import ProfilePage from "@/app/user/booking/profile/page";
import { logOut } from "@/hooks/auth";

export const profileItems: MenuProps["items"] = [
  {
    label: "My Profile",
    key: "profile",
  },
  {
    label: "My Booking",
    key: "history_booking",
  },
  {
    label: "Counselling Records",
    key: "counselling_records",
  },
  {
    label: "Logout",
    key: "logout",
    onClick: async () => await handleLogout(),
  },
];
export const handleLogout = async () => {
  await logOut();
};
export const handleMenuClick = (
  key: string,
  setSelectedComponent: React.Dispatch<React.SetStateAction<JSX.Element | null>>
) => {
  switch (key) {
    case "profile":
      setSelectedComponent(<ProfilePage />);
      break;
    case "history_booking":
      setSelectedComponent(<MyAppointmentPage />);
      break;
    case "counselling_records":
      setSelectedComponent(<RecordPage />);
      break;
    case "logout":
      setSelectedComponent(null);
      break;
    default:
      setSelectedComponent(null);
      break;
  }
};
