import { FC } from "react";
import Image from "next/image";
import { Flex } from "antd";

import FaqItem from "./faq_item";
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
      <h3 style={{ color: "#10217D", fontSize: "36px" }}>
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
          src="/icons/MH_FAQ.jpeg"
          alt="doctor"
          width={600}
          height={600}
          style={{
            objectFit: "cover",

            borderRadius: "8px",
            boxShadow: "24px 24px #fff",
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
