"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "antd";
import Typography from "antd/es/typography/Typography";

import { DoctorApi } from "@/app/api/doctor";
import { Specialty } from "@/interfaces/models/doctors";

const Expect_Spacialty: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [specialties, setSpecialty] = useState<Specialty[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleSpecialties, setVisibleSpecialties] = useState<Specialty[]>([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await DoctorApi.getAllSpecialty();
        if (response && response.data && response.data.data) {
          setSpecialty(response.data.data);
          setVisibleSpecialties(response.data.data.slice(0, 20));
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);
  const handleViewAll = () => {
    setVisibleSpecialties(specialties);
  };
  const handleSpecialtyClick = (specialtyId: string, specialtyName: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("specialty", specialtyId);
    searchParams.set("page", "1");
    router.push(`/user/online-counselling/search?${searchParams.toString()}`);
  };
  return (
    <div style={{ backgroundColor: "#F9FBFC", padding: "24px 96px" }}>
      <h3 style={{ color: "#10217D", fontSize: "32px" }}>
        Book appointments by specialty
      </h3>

      <div
        style={{
          padding: "24px 0",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",

          gap: "20px",
        }}
      >
        {visibleSpecialties.map((specialty, idx) => (
          <Button
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              border: "solid 0.2px rgba(152, 162, 179, 0.4)",
              borderRadius: "8px",
              padding: "10px",
              background: "#F0F8FF",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "fit-content",
            }}
            onClick={() =>
              handleSpecialtyClick(specialty._id, specialty.name_specialty)
            }
          >
            <Image
              src={specialty.icon || "/icons/icons_specialty/icon01.png"}
              alt="specialty"
              width={50}
              height={50}
              style={{
                position: "relative",
                objectFit: "contain",
                objectPosition: "center bottom",
              }}
            />

            <Typography
              style={{
                fontWeight: "bold",
                color: "#122853",
                fontSize: "14px",
              }}
            >
              {" "}
              {specialty.name_specialty}
            </Typography>
          </Button>
        ))}
      </div>
      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          color: "#1b61bd",
          fontSize: "16px",
          border: 0,
          padding: 0,
          boxShadow: "none",
          width: "fit-content",
        }}
        onClick={handleViewAll}
      >
        View All
      </Button>
    </div>
  );
};
export default Expect_Spacialty;
