"use client";
import Image from "next/image";
import { Button, Flex } from "antd";
import SearchSection from "./search";
import Search from "antd/es/input/Search";
import { useState } from "react";
const Hero: React.FC = () => {
  return (
    <Flex
      style={{
        background: "#F0F8FF",
        padding: "0 96px",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <Flex
        style={{
          flexDirection: "column",
          marginTop: "100px",
        }}
      >
        {" "}
        <div>
          <h1
            style={{
              fontSize: "3.4rem",
              color: "#10217D",
              textAlign: "start",
              lineHeight: "3.6rem",
              maxWidth: "100%",
              margin: "24px 0",
            }}
          >
            We Are Ready to Help Your Health Problems
          </h1>
          <h3
            style={{
              color: "#0F053B",
              textAlign: "start",
              margin: "16px 0",
              lineHeight: "1.8rem",
              letterSpacing: "0.3px",
            }}
          >
            {" "}
            Empowering You to Thrive Every Day{" "}
          </h3>
        </div>
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
            borderRadius: "30px",
            border: "1px solid #1677FF",
            width: "fit-content",
            height: "50px",
            letterSpacing: "0.5px",
          }}
          onClick={() => {
            console.log("button");
          }}
        >
          LET US HELP
        </Button>
      </Flex>
      <div>
        <Image
          src="/icons/bg_doctor.png"
          alt="hero"
          width={600}
          height={500}
          style={{
            position: "relative",
            objectFit: "contain",
            objectPosition: "center bottom",
            // marginRight: "36px",
          }}
        />
      </div>
    </Flex>
  );
};
export default Hero;
