import type { MenuProps } from "antd";

import ProfilePage from "@/app/user/booking/profile/page";
import { logOut } from "@/hooks/auth";

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
      // Handle history booking logic if needed
      break;
    case "logout":
      setSelectedComponent(null);
      break;
    default:
      setSelectedComponent(null);
      break;
  }
};
