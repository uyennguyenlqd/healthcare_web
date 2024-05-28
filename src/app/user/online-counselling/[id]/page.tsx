"use client";
import { Flex } from "antd";

import AboutDoctor from "@/components/doctor/doctorDetail/aboutdoctor";
import ButtonBookDoctor from "@/components/doctor/doctorDetail/buttonBook";
import CalendarCard from "@/components/DateTimePicker/calendar";
import DateTimeTabs from "@/components/DateTimePicker/dateTimePickerTabs";
import DoctorDetailInfo from "@/components/doctor/doctorDetail/doctorDetailInfo";
import ViewDoctorDetail from "./ViewAddEdit/ViewDetailDoctor";

export default function CustomerDetail({
  params,
}: Readonly<{
  params: { id: string };
}>) {
  return <ViewDoctorDetail />;
}
