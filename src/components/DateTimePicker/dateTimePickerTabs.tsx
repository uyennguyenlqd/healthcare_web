import { Button, Typography } from "antd";

import { DoctorModel } from "@/interfaces/models/doctors";

interface DoctorCardProps {
  doctor: DoctorModel;
}

const DateTimeTabs: React.FC<DoctorCardProps> = ({ doctor }) => {
  const doctortimeslots = doctor?.timeslots || [];
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
        }}
      >
        Select counseling date
      </h3>
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
                border: "solid 0.2px rgba(152, 162, 179, 0.4)",
                borderRadius: "12px",
                padding: "10px 0",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "fit-content",
              }}
              onClick={() => {
                console.log(timeslot);
              }}
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
export default DateTimeTabs;
