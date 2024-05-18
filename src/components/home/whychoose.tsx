import Image from "next/image";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import Typography from "antd/es/typography/Typography";
const WhyChooseUs: React.FC = () => {
  return (
    <div style={{ backgroundColor: "#F9FBFC", padding: "24px 96px" }}>
      <h3 style={{ color: "#10217D", fontSize: "32px" }}>Why Choose Us</h3>
      <div
        style={{
          padding: "24px 0",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <Image
          src="/icons/whychoose.jpeg"
          alt="doctor"
          width={500}
          height={500}
          style={{
            position: "relative",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "8px",
            boxShadow: "8px 8px 16px rgba(0,0,0,0.12)",
          }}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "20px",
          }}
        >
          <Flex
            style={{
              padding: "8px",
              flexDirection: "column",

              backgroundColor: "#DEEAFF",
              borderRadius: "10px",
            }}
          >
            <Title
              level={4}
              style={{
                color: "#10217D",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              One-Stop Success
            </Title>
            <Typography>
              At UTE Heath, we prioritize your health and well-being. With
              dedicated professionals and advanced technology, we offer
              personalized care and innovative solutions. Choose us for
              compassionate, comprehensive, and reliable healthcare.
            </Typography>
          </Flex>
          <Flex
            style={{
              padding: "8px",
              flexDirection: "column",

              backgroundColor: "#F0F8FF",
              borderRadius: "10px",
            }}
          >
            <Title
              level={4}
              style={{
                color: "#10217D",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              One-Stop Success
            </Title>
            <Typography>
              At UTE Heath, we prioritize your health and well-being. With
              dedicated professionals and advanced technology, we offer
              personalized care and innovative solutions. Choose us for
              compassionate, comprehensive, and reliable healthcare.
            </Typography>
          </Flex>
          <Flex
            style={{
              padding: "8px",
              flexDirection: "column",

              backgroundColor: "#F0F8FF",
              borderRadius: "10px",
            }}
          >
            <Title
              level={4}
              style={{
                color: "#10217D",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              One-Stop Success
            </Title>
            <Typography>
              At UTE Heath, we prioritize your health and well-being. With
              dedicated professionals and advanced technology, we offer
              personalized care and innovative solutions. Choose us for
              compassionate, comprehensive, and reliable healthcare.
            </Typography>
          </Flex>
          <Flex
            style={{
              padding: "8px",
              flexDirection: "column",

              backgroundColor: "#DEEAFF",
              borderRadius: "10px",
            }}
          >
            <Title
              level={4}
              style={{
                color: "#10217D",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              One-Stop Success
            </Title>
            <Typography>
              At UTE Heath, we prioritize your health and well-being. With
              dedicated professionals and advanced technology, we offer
              personalized care and innovative solutions. Choose us for
              compassionate, comprehensive, and reliable healthcare.
            </Typography>
          </Flex>
        </div>
      </div>
    </div>
  );
};
export default WhyChooseUs;
