"use client";
import { Flex } from "antd";

import CalendarCard from "@/components/DateTimePicker/calendar";
import DateTimeTabs from "@/components/DateTimePicker/dateTimePickerTabs";
import AboutDoctor from "@/components/doctor/doctorDetail/aboutdoctor";
import ButtonBookDoctor from "@/components/doctor/doctorDetail/buttonBook";
import DoctorDetailInfo from "@/components/doctor/doctorDetail/doctorDetailInfo";

export default function ViewDoctorDetail() {
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
