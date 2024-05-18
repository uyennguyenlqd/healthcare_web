"use client";
import { useState } from "react";
import { Flex } from "antd";
import Search from "antd/es/input/Search";

const SearchSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const handleOnSearch = (value: string) => {
    setSearchTerm(value);
  };
  return (
    <Flex
      style={{
        width: "800px",
        margin: "auto",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "1px 16px 16px rgba(0,0,0,0.12)",
        flexDirection: "column",
        // marginTop: "-60px",
        padding: "16px",
      }}
    >
      <h3 style={{ color: "#10217D", fontSize: "24px" }}>
        Find Best Healthcare
      </h3>
      <Search
        placeholder="Search By ......"
        allowClear
        onSearch={handleOnSearch}
      />
    </Flex>
  );
};
export default SearchSection;
