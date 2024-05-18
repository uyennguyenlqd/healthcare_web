"use client";
import React, { Fragment } from "react";
import Image from "next/image";
import { Avatar, Button, Flex } from "antd";
import Typography from "antd/es/typography/Typography";

const DoctorCard: React.FC = () => {
  return (
    <div>
      <Flex
        style={{
          // width: "fit-content",
          border: "solid 0.2px rgba(152, 162, 179, 0.4)",
          borderRadius: "8px",
          padding: "24px",
          gap: "24px",
          justifyContent: "space-evenly",
        }}
      >
        <Avatar
          style={{ backgroundColor: "#E0E0E0" }}
          size={150}
          src={
            <img
              src={"/icons/doctor02.png"}
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
            BS.CK2 Y K Mishra
          </Typography>
          <Typography
            style={{
              fontSize: "16px",
              color: "#303030",
              textAlign: "center",
              lineHeight: "24px",
              letterSpacing: "0.02em",
            }}
          >
            Nhi Khoa
          </Typography>
          <Typography
            style={{
              fontSize: "16px",
              color: "#303030",
              textAlign: "center",
              letterSpacing: "0.02em",
            }}
          >
            01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh
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
              console.log("button");
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
  );
};
export default DoctorCard;
