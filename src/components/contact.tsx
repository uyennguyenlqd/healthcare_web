"use client";
import { Button, Flex, Form, Input, Typography } from "antd";
const { TextArea } = Input;

const ContactUs: React.FC = () => {
  const [form] = Form.useForm();
  return (
    <Flex
      style={{
        margin: "auto",
        gap: "16px",
        flexDirection: "column",
        justifyContent: "center",
        padding: "24px 96px",
        width: "900px",
      }}
    >
      <h2
        style={{
          color: "#10217D",
          fontSize: "36px",
          margin: 0,
          textAlign: "center",
        }}
      >
        Contact Us
      </h2>
      <Typography
        style={{ textAlign: "center", fontWeight: 300, fontSize: "18px" }}
      >
        Got a technical issue? Want to send feedback about a beta feature? Let
        us know.
      </Typography>
      <Form layout="vertical" form={form} style={{ marginBottom: 0 }}>
        <Form.Item label="Your Email" name="email">
          <Input
            size="large"
            type="email"
            placeholder="phuonguyentik19@gmail.com"
            style={{ border: "1px solid #0066ff61" }}
          />
        </Form.Item>
        <Form.Item label="Subject" name="email">
          <Input
            size="large"
            type="text"
            placeholder="Let us know how we can help you"
            style={{ border: "1px solid #0066ff61" }}
          />
        </Form.Item>
        <Form.Item label="Your Message" name="email">
          <TextArea
            rows={6}
            placeholder="Leave a comment ...."
            style={{ border: "1px solid #0066ff61" }}
          />
        </Form.Item>
      </Form>
      <Button
        style={{
          padding: "8px 16px",
          backgroundColor: "#1b61bd",
          color: "#fff",
          maxWidth: "200px",
          fontWeight: 500,
          fontSize: "18px",
          borderRadius: "8px",
          border: "1px solid #1677FF",
          letterSpacing: "1px",
          height: "40px",
        }}
        onClick={() => {
          console.log("button");
        }}
      >
        Submit
      </Button>
    </Flex>
  );
};
export default ContactUs;
