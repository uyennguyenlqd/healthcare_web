import React, { useEffect, useState } from "react";
import { ClockCircleOutlined } from "@ant-design/icons"; // Biểu tượng đồng hồ
import { Button, Card, Col, Row, Statistic } from "antd";

const TotalSessions = () => {
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    // Giả lập danh sách phiên làm việc
    const fetchedSessions: any[] = [{}, {}, {}, {}, {}, {}]; // 6 sessions
    setSessions(fetchedSessions);
  }, []);

  const totalSessions = sessions.length;

  return (
    <Card
      title={
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>Sessions</span>
      }
      style={{
        border: "solid 0.5px rgba(152, 162, 179, 0.4)",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
      }}
      extra={<ClockCircleOutlined style={{ fontSize: 26, color: "#1890ff" }} />} // Biểu tượng đồng hồ
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
            value={totalSessions}
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
              console.log("View All Sessions clicked");
            }}
          >
            View Details
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TotalSessions;
