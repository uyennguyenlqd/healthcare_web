import { useEffect, useState } from "react";
import { Button, Calendar, theme, Typography } from "antd";
import axios from "axios";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

import { ENV } from "@/constants/env";
import {
  DoctorModel,
  ScheduleModel,
  TimeSlotModel,
} from "@/interfaces/models/doctors";
interface DoctorCardProps {
  doctor: DoctorModel;
  schedule: ScheduleModel[];
  onSelectTime: (timeslot: string) => void;
  onSelectDate: (date: string) => void;
}

const CalendarCard: React.FC<DoctorCardProps> = ({
  doctor,
  schedule,
  onSelectTime,
  onSelectDate,
}) => {
  const [value, setValue] = useState<Dayjs>(() => dayjs());
  const [selectedValue, setSelectedValue] = useState<Dayjs>(() => dayjs());
  const [selectedTimeslot, setSelectedTimeslot] = useState<string>("");
  const [doctorTimeslots, setDoctorTimeslots] = useState<TimeSlotModel[]>([]);
  const { token } = theme.useToken();
  const wrapperStyle: React.CSSProperties = {
    border: "solid 0.2px rgba(152, 162, 179, 0.4)",
    borderRadius: token.borderRadiusLG,
  };
  useEffect(() => {
    // Gọi API để lấy lịch trình bác sĩ cho ngày đã chọn
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          `${ENV}/api/v1/schedule/by-date?doctorId=${doctor._id}&date=${selectedValue.format("YYYY-MM-DD")}`,
        );
        setDoctorTimeslots(response.data.schedule.timeSlots || []);
      } catch (error) {
        console.error("Error fetching schedule:", error);
        setDoctorTimeslots([]);
      }
    };

    fetchSchedule();
  }, [selectedValue, doctor._id]); 
  // const doctortimeslots = doctor?.timeslots || [];
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
    const today = dayjs().startOf("day");
    const sevenDaysFromNow = today.clone().add(7, "days");
    return current < today || current > sevenDaysFromNow;
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
          {doctorTimeslots.map((timeslot, idx) => (
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
                !timeslot.isBooked &&
                onSelectTimeSlot(`${timeslot.start} - ${timeslot.end}`)
              }
              disabled={timeslot.isBooked}
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
