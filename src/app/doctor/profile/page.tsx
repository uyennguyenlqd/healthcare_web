"use client";
import { useEffect, useState } from "react";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  DatePicker,
  Form,
  Input,
  message,
  notification,
  Radio,
  Spin,
  Upload,
} from "antd";
import dayjs from "dayjs";

import { ENV } from "@/constants/env";
import useFetchData from "@/hooks/UseFetchData";
import { PageMode } from "@/interfaces/models/router";
import uploadImagetoCloudinary from "@/utils/uploadCloudinary";

export type Props = {
  mode: PageMode;
};

const DoctorProfilePage: React.FC<Props> = ({ mode: initialMode }) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState<string>();
  const [mode, setMode] = useState<PageMode>(initialMode || "view");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const { data: DoctorModel, loading } = useFetchData(
    `${ENV}/api/v1/doctor/profile`
  ); // Update this with the correct API endpoint

  useEffect(() => {
    if (DoctorModel) {
      form.setFieldsValue({
        first_name: DoctorModel.first_name,
        last_name: DoctorModel.last_name,
        gender: DoctorModel.gender,
        bio: DoctorModel.bio,
        phone: DoctorModel.phone,
        day_of_birth: DoctorModel.day_of_birth
          ? dayjs(DoctorModel.day_of_birth)
          : null,
      });
      setValue(DoctorModel.gender);
      setPreviewUrl(DoctorModel.avatar);
    }
  }, [DoctorModel]);

  const handleSaveProfile = async () => {
    try {
      if (!DoctorModel) {
        throw new Error("Doctor profile data is not available.");
      }
      const formData = form.getFieldsValue();
      if (selectedFile) {
        formData.avatar = selectedFile;
      }
      if (formData.day_of_birth) {
        formData.day_of_birth = formData.day_of_birth.format("YYYY-MM-DD");
      }

      const response = await fetch(
        `${ENV}/api/v1/doctor/update_doctor/${DoctorModel._id}`,
        {
          // Make sure to update the API endpoint
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update doctor profile.");
      }

      notification.success({ message: "Doctor profile updated successfully." });
      setMode("view");
    } catch (error) {
      notification.error({ message: "Failed to update profile." });
      console.error("Error updating profile:", error);
    }
  };

  const handleFileChange = async (info: any) => {
    const file = info.file.originFileObj as File;
    const data = await uploadImagetoCloudinary(file);
    setPreviewUrl(data.url);
    setSelectedFile(data.url);
  };

  const beforeUpload = (file: File) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  return (
    <div
      style={{ padding: "24px", backgroundColor: "#fff", borderRadius: "8px" }}
    >
      {loading && <Spin size="large" />}
      <div style={{ display: "flex", gap: "96px" }}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Avatar size={150} src={previewUrl} icon={<UserOutlined />} />
          <Upload
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
          >
            <Button icon={<PlusOutlined />} />
          </Upload>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3 style={{ color: "#10217D", fontSize: "28px" }}>Doctor Profile</h3>
          {mode === "view" ? (
            <Button
              type="primary"
              onClick={() => setMode("edit")}
              style={{
                width: "100%",
                height: "45px",
                backgroundColor: "#1b61bd",
                fontSize: "16px",
              }}
            >
              Edit Doctor Profile
            </Button>
          ) : (
            <div style={{ display: "flex", gap: "16px" }}>
              <Button
                type="primary"
                onClick={handleSaveProfile}
                style={{ height: "45px" }}
              >
                Save
              </Button>
              <Button
                type="default"
                onClick={() => setMode("view")}
                style={{ height: "45px" }}
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
      <Form layout="vertical" form={form}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            gap: "40px",
          }}
        >
          <Form.Item
            label="First Name"
            name="first_name"
            style={{ width: "50%" }}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            style={{ width: "50%" }}
          >
            <Input size="large" />
          </Form.Item>
        </div>
        <Form.Item label="About doctor" name="bio">
          <Input size="large" style={{ height: "50px", width: "70%" }} />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input size="large" disabled />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input size="large" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default DoctorProfilePage;
