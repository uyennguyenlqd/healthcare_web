import { useRouter } from "next/navigation";
import { Menu } from "antd";

import { profileItems } from "../header/menuItems";
const MenuProfile: React.FC = () => {
  const router = useRouter();
  const handleMenuClick = (key: string) => {
    switch (key) {
      case "profile":
        router.push("/user/booking/profile");
        break;
      case "history_booking":
        router.push("/user/booking/payment");
        break;
      case "counselling_records":
        router.push("/user/booking/counselling-records");
        break;
      default:
        break;
    }
  };
  return (
    <Menu
      items={profileItems}
      onClick={(e) => handleMenuClick(e.key)}
      style={{
        maxHeight: "200px",
        borderBottom: "none",
        borderRadius: "16px",
        marginLeft: "24px",
        marginRight: "24px",
        marginTop: "56px",
        padding: "8px 16px",
        fontSize: "16px",
      }}
    >
      <Menu.Item key="profile">My Profile</Menu.Item>
      <Menu.Item key="history_booking">My booking history</Menu.Item>
      <Menu.Item key="counselling_records">Counselling Records</Menu.Item>
    </Menu>
  );
};

export default MenuProfile;
