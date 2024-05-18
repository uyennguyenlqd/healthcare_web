import Image from "next/image";
import { FC } from "react";
import FaqItem from "./faq_item";
import { Flex } from "antd";
type Props = {
  question: string;
  answer: string;
};

interface FaqProps {
  data: Props[];
}

const Faq: FC<FaqProps> = ({ data }) => {
  return (
    <div style={{ background: "#F0F8FF", padding: "24px 96px" }}>
      <h3 style={{ color: "#10217D", fontSize: "32px" }}>
        Frequently Asked Questions
      </h3>
      <div
        style={{
          padding: "24px 0",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
        }}
      >
        <Image
          src="/icons/doctor_client.jpg"
          alt="doctor"
          width={400}
          height={400}
          style={{
            position: "relative",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "8px",
            boxShadow: "16px 16px #fff",
          }}
        />
        <Flex style={{ flexDirection: "column", gap: "20px" }}>
          {data.map((faq, idx) => {
            return (
              <div key={"questions" + idx}>
                <FaqItem question={faq.question} answer={faq.answer} />
              </div>
            );
          })}
        </Flex>
      </div>
    </div>
  );
};
export default Faq;
