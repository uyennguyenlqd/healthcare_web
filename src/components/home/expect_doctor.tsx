import React, { Fragment } from "react";
import Image from "next/image";
import { Flex } from "antd";
import Typography from "antd/es/typography/Typography";

const mock: any = [{}, {}, {}, {}, {}, {}, {}];
const Doctor: React.FC = () => {
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
        {mock.map((_: any, idx: React.Key | null | undefined) => (
          <Flex
            key={idx}
            style={{
              flexDirection: "column",
              border: "solid 0.2px rgba(152, 162, 179, 0.4)",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <Image
              src="/icons/doctor_img.png"
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
              <Typography
                style={{
                  fontWeight: "bold",
                  color: "#122853",
                  fontSize: "16px",
                }}
              >
                BS.CK2 Y K Mishra
              </Typography>
              <Typography
                style={{
                  fontSize: "14px",
                  color: "#303030",
                  textAlign: "center",
                }}
              >
                Nhi Khoa
              </Typography>
              <Typography
                style={{
                  fontSize: "14px",
                  color: "#303030",
                  textAlign: "center",
                }}
              >
                Bệnh viện Nhi Đồng 2
              </Typography>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};
export default Doctor;
