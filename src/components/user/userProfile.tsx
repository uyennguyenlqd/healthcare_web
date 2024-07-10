import { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  DatePicker,
  DatePickerProps,
  Flex,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";
import dayjs from "dayjs";

import { ENV } from "@/constants/env";
import useFetchData from "@/hooks/UseFetchData";
import uploadImagetoCloudinary from "@/utils/uploadCloudinary";
interface PatientProfileProps {
  onChangeNotes: (value: string) => void;
  uploadedFileUrl: (url: string) => void;
}
const UserProfile: React.FC<PatientProfileProps> = ({
  onChangeNotes,
  uploadedFileUrl,
}) => {
  const [form] = Form.useForm();
  const [value, setValue] = useState();
  const [previewUrl, setPreviewUrl] = useState("");
  const [notes, setNotes] = useState<string>("");

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    onChangeNotes(e.target.value);
  };
  const { data: UserProfileModel, loading } = useFetchData(
    `${ENV}/api/v1/users/profile`,
  );
  const [selectedFile, setSelectedFile] = useState(null);
  useEffect(() => {
    if (UserProfileModel) {
      form.setFieldsValue({
        first_name: UserProfileModel.first_name,
        last_name: UserProfileModel.last_name,
        gender: UserProfileModel.gender,

        phone: UserProfileModel.phone,
        day_of_birth: UserProfileModel.day_of_birth
          ? dayjs(UserProfileModel.day_of_birth)
          : null,
      });
      setValue(UserProfileModel.gender);
      setPreviewUrl(UserProfileModel.avatar);
    }
  }, [UserProfileModel]);
  const handleFileChange = async (info: any) => {
    const file = info.file.originFileObj;
    const data = await uploadImagetoCloudinary(file);

    setSelectedFile(data.url);
    uploadedFileUrl(data.url);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",

        backgroundColor: "#fff",
        width: "900px",
      }}
    >
      <div
        style={{
          padding: "24px 96px",
          display: "flex",
          flexDirection: "column",
          width: "700px",
          gap: "16px",
          margin: "auto",
        }}
      >
        {" "}
        <div style={{ display: "flex", gap: "96px" }}>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <Avatar size={150} src={previewUrl}></Avatar>
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
              Patient Record
            </h3>
          </div>
        </div>
        <Form layout="vertical" form={form}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            <DatePicker style={{ width: "100%" }} />
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
      <Flex
        style={{
          flexDirection: "column",
          justifyContent: "center",
          padding: " 0 96px 24px 96px",
          gap: "16px",
        }}
      >
        <Typography
          style={{
            fontSize: "18px",
          }}
        >
          Notes
        </Typography>

        <TextArea value={notes} onChange={handleNotesChange} />
        <Typography
          style={{
            fontSize: "18px",
          }}
        >
          Upload file
        </Typography>
        <Dragger onChange={handleFileChange}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            color: "#1b61bd",
            fontWeight: 500,
            fontSize: "16px",
            padding: "0px 8px",
            borderRadius: "4px",
            border: "1px solid #1b61bd",
            height: "35px",
            width: "55px",
          }}
          onClick={() => {
            console.log("button");
          }}
        >
          Next
        </Button>
      </Flex>
    </div>
  );
};
export default UserProfile;
