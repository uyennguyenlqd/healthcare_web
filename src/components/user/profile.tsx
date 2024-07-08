"use client";
import { useEffect, useState } from "react";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  DatePicker,
  DatePickerProps,
  Flex,
  Form,
  GetProp,
  Input,
  message,
  notification,
  Radio,
  RadioChangeEvent,
  Spin,
  Upload,
  UploadProps,
} from "antd";
import dayjs from "dayjs";

import { ENV } from "@/constants/env";
import useFetchData from "@/hooks/UseFetchData";
import { PageMode } from "@/interfaces/models/router";
import uploadImagetoCloudinary from "@/utils/uploadCloudinary";
export type Props = {
  mode: PageMode;
};
const Profile: React.FC<Props> = ({ mode: initialMode }) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState();
  const [mode, setMode] = useState<PageMode>(initialMode || "view");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const { data: UserProfileModel, loading } = useFetchData(
    `${ENV}/api/v1/users/profile`,
  );

  useEffect(() => {
    if (UserProfileModel) {
      form.setFieldsValue({
        first_name: UserProfileModel.first_name,
        last_name: UserProfileModel.last_name,
        gender: UserProfileModel.gender,
        email: UserProfileModel.email,
        phone: UserProfileModel.phone,
        day_of_birth: UserProfileModel.day_of_birth
          ? dayjs(UserProfileModel.day_of_birth)
          : null,
      });
      setValue(UserProfileModel.gender);
      setPreviewUrl(UserProfileModel.avatar);
    }
  }, [UserProfileModel]);

  const onFieldsChange = async () => {
    const hasErrors =
      form.getFieldsError().some((field) => {
        return field.errors.length > 0;
      }) || !form.isFieldsTouched(true);
  };
  const onChangeDatePicker: DatePickerProps["onChange"] = (
    date,
    dateString,
  ) => {
    console.log("Date", date.format("YYYY-MM-DD"), dateString);
    form.setFieldsValue({ birthday: dateString });
  };
  type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
  const beforeUpload = (file: FileType) => {
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
  const handleFileChange: UploadProps["onChange"] = async (info) => {
    const file = info.file.originFileObj as FileType;
    const data = await uploadImagetoCloudinary(file);
    setPreviewUrl(data.url);
    setSelectedFile(data.url);
  };
  //handle update profile
  const onSaveProfile = async () => {
    try {
      if (!UserProfileModel) {
        throw new Error("User profile data is not available.");
      }
      const formData = form.getFieldsValue();
      if (selectedFile) {
        formData.avatar = selectedFile;
      }

      if (formData.day_of_birth) {
        formData.day_of_birth = formData.day_of_birth.format("YYYY-MM-DD");
      }

      const response = await fetch(
        `${ENV}/api/v1/users/update_user/${UserProfileModel._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      console.log("Avatar", formData.avatar);
      if (!response.ok) {
        throw new Error("Failed to update user.");
      }
      notification.success({ message: "User profile updated successfully." });

      setMode("view");
    } catch (error) {
      notification.error({ message: "Failed to update profile." });
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div
      style={{
        padding: "24px 96px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
        borderRadius: "8px",
        gap: "16px",
        margin: "auto",
      }}
    >
      {" "}
      {loading && <Spin size="large" />}
      <div style={{ display: "flex", gap: "96px" }}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <Avatar size={150} src={previewUrl} icon={<UserOutlined />}></Avatar>
          <Upload
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleFileChange}
          >
            <Button
              icon={<PlusOutlined />}
              style={{
                border: "none",
                width: "auto",
                boxShadow: "none",
              }}
            ></Button>
          </Upload>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              color: "#10217D",
              fontSize: "28px",
              alignItems: "center",
            }}
          >
            My Profile
          </h3>
          {mode === "view" ? (
            <Button
              type="primary"
              style={{
                alignItems: "center",
                backgroundColor: "#1b61bd",
                fontSize: "16px",
                width: "100%",
                height: "45px",
              }}
              onClick={() => {
                setMode("edit");
              }}
            >
              Edit Profile
            </Button>
          ) : (
            <Flex align="center" gap={16}>
              <Button
                type="primary"
                style={{
                  alignItems: "center",
                  backgroundColor: "#1b61bd",
                  fontSize: "16px",
                  height: "45px",
                }}
                onClick={onSaveProfile}
              >
                Save
              </Button>
              <Button
                type="primary"
                style={{
                  alignItems: "center",
                  backgroundColor: "#B50000",
                  fontSize: "16px",

                  height: "45px",
                }}
                onClick={() => {
                  setMode("view");
                }}
              >
                Cancel
              </Button>
            </Flex>
          )}
        </div>
      </div>
      <Form layout="vertical" form={form} onFieldsChange={onFieldsChange}>
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Form.Item label="First Name" name="first_name">
            <Input
              size="large"
              type="text"
              style={{ border: "1px solid #7E7E7E" }}
            />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name">
            <Input
              size="large"
              type="text"
              style={{ border: "1px solid #7E7E7E" }}
            />
          </Form.Item>
        </div>
        <Form.Item label="Birthday" name="day_of_birth">
          <DatePicker onChange={onChangeDatePicker} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Radio.Group
            onChange={(e: RadioChangeEvent) => {
              console.log("radio checked", e.target.value);
              setValue(e.target.value);
            }}
            value={value}
            style={{ gap: "24px" }}
          >
            <Radio value="male">Male</Radio>
            <Radio value="female">Female</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input
            size="large"
            type="email"
            disabled
            style={{ border: "1px solid #7E7E7E" }}
            autoComplete="email"
          />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input
            size="large"
            type="text"
            style={{ border: "1px solid #7E7E7E" }}
            autoComplete="phone"
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default Profile;
