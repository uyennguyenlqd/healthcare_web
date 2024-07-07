import CalendarCard from "../DateTimePicker/calendar";
import DateTimeTabs from "../DateTimePicker/dateTimePickerTabs";
import AboutDoctor from "./doctorDetail/aboutdoctor";
import ButtonBookDoctor from "./doctorDetail/buttonBook";

import { DoctorModel } from "@/interfaces/models/doctors";
interface DoctorOverviewSectionProps {
  doctor: DoctorModel;
}

const DoctorOverviewSection: React.FC<DoctorOverviewSectionProps> = ({
  doctor,
}) => {
  return (
    <div style={{ gap: "24px", display: "flex", flexDirection: "column" }}>
      <AboutDoctor doctor={doctor} />
      <CalendarCard />
      <DateTimeTabs />

      <ButtonBookDoctor />
    </div>
  );
};
export default DoctorOverviewSection;
