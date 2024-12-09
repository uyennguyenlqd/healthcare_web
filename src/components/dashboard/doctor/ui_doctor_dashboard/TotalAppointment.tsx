import React, { useEffect, useState } from "react";
import { CalendarOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Statistic } from "antd";

const TotalAppointment = () => {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const fetchedAppointments: any[] = [{}, {}, {}, {}, {}, {}, {}, {}];
    setAppointments(fetchedAppointments);
  }, []);

  const totalAppointments = appointments.length;

  return (
    <Card
      title={
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          Appointments
        </span>
      }
      style={{
        border: "solid 0.5px rgba(152, 162, 179, 0.4)",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
      }}
      extra={<CalendarOutlined style={{ fontSize: 26, color: "#1890ff" }} />}
    >
      <Row>
        <Col span={24}>
          <Statistic
            title={
              <span style={{ fontSize: "18px", color: "#888" }}>Total</span>
            }
            valueStyle={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#1b61bd",
            }}
            value={totalAppointments}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Col span={24}>
          <Button
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              backgroundColor: "transparent",
              color: "#1b61bd",
              fontSize: "18px",
              border: 0,
              padding: 0,
              boxShadow: "none",
              width: "fit-content",

              cursor: "pointer",
            }}
            onClick={() => {
              //TODO
              console.log("View All clicked");
            }}
          >
            View Details
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TotalAppointment;
