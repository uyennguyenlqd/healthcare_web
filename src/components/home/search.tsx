"use client";
import { useState } from "react";
import { Flex, Space } from "antd";
import Search from "antd/es/input/Search";
import { useRouter } from "next/navigation";

interface SearchSectionProps {
  onSearch: (value: string) => void;
}
const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
  const router = useRouter();
  const handleOnSearch = (value: string) => {
    onSearch(value);
  };
  return (
    <Flex
      style={{
        background: "#F0F8FF",
        borderRadius: "8px",

        flexDirection: "column",
        padding: "40px ",
      }}
    >
      <h3
        style={{
          color: "#10217D",
          fontSize: "36px",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Find Best Doctor
      </h3>
      <Space direction="vertical" align="center">
        <Search
          placeholder="Search By ......"
          style={{ width: "800px" }}
          allowClear
          enterButton
          onSearch={handleOnSearch}
          size="large"
        />
      </Space>
    </Flex>
  );
};
export default SearchSection;
