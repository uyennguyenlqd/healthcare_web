import React, { useEffect, useState } from "react";
import { TeamOutlined } from "@ant-design/icons"; // Biểu tượng nhóm
import { Button, Card, Col, Row, Statistic } from "antd";
import axios from "axios"; // Giả sử bạn sử dụng axios để gửi yêu cầu HTTP
import { ENV } from "@/constants/env";
import { useSession } from "next-auth/react";

const TotalPatients = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: session } = useSession();
  useEffect(() => {
    // Gọi API để lấy danh sách bệnh nhân
    const fetchPatients = async () => {
      try {
        setLoading(true); // Đang tải
        const res = await fetch(`${ENV}/api/v1/doctor/regular-patient`, {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });
        const data = await res.json();
        setPatients(data.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false); // Xong tải
      }
    };

    fetchPatients();
  }, []);

  const totalPatients = patients.length; // Tính tổng số bệnh nhân

  return (
    <Card
      title={
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>Patients</span>
      }
      style={{
        border: "solid 0.5px rgba(152, 162, 179, 0.4)",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%",
      }}
      extra={<TeamOutlined style={{ fontSize: 26, color: "#1890ff" }} />}
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
            value={loading ? "Loading..." : totalPatients} // Hiển thị Loading nếu đang tải
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
              //TODO: Xử lý khi nhấn "View All Patients"
              console.log("View All Patients clicked");
            }}
          >
            View Details
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TotalPatients;
