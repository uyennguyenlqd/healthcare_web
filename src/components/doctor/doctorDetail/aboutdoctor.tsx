"use client";
import { Button } from "antd";
import Typography from "antd/es/typography/Typography";

import { DoctorModel } from "@/interfaces/models/doctors";
interface DoctorDetailInfoProps {
  doctor: DoctorModel;
}
const AboutDoctor: React.FC<DoctorDetailInfoProps> = ({ doctor }) => {
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
        About Me
      </h3>
      <div>
        <Typography
          style={{ marginTop: "32px", fontSize: "16px", maxWidth: "900px" }}
        >
          {doctor.bio}
        </Typography>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            color: "#1b61bd",
            fontSize: "14px",
            border: 0,
            padding: 0,
            boxShadow: "none",
            width: "fit-content",
            marginTop: "10px",
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
export default AboutDoctor;
