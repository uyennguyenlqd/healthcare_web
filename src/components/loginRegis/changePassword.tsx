import { Button, Flex, Form, Input, Typography, notification } from "antd";
import HeaderTitle from "../header/header_title";
import { FC, useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { AuthApi } from "@/app/api/user";
import { useParams, useRouter } from "next/navigation";

const ChangePassword: FC = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [disableResetPass, setDisableResetPass] = useState(true);
  const [typePassword, setTypePassword] = useState("password");
  const [typeConfirmPassword, setTypeConfirmPassword] = useState("password");
  const { id, token } = useParams<{ id: string; token: string }>();
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

    setDisableResetPass(hasErrors);
  };
  const handleForgotPassword = () => {
    form &&
      form.validateFields().then(async (values) => {
        setLoading(true);
        try {
          if (id && token) {
            const resBody = {
              id: id,
              token: token,
              newpassword: values.password,
            };
            const res = await AuthApi.resetForgotPassword(resBody);
            console.log("res: ", res);
            if (!res.data) {
              throw new Error("");
            }
            notification.success({
              message: "Your password has changed. You can log in now!",
            });
            setLoading(false);
            router.push("/auth/login");
          } else {
            throw new Error("ID or token is missing");
          }
        } catch (error) {
          console.error(error);
          notification.error({
            message: "Something went wrong. Please try again!",
          });
          setLoading(false);
        }
      });
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
            Change your password
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
            SUBMIT
          </Button>
        </div>
      </div>
    </Flex>
  );
};
export default ChangePassword;
