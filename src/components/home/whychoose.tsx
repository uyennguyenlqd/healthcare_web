import Image from "next/image";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import Typography from "antd/es/typography/Typography";
const WhyChooseUs: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#F9FBFC", padding: "24px 96px" }}>
      <h3 style={{ color: "#10217D", fontSize: "36px" }}>Why Choose Us</h3>
      <div
        style={{
          padding: "24px 0",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <Image
          src="/icons/whychooseus_MH.png"
          alt="doctor"
          width={600}
          height={600}
          style={{
            position: "relative",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "8px",
            // boxShadow: "8px 8px 16px rgba(0,0,0,0.12)",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "22px",
          }}
        >
          <Flex
            style={{
              padding: "16px",
              flexDirection: "column",
              gap: "8px",
              backgroundColor: "#DEEAFF",
              borderRadius: "10px",
            }}
          >
            <Title
              level={4}
              style={{
                color: "#10217D",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              Professional Expertise
            </Title>
            <Typography style={{ fontSize: "18px" }}>
              Our team consists of certified and experienced mental health
              professionals, including psychologists and therapists, who are
              dedicated to providing evidence-based care tailored to individual
              needs.
            </Typography>
          </Flex>
          <Flex
            style={{
              padding: "16px",
              flexDirection: "column",
              gap: "8px",
              backgroundColor: "#F0F8FF",
              borderRadius: "10px",
            }}
          >
            <Title
              level={4}
              style={{
                color: "#10217D",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              Personalized Approach
            </Title>
            <Typography style={{ fontSize: "18px" }}>
              We recognize that each person’s journey is unique. Our services
              are customized to fit your specific circumstances, ensuring you
              receive the most relevant and effective support.
            </Typography>
          </Flex>
          <Flex
            style={{
              padding: "16px",
              flexDirection: "column",
              gap: "8px",
              backgroundColor: "#F0F8FF",
              borderRadius: "10px",
            }}
          >
            <Title
              level={4}
              style={{
                color: "#10217D",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              Compassionate Support
            </Title>
            <Typography style={{ fontSize: "18px" }}>
              We foster an empathetic environment where you feel safe to share
              your thoughts and feelings. Our goal is to listen, understand, and
              empower you on your path to healing.
            </Typography>
          </Flex>
          <Flex
            style={{
              padding: "16px",
              flexDirection: "column",
              gap: "8px",
              backgroundColor: "#DEEAFF",
              borderRadius: "10px",
            }}
          >
            <Title
              level={4}
              style={{
                color: "#10217D",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              24/7 Accessibility
            </Title>
            <Typography style={{ fontSize: "18px" }}>
              Mental health challenges don’t adhere to a schedule. That’s why we
              offer continuous support, including resources and help available
              whenever you need it, ensuring you’re never alone in your journey.
            </Typography>
          </Flex>
        </div>
      </div>
    </div>
  );
};
export default WhyChooseUs;
