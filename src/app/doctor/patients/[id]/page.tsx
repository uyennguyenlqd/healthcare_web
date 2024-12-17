"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Avatar, Card, Divider, List, Spin, Typography, Row, Col } from "antd";
import axios from "axios";

import { ENV } from "@/constants/env";

const { Title, Text } = Typography;

interface UserDetails {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  day_of_birth: string;
  avatar?: string;
}

interface AppointmentData {
  _id: string;
  date: string;
  status: string;
  isPaid: boolean;
  txnRef?: string;
  notes?: string;
  appointmentDate?: string;
  file_upload?: string;
  userDetails: UserDetails;
}

export default function PatientDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const [patientData, setPatientData] = useState<AppointmentData[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${ENV}/api/v1/doctor/detail_patient/${id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        setPatientData(response.data.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPatientDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!patientData || patientData.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Text type="danger">No patient details found.</Text>
      </div>
    );
  }

  const { userDetails } = patientData[0] || {};

  return (
    <div style={{ width: "90%", padding: "20px" }}>
      {/* User Information */}
      <Card style={{ marginBottom: "20px" }}>
        <Row gutter={16} align="middle">
          <Col>
            <Avatar size={150} src={userDetails.avatar} />
          </Col>
          <Col>
            <Title level={3} style={{ fontSize: "16px" }}>
              {`${userDetails.first_name} ${userDetails.last_name}`}
            </Title>
            <Text style={{ fontSize: "16px" }} strong>
              Email:{" "}
            </Text>
            {userDetails.email}
            <br />
            <Text style={{ fontSize: "16px" }} strong>
              Phone:{" "}
            </Text>
            {userDetails.phone}
            <br />
            <Text style={{ fontSize: "16px" }} strong>
              Gender:{" "}
            </Text>
            {userDetails.gender}
            <br />
            <Text style={{ fontSize: "16px" }} strong>
              Date of Birth:{" "}
            </Text>
            {new Date(userDetails.day_of_birth).toLocaleDateString()}
          </Col>
        </Row>
      </Card>

      <Divider />

      {/* Appointment History */}
      <Title level={4} style={{ fontSize: "16px" }}>
        Appointment History
      </Title>

      <List
        itemLayout="vertical"
        dataSource={patientData}
        renderItem={(item) => (
          <List.Item key={item._id} style={{ marginBottom: "16px" }}>
            <Card>
              <Text style={{ fontSize: "16px" }}>
                <strong>Appointment Date:</strong>{" "}
                {item.appointmentDate
                  ? new Date(item.appointmentDate).toLocaleDateString()
                  : "No date available"}
              </Text>
              <br />
              <Text style={{ fontSize: "16px" }}>
                <strong>Status:</strong> {item.status}
              </Text>

              {item.notes && (
                <Text style={{ fontSize: "16px" }}>
                  <strong>Notes:</strong> {item.notes}
                </Text>
              )}
              <br />
              {item.file_upload && (
                <Text style={{ fontSize: "16px" }}>
                  <strong>File:</strong>{" "}
                  <a
                    href={item.file_upload}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                </Text>
              )}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
