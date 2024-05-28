import { useState } from "react";
import { Calendar } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
const CalendarCard: React.FC = () => {
  const [value, setValue] = useState(() => dayjs("2017-01-25"));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2017-01-25"));

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  return (
    <div
      style={{
        border: "solid 0.2px rgba(152, 162, 179, 0.4)",
        borderRadius: "8px",
        padding: "24px",
        backgroundColor: "#fff",
      }}
    >
      <h3
        style={{
          color: "#10217D",
          fontSize: "24px",
          margin: 0,
        }}
      >
        TimePicker
      </h3>
      {/* <Alert message={`${selectedValue?.format("YYYY-MM-DD")}`} /> */}
      <Calendar
        fullscreen={false}
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
    </div>
  );
};
export default CalendarCard;
