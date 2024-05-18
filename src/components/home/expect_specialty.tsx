"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import { Button, Flex } from "antd";
import Typography from "antd/es/typography/Typography";

const mock: any = [{}, {}, {}, {}, {}, {}, {}, {}];
const Expect_Spacialty: React.FC = () => {
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
        {mock.map((_: any, idx: React.Key | null | undefined) => (
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
            onClick={() => {
              console.log("button");
            }}
          >
            <Image
              src="/icons/icons_specialty/icon01.png"
              alt="doctor"
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
                fontSize: "18px",
              }}
            >
              {" "}
              Heart
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
        onClick={() => {
          console.log("button");
        }}
      >
        View All
      </Button>
    </div>
  );
};
export default Expect_Spacialty;
