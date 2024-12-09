"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Form,
  Input,
  notification,
  Select,
  Spin,
  Tag,
  Typography,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";

import { ENV } from "@/constants/env";

export default function DetailBooking({
  params: { id },
}: {
  params: { id: string };
}) {
  console.log("DetailBooking rendered with id:", id);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState<any>(null);

  const { data: session } = useSession();
  useEffect(() => {
    // Lấy dữ liệu booking từ API khi component được mount
    const fetchBookingDetail = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${ENV}/api/v1/doctor/bookings/${id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        console.log("Response Data:", response.data);

        setBookingData(response.data.data);
        console.log(response.data.data.isPaid);
        form.setFieldsValue({
          first_name: response.data.data.user.first_name,
          last_name: response.data.data.user.last_name,
          gender: response.data.data.user.gender,
          email: response.data.data.user.email,
          appointmentDate: dayjs(response.data.data.appointmentDate).format(
            "YYYY-MM-DD"
          ),
          timeslot: response.data.data.timeslot,
          status: response.data.data.status,
          paymentAmount: response.data.data.paymentAmount,
          meet_link: response.data.data.doctor.meet_link,
          isPaid: response.data.data.isPaid ? "Yes" : "No",
        });
      } catch (error) {
        console.error("Error fetching booking detail:", error);
        notification.error({
          message: "Failed to fetch booking details",
          description:
            "There was an issue fetching the booking details. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetail();
  }, [id]);

  const handleUpdateMeetingLink = (
    newMeetingLink: string,
    provider: string
  ) => {
    setLoading(true);
    setTimeout(() => {
      notification.success({
        message: `Meeting link updated successfully with ${provider}!`,
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <div
      style={{
        padding: "24px 96px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: "8px",
        gap: "16px",
        margin: "auto",
        width: "100%",
      }}
    >
      {loading && <Spin size="large" />}
      {bookingData && (
        <>
          <div style={{ display: "flex", gap: "96px" }}>
            <Avatar
              size={150}
              src={bookingData.user.avatar}
              icon={<UserOutlined />}
            ></Avatar>
            <div>
              <Typography.Title
                level={3}
                style={{
                  color: "#10217D",
                  fontSize: "28px",
                  alignItems: "center",
                }}
              >
                Booking Details
              </Typography.Title>
              <Tag color={bookingData.status === "approved" ? "green" : "red"}>
                {bookingData.status}
              </Tag>
              <Tag color={bookingData.isPaid ? "blue" : "orange"}>
                {bookingData.isPaid ? "Paid" : "Unpaid"}
              </Tag>
            </div>
          </div>
          <Form layout="vertical" form={form}>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Form.Item label="Patient First Name" name="first_name">
                <Input
                  size="large"
                  type="text"
                  style={{ border: "1px solid #7E7E7E" }}
                  disabled
                />
              </Form.Item>
              <Form.Item label="Patient Last Name" name="last_name">
                <Input
                  size="large"
                  type="text"
                  style={{ border: "1px solid #7E7E7E" }}
                  disabled
                />
              </Form.Item>
            </div>
            <Form.Item label="Gender" name="gender">
              <Input size="large" disabled />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input size="large" disabled />
            </Form.Item>
            <Form.Item label="Date" name="appointmentDate">
              <Input size="large" disabled />
            </Form.Item>
            <Form.Item label="Timeslot" name="timeslot">
              <Input size="large" disabled />
            </Form.Item>
            <Form.Item label="Note" name="notes">
              <Input size="large" disabled />
            </Form.Item>
          </Form>
          <Form
            layout="vertical"
            form={form}
            style={{
              border: "1px solid var(--border-color, #d8d8d8)", // Border color
              borderRadius: "8px", // Optional: Adds rounded corners
              padding: "16px", // Optional: Adds padding inside the form
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between", // Tách hai phần ra hai bên
                alignItems: "center", // Căn giữa theo trục dọc
                marginBottom: "16px",
              }}
            >
              <h2 style={{ marginBottom: "16px" }}>JOIN THE MEETING</h2>

              <Button
                type="primary"
                size="large"
                // onClick={() =>
                //   window.open(bookingData.doctor.meet_link, "_blank")
                // }
                onClick={() => {
                  const meetLink = bookingData?.doctor?.meet_link;
                  // Kiểm tra và thêm tiền tố giao thức nếu thiếu
                  const formattedLink = meetLink.startsWith("http")
                    ? meetLink
                    : `https://${meetLink}`;
                  window.open(formattedLink, "_blank");
                }}
                style={{
                  fontSize: "16px",
                  padding: "12px 24px",
                  height: "auto",
                  marginTop: "16px",
                }}
              >
                JOIN HERE
              </Button>
            </div>
            <Form.Item
              label="Meeting Provider"
              name="meetingProvider"
              initialValue="googlemeet"
            >
              <Select size="large" disabled>
                <Select.Option value="googlemeet">Google Meet</Select.Option>
                <Select.Option value="zoom">Zoom</Select.Option>
                <Select.Option value="teams">Microsoft Teams</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
}
