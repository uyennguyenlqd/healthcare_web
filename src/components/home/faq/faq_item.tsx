"use client";
import { useEffect, useRef, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import Typography from "antd/es/typography/Typography";

type Props = {
  question: string;
  answer: string;
};
const FaqItem: React.FC<Props> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Flex style={{ flexDirection: "column" }}>
      <Button
        style={{
          backgroundColor: "#fff",
          padding: "8px 16px",
          height: "fit-content",
         
        }}
        onClick={toggleAccordion}
      >
        <div
          style={{ padding: "20px", display: "flex", flexDirection: "column" }}
        >
          <div
            style={{
              padding: "8px 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              style={{
                fontSize: "20px",
                color: "#10217D",

                fontWeight: "bold",
              }}
            >
              {question}
            </Typography>
            <div>
              {" "}
              {isOpen ? (
                <MinusOutlined style={{ color: "#2AA7FF", fontSize: "24px" }} />
              ) : (
                <PlusOutlined style={{ color: "#2AA7FF", fontSize: "24px" }} />
              )}
            </div>
          </div>
          <div
            ref={contentRef}
            style={{
              width: "100%",
              transition: "max-height 0.5s",
              overflow: isOpen ? "auto" : "hidden",
              maxHeight: isOpen ? "unset" : "0",
            }}
          >
            <Typography
              style={{
                fontSize: "18px",

                textAlign: "justify",
                whiteSpace: "pre-line",
                fontWeight: "500",
              }}
            >
              {answer}
            </Typography>
          </div>
        </div>
      </Button>
    </Flex>
  );
};
export default FaqItem;
