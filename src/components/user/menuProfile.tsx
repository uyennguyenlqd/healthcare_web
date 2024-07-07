import { Menu } from "antd";

import { profileItems } from "../header/menuItems";

interface MenuProfileProps {
  onMenuClick: (key: string) => void;
}

const MenuProfile: React.FC<MenuProfileProps> = ({ onMenuClick }) => {
  return (
    <Menu
      items={profileItems}
      onClick={(e) => onMenuClick(e.key)}
      style={{
        maxHeight: "150px",
        borderBottom: "none",
        borderRadius: "16px",
        marginLeft: "20px",
        marginTop: "48px",
        padding: "8px 16px",
      }}
    />
  );
};

export default MenuProfile;
