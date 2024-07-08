import { Avatar, Button, Flex, Typography } from "antd";

import { DoctorModel } from "@/interfaces/models/doctors";

interface DoctorDetailInfoProps {
  doctor: DoctorModel;
}
const ConsultationBooking: React.FC<DoctorDetailInfoProps> = ({ doctor }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        marginTop: "96px",
        width: "300px",
        gap: "16px",
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
          fontSize: "20px",
          textAlign: "center",
          margin: 0,
          marginBottom: "10px",
        }}
      >
        Consultation Booking
      </h4>
      <Flex gap={36}>
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
        <Typography style={{ fontSize: "16px" }}>
          {doctor.first_name} {doctor.last_name}
        </Typography>
      </Flex>
      <Flex style={{ justifyContent: "space-between" }}>
        <Typography style={{ fontSize: "14px" }}>Appointment Date</Typography>
        <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
          Jisoo Kim
        </Typography>
      </Flex>
      <Flex style={{ justifyContent: "space-between" }}>
        <Typography style={{ fontSize: "14px" }}>Time Slot</Typography>
        <Typography style={{ fontSize: "14px", fontWeight: "bold" }}>
          10:30-11:00
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
          fontSize: "14px",
          padding: "0px 8px",
          borderRadius: "8px",
          height: "35px",
          border: "1px solid #1677FF",

          letterSpacing: "1px",
        }}
        onClick={() => {}}
      >
        Book an Appointment
      </Button>
    </div>
  );
};
export default ConsultationBooking;
