"use client";

import RecentAppointment from "../appointments/page";

import RecentPatients from "@/components/dashboard/doctor/ui_doctor_dashboard/RecentPatients";
import TotalAppointment from "@/components/dashboard/doctor/ui_doctor_dashboard/TotalAppointment";
import TotalPatients from "@/components/dashboard/doctor/ui_doctor_dashboard/TotalPatients";
import TotalSessions from "@/components/dashboard/doctor/ui_doctor_dashboard/TotalSessions";

export default function DashboardDoctorPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div style={{ display: "flex", gap: "24px", width: "80%" }}>
        <TotalAppointment />
        <TotalPatients />
        <TotalSessions />
      </div>
      <div style={{ display: "flex", gap: "24px" }}>
        <RecentAppointment />
        <RecentPatients />
      </div>
    </div>
  );
}
