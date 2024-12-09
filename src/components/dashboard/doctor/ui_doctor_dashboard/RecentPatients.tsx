import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import PatientCard from "./PatientCard";

const RecentPatients = () => {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    // Dữ liệu giả lập
    const fetchedPatients = [
      {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      {
        id: 2,
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      {
        id: 3,
        firstName: "Michael",
        lastName: "Brown",
        email: "michael.brown@example.com",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    ];
    setPatients(fetchedPatients);
  }, []);

  return (
    <Card
      title="Recent Patients"
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
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            avatar={patient.avatar}
            firstName={patient.firstName}
            lastName={patient.lastName}
            email={patient.email}
          />
        ))}
      </div>
    </Card>
  );
};

export default RecentPatients;
