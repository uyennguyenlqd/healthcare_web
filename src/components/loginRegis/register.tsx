import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input, notification } from "antd";

import HeaderTitle from "../header/header_title";
import LoginScreen from "./logScreen";

import { AuthApi } from "@/app/api/user";
import {
  StyleContainerSign,
  StyleFooter,
  StyleForm,
  StyleLoginDescription,
  StyleMainBody,
} from "@/styles/signInUp.styled";
const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [disableLogin, setDisableLogin] = useState(true);
  const [disableRegister, setDisableRegister] = useState(true);

  const router = useRouter();
  const togglePassword = () => {
    const newType = typePassword === "password" ? "text" : "password";
    setTypePassword(newType);
  };
  const toggleConfirmPassword = () => {
    const newType = typeConfirmPassword === "password" ? "text" : "password";
    setTypeConfirmPassword(newType);
  };
  const onFieldsChange = async () => {
    const hasErrors =
      form.getFieldsError().some((field) => {
        return field.errors.length > 0;
      }) || !form.isFieldsTouched(true);

    setDisableRegister(hasErrors);
  };
  const handleRegister = () => {
    form &&
      form.validateFields().then(async (values: any) => {
        setLoading(true);
        if (values.password.length < 8) {
          setLoading(false);
          console.error("Password must be at least 8 characters long");
        }
        try {
          const resBody = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            password: values.password,
            confirmpassword: values.confirmpassword,
          };

          const response = await AuthApi.register(resBody);

          if (response.status === 200) {
            router.push("/auth/login");
            notification["success"]({
              message: "Register Successfully",
            });
          }
        } catch (error: any) {
          setLoading(false);
          console.error(error.message);
          notification.error({
            message: "Something went wrong. Please try again!",
          });
        }
      });
  };
  return (
    <LoginScreen>
      <HeaderTitle />
      <StyleContainerSign>
        <StyleMainBody>
          <StyleLoginDescription>
            Let’s get started with your 14 days free trial
          </StyleLoginDescription>
          <StyleForm
            layout="vertical"
            form={form}
            onFieldsChange={onFieldsChange}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Form.Item
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter first name",
                  },
                ]}
                name="first_name"
              >
                <Input
                  size="large"
                  type="text"
                  style={{ border: "1px solid #7E7E7E" }}
                />
              </Form.Item>
              <Form.Item
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please enter Last name",
                  },
                ]}
                name="last_name"
              >
                <Input
                  size="large"
                  type="text"
                  style={{ border: "1px solid #7E7E7E" }}
                />
              </Form.Item>
            </div>
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
                {
                  min: 8,
                  message: "Password must contain at lease 8 characters",
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
            <Form.Item
              label="Confirm Password"
              rules={[
                {
                  required: true,
                  message: "Enter your confirm password",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Your password does not match.");
                  },
                }),
              ]}
              className="form-password"
              name="confirmpassword"
            >
              <Input
                size="large"
                type={typeConfirmPassword}
                style={{ border: "1px solid #7E7E7E" }}
                suffix={
                  typeConfirmPassword === "password" ? (
                    <EyeOutlined onClick={toggleConfirmPassword} />
                  ) : (
                    <EyeInvisibleOutlined onClick={toggleConfirmPassword} />
                  )
                }
              />
            </Form.Item>

            <Form.Item className="form-item-submit">
              <Button
                loading={loading}
                onClick={handleRegister}
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
                Register
              </Button>
            </Form.Item>
          </StyleForm>
        </StyleMainBody>
      </StyleContainerSign>
      <StyleFooter>
        Already have an Account ? &nbsp;
        <Link
          href={"/auth/login"}
          style={{
            fontSize: "16px",
            lineHeight: "30px",
            letterSpacing: "0.02em",
            color: "#1976d2",
          }}
        >
          Login now!
        </Link>
      </StyleFooter>
    </LoginScreen>
  );
};
export default Register;
