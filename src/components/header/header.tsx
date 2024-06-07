"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import type { MenuProps } from "antd";
import { Avatar, Button, Dropdown, Flex, Menu } from "antd";
import styled from "styled-components";

import HeaderTitle from "./header_title";
import { items, profileItems } from "./menuItems";

//TODO :NEED TO CLEAN CODE
//TODO: AUTO REFRESH PAGE WHEN LOGIN, SIGNOUT WITHOUT PRESSING F5

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
  const [current, setCurrent] = useState("counselling");
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
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
        {/* TODO :CHECK LOGIC AGAIN */}

        {session?.user ? (
          <Dropdown trigger={["click"]} menu={{ items: profileItems }}>
            <div>
              {session.user.name && session.user.image ? (
                <Avatar
                  src={session.user.image}
                  size="large"
                  alt={session.user.name}
                />
              ) : (
                <Avatar src={"/icons/doctor02.png"} size="large" />
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
