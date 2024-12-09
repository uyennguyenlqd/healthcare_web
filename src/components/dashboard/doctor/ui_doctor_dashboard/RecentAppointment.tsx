import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import AppointmentCard from "./AppointmentCard";

const RecentAppointment = () => {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    // Dữ liệu giả lập
    const fetchedAppointments = [
      {
        id: 1,
        patientName: "John Doe",
        appointmentDate: "2024-12-02T10:00:00.000+07:00", // Định dạng ngày giờ cuộc hẹn
        timeslot: "10:00 AM - 10:30 AM", // Thời gian
        status: "approved", // Trạng thái cuộc hẹn
      },
      {
        id: 2,
        patientName: "Jane Smith",
        appointmentDate: "2024-12-01T14:00:00.000+07:00",
        timeslot: "2:00 PM - 2:30 PM",
        status: "pending",
      },
      {
        id: 3,
        patientName: "Michael Brown",
        appointmentDate: "2024-11-30T16:30:00.000+07:00",
        timeslot: "4:30 PM - 5:00 PM",
        status: "cancelled",
      },
    ];
    setAppointments(fetchedAppointments);
  }, []);

  return (
    <Card
      title="Recent Appointments"
      extra={
        <Button
          type="link"
          style={{
            fontSize: "16px",
            backgroundColor: "#1b61bd",
            color: "#ffff",
            fontWeight: "bold",
          }}
          onClick={() => {
            console.log("View All clicked");
          }}
        >
          View All
        </Button>
      }
      style={{
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: "solid 0.5px rgba(152, 162, 179, 0.4)",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointmentDate={appointment.appointmentDate}
            timeslot={appointment.timeslot}
            status={appointment.status}
            patientName={appointment.patientName}
          />
        ))}
      </div>
    </Card>
  );
};

export default RecentAppointment;
