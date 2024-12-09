import React from "react";
import { Card, Button, Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

// Định nghĩa interface cho PatientCard
interface PatientProps {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
}

const PatientCard: React.FC<PatientProps> = ({
  avatar,
  firstName,
  lastName,
  email,
}) => {
  return (
    <Card
      hoverable
      style={{
        width: "100%",
        padding: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        border: "solid 0.5px rgba(152, 162, 179, 0.4)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "16px" }}>
          <Avatar size={64} icon={<UserOutlined />} src={avatar} />
          <div>
            <Typography
              style={{ fontSize: "18px", fontWeight: "bold" }}
            >{`${firstName} ${lastName}`}</Typography>
            <Typography style={{ fontSize: "16px", fontWeight: "400" }}>
              {email}
            </Typography>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              border: "solid 0.5px rgba(152, 162, 179, 0.4)",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              fontWeight: "500",
              fontSize: "16px",
              width: "150px",
              height: "40px",
            }}
            onClick={() => {
              console.log(`View details of ${firstName} ${lastName}`);
            }}
          >
            View Detail
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PatientCard;
