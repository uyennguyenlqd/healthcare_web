"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { MenuProps } from "antd";
import { Avatar, Button, Dropdown, Flex, Menu, Typography } from "antd";
import styled from "styled-components";

import HeaderTitle from "./header_title";
import { profileItems } from "./menuItems";

//TODO: AUTO REFRESH PAGE WHEN LOGIN, SIGNOUT WITHOUT PRESSING F5

export const items: MenuProps["items"] = [
  {
    label: "Home",
    key: "home",
  },
  {
    label: "Online Counselling",
    key: "counselling",
  },
  {
    label: "Medical News",
    key: "news",
  },
  {
    label: "Contact",
    key: "contact",
  },
];
let Header: React.FC = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (status !== "loading") {
      setIsLoading(false);
    }
  }, [status]);

  const [changeColorButton, setChangeColorButton] = useState(false);
  const [current, setCurrent] = useState("home");
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
    switch (e.key) {
      case "home":
        router.push("/user");
        break;
      case "counselling":
        router.push("/user/online-counselling");
        break;
      case "news":
        router.push("/");
        break;
      case "contact":
        router.push("/user/contact");
        break;
      default:
        break;
    }
  };

  const handleClickProfile: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case "profile":
        router.push("/user/booking");
        break;
      case "history_booking":
        break;
      case "logout":
        break;
      default:
        break;
    }
  };
  return (
    <Flex
      justify="space-between"
      style={{
        alignItems: "center",
        margin: 0,
        padding: "8px 96px",
        maxWidth: "100%",
        backgroundColor: "#fff",
      }}
    >
      <HeaderTitle />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        items={items}
        mode="horizontal"
        style={{
          width: "470px",
          display: "flex",

          borderBottom: "none",
          marginLeft: "20px",
        }}
      />
      <div>
        {session?.user ? (
          <Dropdown
            trigger={["click"]}
            // menu={{ items: profileItems }}
            overlay={<Menu onClick={handleClickProfile} items={profileItems} />}
          >
            <div>
              {session.user.image || session.user.avatar ? (
                <div style={{ display: "flex", gap: "8px" }}>
                  <Avatar
                    src={session.user.image || session.user.avatar}
                    size="large"
                    alt={session.user.name}
                  />
                  <Typography>{session?.user?.name}</Typography>
                </div>
              ) : (
                <div style={{ display: "flex", gap: "8px" }}>
                  <Avatar src={"/icons/usericon.jpg"} size="large" />
                  <Typography style={{ marginTop: "8px" }}>
                    {session.user.name}
                  </Typography>
                </div>
              )}
            </div>
          </Dropdown>
        ) : (
          <Button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: changeColorButton ? "#fff" : "#1b61bd",
              color: changeColorButton ? "#1b61bd" : "#fff",
              fontWeight: 500,
              fontSize: "16px",
              padding: "0px 20px",
              borderRadius: "8px",
              border: "1px solid #1677FF",
              minWidth: 144,
              height: "45px",
              letterSpacing: "1px",
            }}
            onClick={() => {
              setChangeColorButton((prev) => !prev);
              router.push("/auth/login");
              console.log("button");
            }}
          >
            LOGIN
          </Button>
        )}
      </div>
    </Flex>
  );
};

//TO DO => can't css
Header = styled(Header)`
  .ant-menu-item {
    &.ant-menu-item-selected {
      background-color: red !important;
    }
  }
`;

export default Header;
