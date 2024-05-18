import { useState } from "react";
import Image from "next/image";
import { Button, Checkbox, Form, Input } from "antd";

import HeaderTitle from "../header/header_title";
import LoginScreen from "./logScreen";

import {
  StyleContainerSign,
  StyleFooter,
  StyleForgotPass,
  StyleForm,
  StyleLink,
  StyleLoginDescription,
  StyleMainBody,
  StyleTextOr,
  StyleWrapperRemember,
} from "@/styles/signInUp.styled";
const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [typePassword, setTypePassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [disableLogin, setDisableLogin] = useState(true);

  const handleLogin = () => {
    console.log("button");
  };
  return (
    <LoginScreen>
      <HeaderTitle />
      <StyleContainerSign>
        <StyleMainBody>
          <StyleLoginDescription>
            Let’s get started with your 14 days free trial
          </StyleLoginDescription>
          <StyleForm layout="vertical" form={form}>
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
              <Input
                size="large"
                type="email"
                style={{ border: "1px solid #7E7E7E" }}
              />
            </Form.Item>
            <Form.Item
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please enter password",
                },
              ]}
              className="form-password"
              name="password"
            >
              <Input
                size="large"
                type={typePassword}
                style={{ border: "1px solid #7E7E7E" }}
              />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "Please enter confirmed password",
                },
              ]}
              className="form-password"
              name="confirmpassword"
            >
              <Input
                size="large"
                type={typePassword}
                style={{ border: "1px solid #7E7E7E" }}
              />
            </Form.Item>
            <StyleWrapperRemember>
              <Form.Item
                label="Remember me on this device"
                className="checkbox-wrapper default"
              >
                <Checkbox />
              </Form.Item>
              <StyleForgotPass href="/forgot-password">
                Forgot password?
              </StyleForgotPass>
            </StyleWrapperRemember>
            <Form.Item className="form-item-submit">
              <Button
                loading={loading}
                onClick={handleLogin}
                // disabled={disableLogin}
                size="large"
                type="primary"
                style={{
                  height: "50px",
                  fontSize: "20px",
                  lineHeight: "23px",
                  fontWeight: 500,
                }}
              >
                Log In
              </Button>
            </Form.Item>
            <StyleTextOr>or</StyleTextOr>

            <Button
              size="large"
              onClick={handleLogin}
              icon={
                <Image
                  src="/icons/google.png"
                  alt="google"
                  width={14}
                  height={14}
                  style={{ marginTop: "8px" }}
                />
              }
              style={{
                width: "100%",
                height: "50px",
                fontSize: "20px",
                lineHeight: "23px",
                fontWeight: 400,
              }}
            >
              Log in with Google
            </Button>
          </StyleForm>
        </StyleMainBody>
      </StyleContainerSign>
      <StyleFooter>
        You don’t have account yet? &nbsp;
        <StyleLink onClick={handleLogin}>Sign up now!</StyleLink>
      </StyleFooter>
    </LoginScreen>
  );
};
export default Register;
