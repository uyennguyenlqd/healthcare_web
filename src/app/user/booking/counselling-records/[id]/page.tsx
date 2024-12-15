"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button, Form, Input, notification } from "antd";

import { ENV } from "@/constants/env";

export type Props = {
  mode: "view";
};
export interface AppointmentData {
  _id: string;
  booking: string;
  status: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  images: string[];
}

const DetailRecord: React.FC<Props & { params: { id: string } }> = ({
  params: { id },
}) => {
  const [form] = Form.useForm();
  const [images, setImages] = useState<string[]>([]);
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [appointmentData, setAppointmentData] =
    useState<AppointmentData | null>(null);

  useEffect(() => {
    const fetchAppointmentData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${ENV}/api/v1/appointment/${id}`, {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });

        const result = await res.json();
        if (!res.ok) {
          throw new Error(
            result.message || "An error occurred while fetching data"
          );
        }

        if (result && result.appointment && result.appointment.length > 0) {
          setAppointmentData(result.appointment[0]);
        } else {
          throw new Error("No appointment data available.");
        }
      } catch (err: any) {
        setLoading(false);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentData();
  }, [id]);

  useEffect(() => {
    if (appointmentData) {
      form.setFieldsValue({
        booking: appointmentData.booking,
        status: appointmentData.status,
        subjective: appointmentData.subjective,
        objective: appointmentData.objective || "",
        assessment: appointmentData.assessment || "",
        plan: appointmentData.plan || "",
      });
      setImages(appointmentData.images || []);
    }
  }, [appointmentData]);

  const handleConfirm = async () => {
    try {
      const dataToUpdate = { confirmedByUser: true }; // Đảm bảo 'confirmedByUser' là true

      const response = await fetch(
        `${ENV}/api/v1/appointment/confirm_appointment/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(dataToUpdate),
        }
      );
      if (!response.ok) throw new Error("Failed to confirm appointment.");

      notification.success({ message: "Appointment confirmed successfully." });
      router.push(`/user/booking/counselling-records`);
    } catch (error) {
      notification.error({ message: "Failed to confirm appointment." });
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Form
      form={form}
      layout="vertical"
      style={{
        width: "100%",
        margin: "auto",
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "16px 24px",
      }}
    >
      <h2>Appointment Notes</h2>

      <Form.Item
        label="Booking ID"
        name="booking"
        rules={[{ required: true, message: "Please enter the booking ID!" }]}
      >
        <Input placeholder="Enter the booking ID" disabled />
      </Form.Item>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Please enter the status!" }]}
      >
        <Input placeholder="Enter the status" disabled />
      </Form.Item>

      <Form.Item
        label="Subjective"
        name="subjective"
        rules={[{ required: true, message: "Please enter the subjective!" }]}
      >
        <Input.TextArea rows={3} placeholder="Enter subjective" disabled />
      </Form.Item>

      <Form.Item
        label="Objective"
        name="objective"
        rules={[{ required: true, message: "Please enter the objective!" }]}
      >
        <Input.TextArea rows={3} placeholder="Enter objective" disabled />
      </Form.Item>

      <Form.Item
        label="Assessment"
        name="assessment"
        rules={[{ required: true, message: "Please enter the assessment!" }]}
      >
        <Input.TextArea rows={3} placeholder="Enter assessment" disabled />
      </Form.Item>

      <Form.Item
        label="Plan"
        name="plan"
        rules={[{ required: true, message: "Please enter the plan!" }]}
      >
        <Input.TextArea rows={3} placeholder="Enter plan" disabled />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          onClick={handleConfirm}
          block
          style={{
            height: "50px",
            fontSize: "16px",
            marginTop: "24px",
          }}
        >
          Confirm
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DetailRecord;
