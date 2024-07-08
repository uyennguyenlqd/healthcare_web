import { useState } from "react";

import CalendarCard from "../DateTimePicker/calendar";
import DateTimeTabs from "../DateTimePicker/dateTimePickerTabs";

import { DoctorModel } from "@/interfaces/models/doctors";
interface AddOnlineCounsellingTabProps {
  doctor: DoctorModel;
}
interface TimeSlot {
  start: string;
  end: string;
}
const AddOnlineCounsellingTab: React.FC<AddOnlineCounsellingTabProps> = ({
  doctor,
}) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null,
  );
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
      <CalendarCard />
      <DateTimeTabs
        doctor={doctor}
        setSelectedTimeSlot={(timeslot) => setSelectedTimeSlot(timeslot)}
      />
    </div>
  );
};
export default AddOnlineCounsellingTab;
