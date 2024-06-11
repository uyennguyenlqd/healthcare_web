import Image from "next/image";
import { Flex, Typography } from "antd";

import SolutionStep from "./solutionStep";
const AboutUs: React.FC = () => {
  return (
    <Flex
      style={{
        padding: "24px 96px",
        justifyContent: "space-around",
      }}
    >
      <div>
        <Image
          src="/icons/doctor-group.png"
          alt="doctor"
          width={500}
          height={500}
          style={{
            position: "relative",
            objectFit: "contain",
          }}
        />
      </div>
      <Flex style={{ flexDirection: "column" }}>
        <h3 style={{ color: "#10217D", fontSize: "36px" }}>About Us</h3>
        <Typography style={{ maxWidth: "700px", fontSize: "18px" }}>
          Welcome to Ute Health, your trusted partner for accessible and
          personalized healthcare. Our expert doctors offer online consultations
          and specialized services, prioritizing your well-being. Join us on
          this journey towards a healthier you.
        </Typography>
        <h4 style={{ color: "#10217D", fontSize: "24px" }}>Your Solutions</h4>
        <SolutionStep
          title="Choose a Specialist"
          description="Find your perfect specialist and book with ease at Health Plus. Expert doctors prioritize your health, offering tailored care."
        />

        <SolutionStep
          title="Make a Schedule"
          description="Choose the date and time that suits you best, and let our dedicated team of medical professionals ensure your well-being with personalized care."
        />

        <SolutionStep
          title="Get Your Solutions"
          description="Our experienced doctors and specialists are here to provide expert advice and personalized treatment plans, helping you achieve your best possible health."
        />
      </Flex>
    </Flex>
  );
};
export default AboutUs;
