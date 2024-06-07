import { Button, Flex, Form, Input, Typography } from "antd";
import HeaderTitle from "../header/header_title";
import { FC, useState } from "react";

const ForgotPassword: FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [disableResetPass, setDisableResetPass] = useState(true);
  const onFieldsChange = async () => {
    const hasErrors =
      form.getFieldsError().some((field) => {
        return field.errors.length > 0;
      }) || !form.isFieldsTouched(true);

    setDisableResetPass(hasErrors);
  };
  const handleForgotPassword = () => {
    console.log("button");
  };
  return (
    <Flex
      style={{
        backgroundColor: "#201f19",

        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          flex: "1 1 900px",
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "#fff",
          boxShadow: "7px 0px 20px rgba(0, 0, 0, 0.15)",
          borderRadius: "4px",
        }}
      >
        <div
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "64px 24px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <HeaderTitle />
          </div>
          <Typography
            style={{
              fontSize: "36px",
              lineHeight: "40px",
              color: "#201f19",
              marginBottom: "20px",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            Forgot your password?
          </Typography>
          <Typography
            style={{
              fontSize: "16px",
              lineHeight: "20px",
              textAlign: "center",
              letterSpacing: "0.15px",
              color: "#687bf9",
              marginBottom: "20px",
            }}
          >
            Enter your email address and we`ll send you a link to reset
            password!
          </Typography>
          <Form layout="vertical" form={form} onFieldsChange={onFieldsChange}>
            <Form.Item
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please enter email",
                },
                {
                  type: "email",
                  message: "Email is wrong",
                },
              ]}
              name="email"
            >
              <Input size="large" type="email" />
            </Form.Item>
          </Form>

          <Button
            style={{
              width: "100%",
              fontSize: "16px",
              marginTop: "10px",
              fontWeight: 500,
            }}
            onClick={handleForgotPassword}
            type="primary"
            loading={loading}
            // disabled={disableResetPass}
            size="large"
          >
            SEND
          </Button>
        </div>
      </div>
    </Flex>
  );
};
export default ForgotPassword;
