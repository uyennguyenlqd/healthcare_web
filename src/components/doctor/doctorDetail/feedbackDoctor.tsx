"use client";
import { useState } from "react";
import { FormOutlined, StarFilled, StarOutlined } from "@ant-design/icons";
import { Avatar, Button, Flex, Typography } from "antd";
import dayjs from "dayjs";

import FeedbackForm from "./feedbackForm";

import { DoctorModel } from "@/interfaces/models/doctors";
interface DoctorFeedbackProps {
  doctor: DoctorModel;
}
const FeedbackSection: React.FC<DoctorFeedbackProps> = ({ doctor }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const date = dayjs("01/01/2024", "DD/MM/YYYY");
  const renderStars = (rating: number) => {
    const stars = [];
    const filledStars = rating;
    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(
          <StarFilled key={i} style={{ color: "#E8E800", fontSize: "18px" }} />
        );
      } else {
        stars.push(
          <StarOutlined
            key={i}
            style={{ color: "#E8E800", fontSize: "18px" }}
          />
        );
      }
    }
    return stars;
  };
  return (
    <div style={{ gap: "24px", display: "flex", flexDirection: "column" }}>
      <h4 style={{ fontWeight: "bold", color: "#10217D", fontSize: "16px" }}>
        All reviews ({doctor.totalRating})
      </h4>
      <Flex
        style={{
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {doctor.reviews.map((review) => (
          <Flex
            key={review._id}
            gap={16}
            style={{
              justifyContent: "space-between",
            }}
          >
            <Flex gap={16}>
              <Avatar
                style={{ backgroundColor: "#E0E0E0" }}
                size={50}
                src={
                  <img
                    src={review.user.avatar || "/icons/doctor02.png"}
                    alt=""
                    style={{
                      position: "relative",
                      objectFit: "contain",
                      objectPosition: "center bottom",
                    }}
                  />
                }
              />
              <div>
                <h5 style={{ margin: 0, fontSize: "14px" }}>
                  {review.user.first_name} {review.user.last_name}
                </h5>

                <Typography style={{ fontSize: "14px" }}>
                  {review.reviewText}
                </Typography>
              </div>
            </Flex>

            <div>{renderStars(review.rating)}</div>
          </Flex>
        ))}
      </Flex>
      {!showFeedbackForm && (
        <div>
          <Button
            icon={<FormOutlined />}
            style={{ border: "solid 1px rgba(152, 162, 179, 0.4)" }}
            onClick={() => {
              setShowFeedbackForm(true);
            }}
          >
            {" "}
            Give Feedback
          </Button>
        </div>
      )}
      {showFeedbackForm && <FeedbackForm doctor={doctor} />}
    </div>
  );
};
export default FeedbackSection;
