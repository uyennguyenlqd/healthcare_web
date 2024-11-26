import { useRouter } from "next/navigation";
import { Button } from "antd";

import AboutDoctor from "./doctorDetail/aboutdoctor";

import { DoctorModel } from "@/interfaces/models/doctors";
interface DoctorOverviewSectionProps {
  doctor: DoctorModel;
}

const DoctorOverviewSection: React.FC<DoctorOverviewSectionProps> = ({
  doctor,
}) => {
  const router = useRouter();
  return (
    <div style={{ gap: "24px", display: "flex", flexDirection: "column" }}>
      <AboutDoctor doctor={doctor} />

      <div
        style={{
          display: "flex",
          gap: "4px",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1b61bd",
            color: "#fff",
            fontWeight: 500,
            fontSize: "18px",
            padding: "0px 20px",
            borderRadius: "8px",
            border: "1px solid #1677FF",
            minWidth: 144,
            height: "55px",
            letterSpacing: "1px",
          }}
          onClick={() => {
            router.push(
              `/user/online-counselling/${doctor._id}/add-onlcounselling`
            );
          }}
        >
          Book an Appointment
        </Button>
      </div>
    </div>
  );
};
export default DoctorOverviewSection;
