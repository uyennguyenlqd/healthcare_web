"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Card, Col, Descriptions, Row, Spin, Typography } from "antd";
import axios from "axios";

import { ENV } from "@/constants/env";
import { DoctorModel } from "@/interfaces/models/doctors";

const { Title } = Typography;

export default function DoctorDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const [doctor, setDoctor] = useState<DoctorModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(
          `${ENV}/api/v1/doctor/get_doctor/${id}`
        );
        if (response.data.success) {
          setDoctor(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spin tip="Loading doctor details..." />
      </div>
    );
  }

  if (!doctor) {
    return <p>Doctor not found.</p>;
  }

  return (
    <Row justify="center" style={{ marginTop: 20 }}>
      <Col
        xs={24}
        sm={20}
        md={16}
        lg={14}
        style={{ maxWidth: "90%", padding: "0 10px" }}
      >
        <Card style={{ width: "100%" }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={6}>
              <Avatar
                src={doctor.avatar}
                size={120}
                alt={`${doctor.first_name} ${doctor.last_name}`}
              />
            </Col>
            <Col xs={24} sm={18}>
              <Title level={3} style={{ fontSize: "28px" }}>
                {doctor.first_name} {doctor.last_name}
              </Title>
              <p style={{ fontSize: "16px" }}>
                <strong>Specialty:</strong>{" "}
                {doctor.specialty?.name_specialty || "N/A"}
              </p>
              <p style={{ fontSize: "16px" }}>
                <strong>Hospital:</strong>{" "}
                {doctor.hospital?.hospital_name || "N/A"}
              </p>
              <p style={{ fontSize: "16px" }}>
                <strong>Bio:</strong> {doctor.bio || "No bio available"}
              </p>
            </Col>
          </Row>
          <Descriptions
            title="Doctor Information"
            bordered
            column={1}
            style={{ marginTop: 20, fontSize: "16px" }}
          >
            <Descriptions.Item label="Email">{doctor.email}</Descriptions.Item>
            <Descriptions.Item label="Reviews">
              {doctor.reviews.length > 0 ? doctor.reviews.length : "No reviews"}
            </Descriptions.Item>
            <Descriptions.Item label="Experience">
              {doctor.experiences.length > 0
                ? `${doctor.experiences[0].years} years in practice`
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Rating">
              {doctor.averageRating} ({doctor.totalRating} ratings)
            </Descriptions.Item>
            <Descriptions.Item label="Ticket Price">
              {doctor.ticketPrice ? `${doctor.ticketPrice} VND` : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Address">
              {doctor.hospital?.address || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Website">
              <a
                href={doctor.hospital?.website_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "16px" }}
              >
                Visit Hospital Website
              </a>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  );
}
