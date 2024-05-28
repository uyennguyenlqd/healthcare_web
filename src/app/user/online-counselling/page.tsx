import { Divider, Flex } from "antd";

import DoctorList from "@/components/doctor/doctorList";
import DoctorFilter from "@/components/doctorFilter/doctor_filter";

export default function OnlineCounselling() {
  return (
    <Flex
      style={{
        flexDirection: "column",
        padding: "24px 96px",
        backgroundColor: "#F9FBFC",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "0.6fr 0fr 1.4fr",
          gap: "32px",
        }}
      >
        <DoctorFilter />
        <Divider type="vertical" style={{ height: "100%" }} />
        <DoctorList />
      </div>

      {/* <HealthConsultant /> */}
    </Flex>
  );
}
