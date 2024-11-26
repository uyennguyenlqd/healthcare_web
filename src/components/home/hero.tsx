"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button, Flex } from "antd";

const Hero: React.FC = () => {
  const router = useRouter();
  return (
    <Flex
      style={{
        background: "#F0F8FF",
        padding: "0px 96px",
        alignItems: "flex-start",
        justifyContent: "space-between",
      }}
    >
      <Flex
        style={{
          flexDirection: "column",
          marginTop: "64px",
          gap: "24px",
        }}
      >
        {" "}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              color: "#10217D",
              textAlign: "start",
              lineHeight: "4.5rem",
              letterSpacing: "0.5px",
              maxWidth: "100%",
              margin: "32px 0px",
            }}
          >
            Transform Your Mind,
            <br />
            Transform Your Life!
          </h1>
          <h3
            style={{
              color: "#505050",
              textAlign: "start",
              margin: "24px 0",
              lineHeight: "2.5rem",
              letterSpacing: "0.2px",
              fontSize: "26px",
            }}
          >
            Our emotional health can vary from flourishing to facing
            difficulties.
            <br />
            No matter your current experience, there are proactive steps you can
            take to nurture your well-being and uplift those around you
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
            fontSize: "22px",
            padding: "8px 24px",
            borderRadius: "20px",
            border: "1px solid #1677FF",
            width: "300px",
            height: "64px",
            letterSpacing: "0.5px",
          }}
          onClick={() => {
            router.push("/user/contact");
          }}
        >
          LET US HELP
        </Button>
      </Flex>
      <div>
        <Image
          src="/icons/bg_doctor.png"
          alt="hero"
          width={700}
          height={700}
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
