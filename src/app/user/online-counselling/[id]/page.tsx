"use client";
import { Flex } from "antd";

import AboutDoctor from "@/components/doctor/doctorDetail/aboutdoctor";
import ButtonBookDoctor from "@/components/doctor/doctorDetail/buttonBook";
import CalendarCard from "@/components/doctor/doctorDetail/DateTimePicker/calendar";
import DateTimeTabs from "@/components/doctor/doctorDetail/DateTimePicker/dateTimePickerTabs";
import DoctorDetailInfo from "@/components/doctor/doctorDetail/doctorDetailInfo";

export default function CustomerDetail({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  return (
    <div style={{ padding: "24px 96px", backgroundColor: "#F9FBFC" }}>
      <Flex
        style={{
          flexDirection: "column",
          padding: "24px 96px",
          backgroundColor: "#F9FBFC",
          gap: "24px",

          width: "900px",
          margin: "auto",
        }}
      >
        <DoctorDetailInfo />
        <CalendarCard />
        <DateTimeTabs />
        <AboutDoctor />
        <ButtonBookDoctor />
      </Flex>
    </div>
  );
}
