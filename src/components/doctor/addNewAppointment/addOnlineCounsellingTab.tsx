import CalendarCard from "../doctorDetail/DateTimePicker/calendar";
import DateTimeTabs from "../doctorDetail/DateTimePicker/dateTimePickerTabs";

const AddOnlineCounsellingTab: React.FC = () => {
  const customLabels = ["Morning", "Afternoon", "Evening"];

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
      <DateTimeTabs />
    </div>
  );
};
export default AddOnlineCounsellingTab;
