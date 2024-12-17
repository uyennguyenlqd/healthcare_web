import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CalendarOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Statistic } from "antd";
import axios from "axios";

import { ENV } from "@/constants/env";

const TotalBooking = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    // Fetch dữ liệu cuộc hẹn từ API
    const fetchAppointments = async () => {
      try {
        // Giả sử API trả về danh sách cuộc hẹn
        const response = await axios.get(`${ENV}/api/v1/doctor/bookings`, {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });

        setBookings(response.data.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchAppointments(); // Gọi hàm fetch khi component mount
  }, []); // Chạy một lần khi component được render lần đầu

  const totalBooking = bookings.length; // Tính tổng số cuộc hẹn

  return (
    <Card
      title={
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>Bookings</span>
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
            value={totalBooking} // Hiển thị tổng số cuộc hẹn
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
              console.log("View All clicked");
              // TODO: Chuyển hướng hoặc hiển thị chi tiết cuộc hẹn
            }}
          >
            View Details
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default TotalBooking;
