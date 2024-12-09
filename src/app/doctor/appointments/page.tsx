"use client";

import { PlusOutlined } from "@ant-design/icons";

import AppointmentTable from "./Appointments/AppointmentTable";

import SharedButton from "@/components/dashboard/admin/button/SharedButton";
import { c } from "@/utils/string";
const AppointmentPage = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <SharedButton
          // eslint-disable-next-line react/jsx-no-undef
          icon={<PlusOutlined style={{ fontSize: "18px" }} />}
          onClick={() => {
            console.log("View All Sessions clicked");
          }}
          title={c("ADD NOTES")}
          customType="action"
          customSize="lg"
        />
      </div>

      <AppointmentTable />
    </div>
  );
};
export default AppointmentPage;
