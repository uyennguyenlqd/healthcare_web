"use client";

import { useState } from "react";
import { getSession } from "next-auth/react";
import { StarFilled } from "@ant-design/icons";
import { Button, Form, notification } from "antd";
import TextArea from "antd/es/input/TextArea";

import { ENV } from "@/constants/env";
import { DoctorModel } from "@/interfaces/models/doctors";
interface FeedbackFormProps {
  doctor: DoctorModel;
}
const FeedbackForm: React.FC<FeedbackFormProps> = ({ doctor }) => {
  const [form] = Form.useForm();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [formData, setFormData] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const starClass = i <= (rating || hover) ? "#E8E800" : "#C8C8C8";

      stars.push(
        <Button
          key={i}
          onClick={() => setRating(i)}
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => {
            setHover(rating);
          }}
          onDoubleClick={() => {
            setHover(0);
            setRating(0);
          }}
          style={{
            border: "none",
            padding: 0,
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <StarFilled
            style={{
              fontSize: "18px",
              color: starClass === "#E8E800" ? "#E8E800" : "#C8C8C8",
            }}
          />
        </Button>
      );
    }

    return stars;
  };

  const handleSubmit = async () => {
    try {
      if (rating === 0 || !reviewText.trim()) {
        notification.error({
          message: "Please provide a rating and review text.",
        });
        return;
      }

      setLoading(true);

      const session = await getSession();
      const requestOptions = {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          rating,
          reviewText,
          doctor: doctor._id,
        }),
      };

      const res = await fetch(
        `${ENV}/api/v1/doctor/${doctor._id}/reviews`,
        requestOptions
      );
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      notification.success({
        message: "Feedback submitted successfully!",
      });
      form.resetFields();
    } catch (err: any) {
      notification.error({ message: err.message });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form layout="vertical" form={form} style={{ marginBottom: 0 }}>
      <h3> How would you rate the overall experience?*</h3>
      <div>{renderStars()}</div>
      <div>
        <h4>Share your feedback or suggestions*</h4>
        <Form.Item label="Your Message" name="email">
          <TextArea
            rows={5}
            placeholder=" Write your mesage"
            style={{ border: "1px solid #0066ff61" }}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </Form.Item>
      </div>
      <Button
        type="primary"
        style={{
          backgroundColor: "#1b61bd",
          fontSize: "16px",
        }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Form>
  );
};
export default FeedbackForm;
