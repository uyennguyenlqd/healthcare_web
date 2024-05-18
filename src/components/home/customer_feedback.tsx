import Image from "next/image";
import { Carousel, Divider, Flex } from "antd";
import Typography from "antd/es/typography/Typography";
const Feedback: React.FC = () => {
  return (
    <div style={{ background: "#F0F8FF", padding: "0 96px" }}>
      <h3 style={{ color: "#10217D", fontSize: "32px" }}>
        What Customers Say About Us
      </h3>
      {/* TODO ADD CAROUSEL */}
      <div
        style={{
          padding: "24px 0",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <Image
          src="/icons/customer.png"
          alt="doctor"
          width={400}
          height={400}
          style={{
            position: "relative",
            objectFit: "contain",
          }}
        />

        <Flex
          style={{
            flexDirection: "column",
            alignItems: "start",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              fontSize: "20px",
              color: "#121212",

              lineHeight: "1.6rem",
              letterSpacing: "0.3px",
            }}
          >
            “UTE Health is an website for you to feel better or get medical
            help. They offer you a 24/7 doctor service with Medicine Purchasing
            Facility”
          </Typography>
          <Divider />
          <Flex style={{ flexDirection: "column", marginTop: "24px" }}>
            <Typography
              style={{
                color: "#121212",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Anjali Sharma
            </Typography>
            <Typography style={{ color: "696969", fontSize: "14px" }}>
              MSFT Pro Customer
            </Typography>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};
export default Feedback;
