"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Button, Card } from "antd";

import AppointmentCard from "@/components/dashboard/doctor/ui_doctor_dashboard/AppointmentCard";
import { ENV } from "@/constants/env";

const RecentAppointment = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const { data: session } = useSession();
  useEffect(() => {
    // Gọi API để lấy danh sách cuộc hẹn
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${ENV}/api/v1/appointment`, {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });
        const data = await response.json();
        setAppointments(data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <Card
      title="Recent Appointments"
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
            key={appointment._id}
            appointmentId={appointment._id}
            appointmentDate={appointment.bookingDetails.appointmentDate}
            timeslot={appointment.bookingDetails.timeslot}
            status={appointment.status}
            first_name={appointment.userDetails[0]?.first_name}
            last_name={appointment.userDetails[0]?.last_name}
          />
        ))}
      </div>
    </Card>
  );
};

export default RecentAppointment;
