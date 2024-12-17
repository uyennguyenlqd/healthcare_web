import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import PatientCard from "./PatientCard";
import { useSession } from "next-auth/react";
import { ENV } from "@/constants/env";

const RecentPatients = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const { data: session } = useSession();
  useEffect(() => {
    // Fetching the data from the API
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${ENV}/api/v1/doctor/regular-patient`, {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          // Transform the API response data to match your state structure
          const transformedPatients = data.data.map((patient: any) => ({
            id: patient.userDetails._id,
            firstName: patient.userDetails.first_name,
            lastName: patient.userDetails.last_name,
            email: patient.userDetails.email,
            avatar: patient.userDetails.avatar,
          }));

          setPatients(transformedPatients);
        } else {
          console.error("Failed to fetch patient data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPatients();
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
