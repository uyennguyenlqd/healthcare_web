import { useState } from "react";
import { Button, Calendar, theme, Typography } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import { DoctorModel } from "@/interfaces/models/doctors";
interface DoctorCardProps {
  doctor: DoctorModel;
  onSelectTime: (timeslot: string) => void;
  onSelectDate: (date: string) => void;
}

const CalendarCard: React.FC<DoctorCardProps> = ({
  doctor,
  onSelectTime,
  onSelectDate,
}) => {
  const [value, setValue] = useState<Dayjs>(() => dayjs());
  const [selectedValue, setSelectedValue] = useState<Dayjs>(() => dayjs());
  const [selectedTimeslot, setSelectedTimeslot] = useState<string>("");

  const { token } = theme.useToken();
  const wrapperStyle: React.CSSProperties = {
    border: "solid 0.2px rgba(152, 162, 179, 0.4)",
    borderRadius: token.borderRadiusLG,
  };
  const doctortimeslots = doctor?.timeslots || [];
  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
    onSelectDate(newValue.format("YYYY-MM-DD"));
  };

  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  const onSelectTimeSlot = (timeslot: string) => {
    setSelectedTimeslot(timeslot);

    onSelectTime(timeslot);
  };
  const disabledDate = (current: Dayjs) => {
    return current.isBefore(dayjs(), "day");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "solid 0.2px rgba(152, 162, 179, 0.4)",
        borderRadius: "8px",
        padding: "24px",
        gap: "24px",
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
        Book Appointment
      </h3>
      {/* <Alert message={`${selectedValue?.format("YYYY-MM-DD")}`} /> */}
      <div style={wrapperStyle}>
        <Calendar
          fullscreen={false}
          value={value}
          onSelect={onSelect}
          onPanelChange={onPanelChange}
          disabledDate={disabledDate}
        />
      </div>
      <div
        style={{
          border: "solid 0.2px rgba(152, 162, 179, 0.4)",
          borderRadius: "8px",
          padding: "24px",
          backgroundColor: "#fff",
        }}
      >
        <div
          style={{
            padding: "24px 0",
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",

            gap: "20px",
          }}
        >
          {doctortimeslots.map((timeslot, idx) => (
            <Button
              key={idx}
              style={{
                display: "flex",
                flexDirection: "column",

                borderRadius: "12px",
                padding: "10px 0",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "fit-content",
              }}
              onClick={() =>
                onSelectTimeSlot(`${timeslot.start} - ${timeslot.end}`)
              }
            >
              <Typography
                style={{
                  color: "#122853",
                  fontSize: "16px",
                }}
              >
                {`${timeslot.start} - ${timeslot.end}`}
              </Typography>
            </Button>
          ))}
        </div>

        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            color: "#1b61bd",
            fontSize: "16px",
            border: 0,
            padding: 0,
            boxShadow: "none",
            width: "fit-content",
          }}
          onClick={() => {
            console.log("button");
          }}
        >
          View All
        </Button>
      </div>
    </div>
  );
};
export default CalendarCard;
