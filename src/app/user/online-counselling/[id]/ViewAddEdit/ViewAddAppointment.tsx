"use client";
import { useEffect, useState } from "react";
import { Tabs, TabsProps } from "antd";

import { DoctorApi } from "@/app/api/doctor";
import AddOnlineCounsellingTab from "@/components/addNewAppointment/addOnlineCounsellingTab";
import OnlineConfirmationTab from "@/components/addNewAppointment/appointmentConfirmation";
import ConsultationBooking from "@/components/user/consultationBooking";
import UserProfile from "@/components/user/userProfile";
import { DoctorModel } from "@/interfaces/models/doctors";

const onTabChange = (key: string) => {
  console.log(key);
};
interface OnlCounsellingProps {
  id: string;
}

const OnlineCounsellingTabs: React.FC<OnlCounsellingProps> = ({ id }) => {
  const [doctor, setDoctor] = useState<DoctorModel>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await DoctorApi.getDoctor(id);
        if (response && response.data && response.data.data) {
          setDoctor(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching doctor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);
  if (!doctor) {
    return null;
  }
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Add Online Counselling",
      children: <AddOnlineCounsellingTab doctor={doctor} />,
    },
    {
      key: "2",
      label: "Patient Record",
      children: <UserProfile />,
    },
    {
      key: "3",
      label: "Confirmation",
      children: <OnlineConfirmationTab />,
    },
    {
      key: "4",
      label: "Payment",
      children: "Content of Tab Pane 3",
    },
    {
      key: "5",
      label: "Receive an appointment",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <div
      style={{
        padding: "24px 96px",
        gap: "24px",
        backgroundColor: "#F9FBFC",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={onTabChange}
        type="line"
      />
      <ConsultationBooking doctor={doctor} />
    </div>
  );
};
export default OnlineCounsellingTabs;
