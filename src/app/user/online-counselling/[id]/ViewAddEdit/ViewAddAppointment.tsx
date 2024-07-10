"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Tabs, TabsProps } from "antd";

import { DoctorApi } from "@/app/api/doctor";
import AddOnlineCounsellingTab from "@/components/addNewAppointment/addOnlineCounsellingTab";
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

  const [selectedTimeslot, setSelectedTimeslot] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>("1");
  const [notes, setNotes] = useState<string>("");
  const [uploadUrl, setUploadUrl] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (!loading && !session?.user) {
      router.push("/auth/login");
    }
  }, [loading, router, session]);

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
  const handleSelectTimeAndDate = (timeslot: string, date: string) => {
    setSelectedTimeslot(timeslot);
    setSelectedDate(date);
    setCurrentTab("2");
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Add Online Counselling",
      children: (
        <AddOnlineCounsellingTab
          doctor={doctor}
          onSelectTime={setSelectedTimeslot}
          onSelectDate={setSelectedDate}
        />
      ),
    },
    {
      key: "2",
      label: "Patient Record",
      children: (
        <UserProfile onChangeNotes={setNotes} uploadedFileUrl={setUploadUrl} />
      ),
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
      <ConsultationBooking
        doctor={doctor}
        selectedTimeslot={selectedTimeslot}
        selectedDate={selectedDate}
        notes={notes}
        url={uploadUrl}
      />
    </div>
  );
};
export default OnlineCounsellingTabs;
