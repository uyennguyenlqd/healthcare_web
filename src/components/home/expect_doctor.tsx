"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { StarFilled } from "@ant-design/icons";
import { Flex } from "antd";
import Typography from "antd/es/typography/Typography";

import { DoctorApi } from "@/app/api/doctor";
import { DoctorModel } from "@/interfaces/models/doctors";
import Link from "next/link";
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
    <div style={{ backgroundColor: "#F8F8F8	", padding: "24px 96px" }}>
      <h3 style={{ color: "#10217D", fontSize: "32px" }}>Best Doctor</h3>
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
                border: "solid 0.5px rgba(152, 162, 179, 0.4)",
                boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <Image
                src={doctor.avatar || "/icons/doctor_img.png"}
                alt="doctor"
                width={250}
                height={250}
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
                  marginTop: "10px",
                }}
              >
                <div style={{ display: "flex", gap: "16px" }}>
                  <Typography
                    style={{
                      fontWeight: "bold",
                      color: "#122853",
                      fontSize: "16px",
                    }}
                  >
                    {doctor.first_name} {doctor.last_name}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "4px",
                    }}
                  >
                    <Typography
                      style={{
                        fontSize: "16px",
                        color: "#303030",
                        textAlign: "center",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {doctor.averageRating}
                    </Typography>
                    <StarFilled
                      style={{ color: "	#FFD700	", fontSize: "18px" }}
                    />
                  </div>
                </div>
                <Typography
                  style={{
                    fontSize: "14px",
                    color: "#303030",
                    textAlign: "center",
                  }}
                >
                  {doctor.specialty?.name_specialty}
                </Typography>
                <Typography
                  style={{
                    fontSize: "14px",
                    color: "#303030",
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
