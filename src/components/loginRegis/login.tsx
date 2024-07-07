import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, useSession } from "next-auth/react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";

import HeaderTitle from "../header/header_title";
import LoginScreen from "./logScreen";

import { login, performLogin } from "@/hooks/auth";
import {
  StyleContainerSign,
  StyleFooter,
  StyleForgotPass,
  StyleForm,
  StyleLoginDescription,
  StyleMainBody,
  StyleTextOr,
  StyleWrapperRemember,
} from "@/styles/signInUp.styled";
const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [typePassword, setTypePassword] = useState("password");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [disableLogin, setDisableLogin] = useState(true);

  const togglePassword = () => {
    const newType = typePassword === "password" ? "text" : "password";
    setTypePassword(newType);
  };
  //TODO : Not show noti error
  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      const result = await performLogin(values);
      if (result?.error) {
        console.error("Login Failed:", result.error);
      } else {
        notification["success"]({
          message: "Login Successfully",
          duration: 1,
        });
        const session = await getSession();

        if (session?.user.role === "user") {
          router.push("/user");
        } else if (session?.user.role === "doctor") {
          router.push("/doctor");
        }
      }
    } catch (error) {
      notification.error({
        message: "Something went wrong. Please try again!",
      });
      console.error("Validation Failed:", error);
    }
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
                suffix={
                  typePassword === "password" ? (
                    <EyeOutlined onClick={togglePassword} />
                  ) : (
                    <EyeInvisibleOutlined onClick={togglePassword} />
                  )
                }
              />
            </Form.Item>
            <StyleWrapperRemember>
              <StyleForgotPass href="/auth/forgot-password">
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
              onClick={() => login("google")}
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
        <Link
          href={"/auth/register"}
          style={{
            fontSize: "16px",
            lineHeight: "30px",
            letterSpacing: "0.02em",
            color: "#1976d2",
          }}
        >
          Sign up now!
        </Link>
      </StyleFooter>
    </LoginScreen>
  );
};
export default Login;
