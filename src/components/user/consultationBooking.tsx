import { useSession } from "next-auth/react";
import { Avatar, Button, Flex, notification, Typography } from "antd";
import dayjs from "dayjs";

import { ENV } from "@/constants/env";
import { DoctorModel } from "@/interfaces/models/doctors";
interface DoctorDetailInfoProps {
  doctor: DoctorModel;
  selectedTimeslot: string;
  selectedDate: string;
  notes: string;
  url: string;
}
const ConsultationBooking: React.FC<DoctorDetailInfoProps> = ({
  doctor,
  selectedTimeslot,
  selectedDate,
  notes,
  url,
}) => {
  const { data: session } = useSession();
  const timeslot = selectedTimeslot;
  const bookingHandler = async () => {
    try {
      const res = await fetch(
        `${ENV}/api/v1/booking/checkout-session/${doctor._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            timeslot,
            notes,
            file_upload: url,
            appointmentDate: dayjs(selectedDate).format(
              "YYYY-MM-DDTHH:mm:ss.SSSZ",
            ),
          }),
        },
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.mesage + "Please try again");
      }
      notification.success({ message: "Booking created successfully" });
    } catch (err: any) {
      notification.error({
        message: "Failed to create booking. Please try again.",
      });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        marginTop: "96px",
        width: "300px",
        gap: "24px",
        height: "fit-content",
        border: "solid 0.5px rgba(152, 162, 179, 0.4)",
        borderRadius: "16px",
        backgroundColor: "#fff",
      }}
    >
      <h4
        style={{
          fontWeight: "bold",
          color: "#10217D",
          fontSize: "24px",
          textAlign: "center",
          margin: 0,
          marginBottom: "10px",
        }}
      >
        Consultation Booking
      </h4>
      <Flex gap={55}>
        <Avatar
          style={{ backgroundColor: "#E0E0E0" }}
          size={50}
          src={
            <img
              src={doctor.avatar || "/icons/doctor02.png"}
              alt=""
              style={{
                position: "relative",
                objectFit: "contain",
                objectPosition: "center bottom",
              }}
            />
          }
        />
        <Typography
          style={{ fontSize: "18px", color: "#10217D", fontWeight: 500 }}
        >
          {doctor.first_name} {doctor.last_name}
        </Typography>
      </Flex>
      <Flex style={{ justifyContent: "space-between" }}>
        <Typography style={{ fontSize: "16px" }}>Patient</Typography>
        <Typography style={{ fontSize: "16px", fontWeight: "bold" }}>
          {session?.user?.name}
        </Typography>
      </Flex>
      <Flex style={{ justifyContent: "space-between" }}>
        <Typography style={{ fontSize: "16px" }}>Appointment Date </Typography>
        <Typography style={{ fontSize: "16px", fontWeight: "bold" }}>
          {selectedDate}
        </Typography>
      </Flex>
      <Flex style={{ justifyContent: "space-between" }}>
        <Typography style={{ fontSize: "16px" }}>Time Slot</Typography>
        <Typography style={{ fontSize: "16px", fontWeight: "bold" }}>
          {selectedTimeslot}
        </Typography>
      </Flex>

      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1b61bd",
          color: "#fff",
          fontWeight: 500,
          fontSize: "16px",
          padding: "0px 8px",
          borderRadius: "8px",
          height: "45px",
          border: "1px solid #1677FF",

          letterSpacing: "1px",
        }}
        onClick={bookingHandler}
      >
        Book an Appointment
      </Button>
    </div>
  );
};
export default ConsultationBooking;
