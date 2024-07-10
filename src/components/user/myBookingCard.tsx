"use client";
import { useState } from "react";
import { ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Modal, notification, Typography } from "antd";

import { ENV } from "@/constants/env";
import { BookingModel } from "@/interfaces/models/booking";
interface BookingCardProps {
  booking: BookingModel;
}
const MyBookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleDeleteAppointment = async () => {
    try {
      const res = await fetch(`${ENV}/api/v1/booking/${booking._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (res.ok) {
        notification.success({ message: "Appointment deleted successfully" });
      } else {
        throw new Error(data.message || "Delete appointment failed");
      }
    } catch (error) {
      notification.error({ message: "Error deleting appointment" });
    } finally {
      setIsModalVisible(false);
    }
  };
  return (
    <Flex
      style={{
        border: "solid 0.2px rgba(152, 162, 179, 0.4)",
        borderRadius: "8px",
        padding: "16px 24px",

        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Flex gap={96}>
        <Avatar
          style={{ backgroundColor: "#E0E0E0" }}
          size={150}
          src={
            <img
              src={booking.doctor.avatar || "/icons/doctor02.png"}
              alt="doctor_card"
              style={{
                position: "relative",
                objectFit: "contain",
                objectPosition: "center bottom",
              }}
            />
          }
        />

        <Flex
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Typography
            style={{
              fontWeight: "bold",
              color: "#122853",
              fontSize: "18px",
              lineHeight: "48px",
              letterSpacing: "0.02em",
            }}
          >
            {booking.doctor.first_name} {booking.doctor.last_name}
          </Typography>

          <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <EnvironmentOutlined />
            <Typography
              style={{
                fontSize: "16px",
                color: "#303030",
                textAlign: "center",
                letterSpacing: "0.02em",
              }}
            >
              Appointment On {booking.appointmentDate}
            </Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <ClockCircleOutlined />
            <Typography
              style={{
                fontSize: "16px",
                color: "#303030",
                textAlign: "center",
                letterSpacing: "0.02em",
              }}
            >
              At Time {booking.timeslot}
            </Typography>
          </div>
        </Flex>
      </Flex>

      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#D80000",
          color: "#fff",
          fontWeight: 500,
          fontSize: "16px",
          padding: "0px 20px",
          borderRadius: "8px",
          border: "1px solid #D80000",

          height: "45px",
          letterSpacing: "1px",
        }}
        onClick={showModal}
      >
        Cancel Appointment
      </Button>
      <Modal
        title="Are you sure you want to cancel this appointment?"
        visible={isModalVisible}
        style={{ textAlign: "center", fontSize: "18px" }}
        onOk={handleDeleteAppointment}
        onCancel={() => {
          setIsModalVisible(false);
        }}
        okText="Yes"
        cancelText="No"
      />
    </Flex>
  );
};
export default MyBookingCard;
