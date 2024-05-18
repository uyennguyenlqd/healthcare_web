"use client";
import { Button, Flex } from "antd";
import Typography from "antd/es/typography/Typography";

const AboutDoctor: React.FC = () => {
  return (
    <div
      style={{
        border: "solid 0.2px rgba(152, 162, 179, 0.4)",
        borderRadius: "8px",
        padding: "24px",
        backgroundColor: "#fff",
      }}
    >
      <h3
        style={{
          color: "#10217D",
          fontSize: "24px",
          margin: 0,
        }}
      >
        About Me
      </h3>
      <div>
        <Typography
          style={{ marginTop: "32px", fontSize: "16px", maxWidth: "900px" }}
        >
          Excellent physician - Specialist II Doctor Vo Duc Hieu is an expert
          with nearly 25 years of experience in diagnosis and medical treatment
          of cancer at Ho Chi Minh City Oncology Hospital. Doctor Vo Duc Hieu
          has a lot of experience in prevention consulting, early detection
          screening, accurate diagnosis and cancer treatment guidance,
          especially in the treatment of breast cancer, gastrointestinal cancer,
          and other cancers. thyroid disorders,... Currently, Doctor Vo Duc Hieu
          is Deputy Director of the Oncology Hospital, General Secretary of the
          Ho Chi Minh City Cancer Association, Member of the Executive Committee
          of the Vietnam Cancer Association, Member of the Executive Committee
          of the Vietnam Cancer Immunotherapy Association. In addition,
          Specialist II Doctor Vo Duc Hieu is often invited as a chairing expert
          and presenter of scientific conference programs on advances in cancer
          diagnosis and treatment. The doctor is also the author and co-author
          of many scientific research projects at grassroots and city levels on
          cancer prevention and treatment.
        </Typography>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            color: "#1b61bd",
            fontSize: "14px",
            border: 0,
            padding: 0,
            boxShadow: "none",
            width: "fit-content",
            marginTop: "10px",
          }}
          onClick={() => {
            console.log("button");
          }}
        >
          View All
        </Button>
      </div>
    </div>
  );
};
export default AboutDoctor;
