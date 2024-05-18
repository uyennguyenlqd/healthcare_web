"use client";
import { Collapse, Flex, Radio, RadioChangeEvent } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";

const DoctorFilter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [value, setValue] = useState(1);
  const handleOnSearch = (value: string) => {
    setSearchTerm(value);
  };
  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <Flex style={{ flexDirection: "column" }}>
      <Search
        placeholder="Search By ......"
        allowClear
        onSearch={handleOnSearch}
      />
      <Radio.Group
        onChange={onChange}
        value={value}
        style={{
          display: "flex",
          flexDirection: "column",
          overflow: "auto",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        {/* OVERFLOW DOESN'T WORK */}
        <Radio value={1}>Heart</Radio>
        <Radio value={2}>Oxigen</Radio>
        <Radio value={3}>Heart</Radio>
        <Radio value={4}>Oxigen</Radio>
        <Radio value={5}>Heart</Radio>
        <Radio value={6}>Oxigen</Radio>
        <Radio value={7}>Heart</Radio>
        <Radio value={8}>Oxigen</Radio>
      </Radio.Group>
    </Flex>
  );
};
export default DoctorFilter;
