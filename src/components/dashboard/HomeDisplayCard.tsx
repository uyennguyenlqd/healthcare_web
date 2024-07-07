import React from "react";
import { CalendarOutlined } from "@ant-design/icons";

import NewButton from "./NewButton";

type HomeDisplayCardProps = {
  count: number;
  newAppointmentLink: string;
  title: string;
};
export default function HomeDisplayCard({
  count,
  newAppointmentLink,
  title,
}: HomeDisplayCardProps) {
  return (
    <div
      style={{
        display: "flex",
        height: "50%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          textAlign: "center",
          borderWidth: "1px",
          borderColor: "#E5E7EB",
          boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
          borderRadius: "0.375rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.25rem",
          fontSize: "0.875rem",
        }}
      >
        <CalendarOutlined />
        <div className="py-3">
          {" "}
          <p>
            You have {count} {title}s today.
          </p>
        </div>
        <NewButton title={`New ${title}`} href={newAppointmentLink} />
      </div>
    </div>
  );
}
