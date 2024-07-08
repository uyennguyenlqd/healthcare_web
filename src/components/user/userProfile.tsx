import { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  DatePicker,
  Flex,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";

const UserProfile: React.FC = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState();
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
            <Avatar size={150} src={""}></Avatar>
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
          <Form.Item label="Birthday" name="birthday">
            <DatePicker onChange={() => {}} style={{ width: "100%" }} />
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

        <TextArea />
        <Typography
          style={{
            fontSize: "18px",
          }}
        >
          Upload file
        </Typography>
        <Dragger>
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
            fontSize: "14px",
            padding: "0px 8px",
            borderRadius: "4px",
            border: "1px solid #1b61bd",
            height: "30px",
            width: "fit-content",
          }}
          onClick={() => {
            console.log("button");
          }}
        >
          Add new record
        </Button>
      </Flex>
    </div>
  );
};
export default UserProfile;
