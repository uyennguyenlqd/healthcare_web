import React from "react";
import { Card, Row, Col, Typography, Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface AppointmentProps {
  appointmentDate: string;
  timeslot: string;
  status: string;
  patientName: string;
}

const AppointmentCard: React.FC<AppointmentProps> = ({
  appointmentDate,
  timeslot,
  status,
  patientName,
}) => {
  const formattedDate = new Date(appointmentDate).toLocaleDateString(); // Định dạng ngày
  const formattedStatus =
    {
      approved: "Approved",
      pending: "Pending",
      cancelled: "Cancelled",
    }[status] || "Unknown";

  // Màu sắc cho trạng thái
  const statusColor =
    {
      approved: "green",
      pending: "orange",
      cancelled: "red",
    }[status] || "gray";

  return (
    <Card
      style={{
        width: "100%",

        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
      title="Appointment"
      extra={
        <ClockCircleOutlined style={{ color: statusColor, fontSize: "24px" }} />
      }
    >
      <Row justify="space-between">
        <Col span={16}>
          <Title level={5}>{patientName}</Title>
          <Text style={{ fontSize: "16px", color: "#888" }}>
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
          <Tag
            color={statusColor}
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              width: "150px",
              height: "40px",
              display: "flex", // Thêm display: flex
              justifyContent: "center", // Căn giữa ngang
              alignItems: "center", // Căn giữa dọc
            }}
          >
            {formattedStatus}
          </Tag>
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

export default AppointmentCard;
