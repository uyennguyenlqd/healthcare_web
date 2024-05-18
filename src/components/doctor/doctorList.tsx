import { Flex } from "antd";
import React from "react";
import DoctorCard from "./doctorCard";

const mock: any = [{}, {}, {}];

const DoctorList: React.FC = () => {
  return (
    <Flex
      style={{
        gap: "32px",
        flexDirection: "column",
      }}
    >
      {mock.map((_: any, idx: React.Key | null | undefined) => (
        <DoctorCard />
      ))}
    </Flex>
  );
};
export default DoctorList;
