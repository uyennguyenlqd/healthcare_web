import { useState } from "react";

import CalendarCard from "../DateTimePicker/calendar";

import { DoctorModel } from "@/interfaces/models/doctors";
interface AddOnlineCounsellingTabProps {
  doctor: DoctorModel;
  onSelectTime: (timeslot: string) => void;
  onSelectDate: (date: string) => void;
}
interface TimeSlot {
  start: string;
  end: string;
}
const AddOnlineCounsellingTab: React.FC<AddOnlineCounsellingTabProps> = ({
  doctor,
  onSelectTime,
  onSelectDate,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        width: "900px",
        margin: "auto",
      }}
    >
      <CalendarCard
        doctor={doctor}
        onSelectTime={onSelectTime}
        onSelectDate={onSelectDate}
      />
    </div>
  );
};
export default AddOnlineCounsellingTab;
