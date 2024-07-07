"use client";
import { useEffect, useState } from "react";
import { Flex, Tabs, TabsProps } from "antd";

import { DoctorApi } from "@/app/api/doctor";
import DoctorDetailInfo from "@/components/doctor/doctorDetail/doctorDetailInfo";
import FeedbackSection from "@/components/doctor/doctorDetail/feedbackDoctor";
import DoctorOverviewSection from "@/components/doctor/doctorOverview";
import { DoctorModel } from "@/interfaces/models/doctors";
interface ViewDoctorDetailProps {
  id: string;
}
const ViewDoctorDetail: React.FC<ViewDoctorDetailProps> = ({ id }) => {
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
      label: "OverView",
      children: <DoctorOverviewSection doctor={doctor} />,
    },
    {
      key: "2",
      label: "Feedback",
      children: <FeedbackSection doctor={doctor} />,
    },
  ];
  const onTabChange = (key: string) => {
    console.log(key);
  };
  return (
    <div style={{ padding: "24px 96px", backgroundColor: "#F9FBFC" }}>
      <Flex
        style={{
          flexDirection: "column",
          padding: "24px 96px",
          backgroundColor: "#F9FBFC",
          gap: "24px",

          width: "900px",
          margin: "auto",
        }}
      >
        <DoctorDetailInfo doctor={doctor} />
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={onTabChange}
          type="line"
        />
      </Flex>
    </div>
  );
};
export default ViewDoctorDetail;
