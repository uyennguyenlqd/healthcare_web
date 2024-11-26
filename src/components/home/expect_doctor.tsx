"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Flex } from "antd";
import Typography from "antd/es/typography/Typography";

import { DoctorApi } from "@/app/api/doctor";
import { DoctorModel } from "@/interfaces/models/doctors";
const Doctor: React.FC = () => {
  const [doctors, setDoctors] = useState<DoctorModel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await DoctorApi.getAllDoctor();
        if (response && response.data && response.data.data) {
          setDoctors(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);
  return (
    <div style={{ backgroundColor: "#F8F8F8	", padding: "24px 96px 0px 96px" }}>
      <h3 style={{ color: "#10217D", fontSize: "36px" }}>Best Therapist</h3>
      {/* TO DO ADD Carousel */}
      <Flex
        style={{
          gap: "32px",
          overflow: "auto",
        }}
      >
        {doctors.map((doctor, idx) => (
          <Link
            key={idx}
            href={`/user/online-counselling/${doctor._id}`}
            passHref
          >
            <Flex
              key={idx}
              style={{
                flexDirection: "column",
                border: "solid 1px rgba(152, 162, 179, 0.4)",
                boxShadow: "2px 1px 2px 1px rgba(0,0,0,0.05)",
                borderRadius: "12px",
                padding: "16px 8px",
              }}
            >
              <Image
                src={doctor.avatar || "/icons/doctor_img.png"}
                alt="doctor"
                width={300}
                height={300}
                style={{
                  position: "relative",
                  objectFit: "contain",
                  objectPosition: "center bottom",
                  
                }}
              />

              <Flex
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "32px",
                  gap: "8px",
                }}
              >
                <Typography
                  style={{
                    fontWeight: "bold",
                    color: "#122853",
                    fontSize: "22px",
                  }}
                >
                  {doctor.first_name} {doctor.last_name}
                </Typography>

                <Typography
                  style={{
                    fontSize: "18px",
                    color: "#6C757D",
                    textAlign: "center",
                  }}
                >
                  {doctor.hospital?.hospital_name}
                </Typography>
              </Flex>
            </Flex>
          </Link>
        ))}
      </Flex>
    </div>
  );
};
export default Doctor;
