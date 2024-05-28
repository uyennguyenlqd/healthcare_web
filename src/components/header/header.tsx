"use client";
import { useState } from "react";
import type { MenuProps } from "antd";
import { Button, Flex, Menu } from "antd";
import Title from "antd/es/typography/Title";
import styled from "styled-components";
import HeaderTitle from "./header_title";
const items: MenuProps["items"] = [
  {
    label: "Online Counselling",
    key: "counselling",
    // children: [
    //   {
    //     label: "Chat với bác sĩ",
    //     key: "chat",
    //   },
    // ],
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

let Header: React.FC = () => {
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
        // mode="inline"
        mode="horizontal"
        style={{
          width: "470px",
          display: "flex",
          // borderInlineEnd: "none",
          borderBottom: "none",
          marginLeft: "20px",
        }}
      />
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
          console.log("button");
        }}
      >
        {/* ĐĂNG NHẬP */}
        LOGIN
      </Button>
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
