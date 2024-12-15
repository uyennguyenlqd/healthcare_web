import React from "react";
import { useRouter } from "next/navigation";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Button, Typography } from "antd";

const { Title, Text } = Typography;

interface AppointmentProps {
  appointmentId: string; // ID cuộc hẹn
  appointmentDate: string;
  timeslot: string;
  first_name: string; // Tên
  last_name: string; // Họ
}

const UserAppointmentCard: React.FC<AppointmentProps> = ({
  appointmentId,
  appointmentDate,
  timeslot,
  first_name,
  last_name,
}) => {
  const router = useRouter();
  const formattedDate = new Date(appointmentDate).toLocaleDateString();

  // Tên bệnh nhân
  const patientName = `${first_name} ${last_name}`;

  // Hàm chuyển hướng tới chi tiết cuộc hẹn
  const handleClick = () => {
    router.push(`/user/booking/counselling-records/${appointmentId}`);
  };

  return (
    <Card
      style={{
        width: "100%",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
      title={
        <a
          onClick={handleClick}
          style={{ color: "#1b61bd", fontWeight: "bold", cursor: "pointer" }}
        >
          Appointment ID: {appointmentId}
        </a>
      }
      extra={
        <ClockCircleOutlined style={{ color: "#1b61bd", fontSize: "24px" }} />
      }
    >
      <Row justify="space-between">
        <Col span={16}>
          <Title
            style={{ marginTop: "8px", fontSize: "18px", fontWeight: 500 }}
            level={5}
          >
            {patientName}
          </Title>
          <Text style={{ fontSize: "16px" }}>
            {`Appointment Date: ${formattedDate}`}
          </Text>
        </Col>
        <Col
          span={8}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* Nút "View Detail" */}
          <Button
            type="primary"
            onClick={handleClick}
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              width: "150px",
              height: "40px",
            }}
          >
            View Detail
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col span={24}>
          <Text style={{ fontSize: "16px", color: "#555" }}>
            {`Time Slot: ${timeslot}`}
          </Text>
        </Col>
      </Row>
    </Card>
  );
};

export default UserAppointmentCard;
