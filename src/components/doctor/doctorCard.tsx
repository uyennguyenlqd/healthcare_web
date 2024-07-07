"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { StarFilled } from "@ant-design/icons";
import { Avatar, Button, Flex } from "antd";
import Typography from "antd/es/typography/Typography";

import { DoctorModel } from "@/interfaces/models/doctors";
interface DoctorCardProps {
  doctor: DoctorModel;
}
const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const router = useRouter();

  return (
    <Link
      key={doctor._id}
      href={`/user/online-counselling/${doctor._id}`}
      passHref
    >
      <div>
        <Flex
          style={{
            border: "solid 0.2px rgba(152, 162, 179, 0.4)",
            borderRadius: "8px",
            padding: "16px 24px",
            gap: "24px",
            justifyContent: "space-between",
          }}
        >
          <Avatar
            style={{ backgroundColor: "#E0E0E0" }}
            size={150}
            src={
              <img
                src={doctor.avatar || "/icons/doctor02.png"}
                alt="doctor_card"
                style={{
                  position: "relative",
                  objectFit: "contain",
                  objectPosition: "center bottom",
                }}
              />
            }
          />

          <Flex
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              width: "275px",
            }}
          >
            <Typography
              style={{
                fontWeight: "bold",
                color: "#122853",
                fontSize: "18px",
                lineHeight: "48px",
                letterSpacing: "0.02em",
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
              <StarFilled style={{ color: "	#FFD700	", fontSize: "18px" }} />
            </div>

            <Typography
              style={{
                fontSize: "16px",
                color: "#303030",
                textAlign: "center",
                lineHeight: "24px",
                letterSpacing: "0.02em",
              }}
            >
              {doctor.specialty?.name_specialty}
            </Typography>
            <Typography
              style={{
                fontSize: "16px",
                color: "#303030",
                textAlign: "center",
                letterSpacing: "0.02em",
              }}
            >
              {doctor.hospital?.hospital_name}
            </Typography>
          </Flex>
          <Flex
            style={{
              flexDirection: "column",
              gap: "8px",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#1b61bd",
                color: "#fff",
                fontWeight: 500,
                fontSize: "16px",
                padding: "0px 20px",
                borderRadius: "8px",
                border: "1px solid #1677FF",
                minWidth: 144,
                height: "45px",
                letterSpacing: "1px",
              }}
              onClick={() => {
                router.push("/user/online-counselling/2/add-onlcounselling");
              }}
            >
              Book an Appointment
            </Button>
            <Button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#17C256",
                color: "#fff",
                fontWeight: 500,
                fontSize: "16px",
                padding: "0px 20px",
                borderRadius: "8px",
                border: "1px solid #17C256",
                minWidth: 144,
                height: "45px",
                letterSpacing: "1px",
              }}
              onClick={() => {
                console.log("button");
              }}
            >
              Call Video Now
            </Button>
          </Flex>
        </Flex>
      </div>
    </Link>
  );
};
export default DoctorCard;
