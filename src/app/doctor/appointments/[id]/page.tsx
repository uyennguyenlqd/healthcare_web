"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { UploadOutlined } from "@ant-design/icons";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  message,
  notification,
  Upload,
  UploadProps,
} from "antd";

import { ENV } from "@/constants/env";
import uploadImagetoCloudinary from "@/utils/uploadCloudinary";
import { useRouter } from "next/navigation";

export type Props = {
  mode: "view" | "edit";
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

const DoctorAppointmentForm: React.FC<Props & { params: { id: string } }> = ({
  mode: initialMode,
  params: { id },
}) => {
  const [form] = Form.useForm();
  const [images, setImages] = useState<string[]>([]);
  const [mode, setMode] = useState<"view" | "edit">(initialMode || "view");
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  console.log("Fetching appointment data for ID:", id);
  const [appointmentData, setAppointmentData] =
    useState<AppointmentData | null>(null);

  console.log("Fetching appointment data for ID:", id);

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
        console.log("Complete result:", result);

        if (!res.ok) {
          throw new Error(
            result.message || "An error occurred while fetching data"
          );
        }

        // Kiểm tra xem result có chứa trường 'appointment' hay không
        if (result && result.appointment && result.appointment.length > 0) {
          console.log("Check Data ", result.appointment[0]);
          setAppointmentData(result.appointment[0]);
        } else {
          throw new Error("No appointment data available.");
        }
      } catch (err: any) {
        setLoading(false);
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false); // Đảm bảo set loading về false khi kết thúc
      }
    };

    fetchAppointmentData();
  }, [id]);

  useEffect(() => {
    // Kiểm tra điều kiện để setFieldsValue chỉ khi appointmentData có giá trị
    if (appointmentData) {
      form.setFieldsValue({
        booking: appointmentData.booking,
        // status: appointmentData.status,
        subjective: appointmentData.subjective,
        objective: appointmentData.objective || "",
        assessment: appointmentData.assessment || "",
        plan: appointmentData.plan || "",
      });
      setImages(appointmentData.images || []);
    }
  }, [appointmentData]); // Chạy lại khi appointmentData thay đổi

  console.log("Fetched Appointment Data:", appointmentData);
  const beforeUpload: UploadProps["beforeUpload"] = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleImageUpload: UploadProps["onChange"] = async (info) => {
    const file = info.file.originFileObj;
    if (file) {
      const data = await uploadImagetoCloudinary(file);
      setImages((prevImages) => [...prevImages, data.url]);
    }
  };

  const handleSave = async () => {
    try {
      const values = form.getFieldsValue();
      const dataToUpdate = { ...values, images };

      const response = await fetch(
        `${ENV}/api/v1/appointment/update_appointment/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToUpdate),
        }
      );

      if (!response.ok) throw new Error("Failed to update appointment.");

      notification.success({ message: "Appointment updated successfully." });
      setMode("view");
      router.push(`/doctor/appointments`);
    } catch (error) {
      notification.error({ message: "Failed to update appointment." });
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Notes for Appointment</h2>
        {mode === "view" ? (
          <Button
            type="primary"
            onClick={() => setMode("edit")}
            style={{ backgroundColor: "#1b61bd", borderRadius: "50%" }}
            icon={<EditOutlined />} // Sử dụng icon EditOutlined từ Ant Design
          />
        ) : (
          <div></div>
        )}
      </div>

      <Form.Item
        label="Booking ID"
        name="booking"
        rules={[{ required: true, message: "Please enter the booking ID!" }]}
      >
        <Input placeholder="Enter the booking ID" />
      </Form.Item>

      {/* <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Please enter the status!" }]}
      >
        <Input placeholder="Enter the status" />
      </Form.Item> */}

      <Form.Item
        label="Subjective"
        name="subjective"
        rules={[{ required: true, message: "Please enter the subjective!" }]}
      >
        <Input.TextArea rows={3} placeholder="Enter subjective" />
      </Form.Item>

      <Form.Item
        label="Objective"
        name="objective"
        rules={[{ required: true, message: "Please enter the objective!" }]}
      >
        <Input.TextArea rows={3} placeholder="Enter objective" />
      </Form.Item>

      <Form.Item
        label="Assessment"
        name="assessment"
        rules={[{ required: true, message: "Please enter the assessment!" }]}
      >
        <Input.TextArea rows={3} placeholder="Enter assessment" />
      </Form.Item>

      <Form.Item
        label="Plan"
        name="plan"
        rules={[{ required: true, message: "Please enter the plan!" }]}
      >
        <Input.TextArea rows={3} placeholder="Enter plan" />
      </Form.Item>

      {/* Upload Images */}
      <Form.Item label="Upload Supporting Images">
        <Upload
          beforeUpload={beforeUpload}
          onChange={handleImageUpload}
          listType="picture"
          multiple
          disabled={mode === "view"}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        {images.length > 0 && (
          <div style={{ marginTop: "10px" }}>
            {images.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`image-${index}`}
                style={{ width: 100, marginRight: 10 }}
              />
            ))}
          </div>
        )}
        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSave}
            block
            style={{
              height: "50px",
              fontSize: "16px",
              marginTop: "24px",
            }}
            disabled={mode === "view"}
          >
            Submit
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  );
};

export default DoctorAppointmentForm;
