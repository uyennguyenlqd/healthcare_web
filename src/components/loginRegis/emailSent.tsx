import { FC } from "react";
import { Button, Flex, Typography } from "antd";
import { useRouter } from "next/navigation";

const EmailSent: FC = () => {
  const router = useRouter();
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
          flex: "1 1 800px",
          maxWidth: "800px",
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
          <Typography
            style={{
              fontSize: "32px",
              lineHeight: "40px",
              color: "#201f19",
              marginBottom: "20px",
            }}
          >
            Check Your Email
          </Typography>
          <Typography
            style={{
              fontSize: "20px",
              lineHeight: "20px",
              textAlign: "center",
              letterSpacing: "0.15px",
              color: "#201f19",
              marginBottom: "20px",
            }}
          >
            We sent a link to your email .Please click on it to reset
            password!!!
          </Typography>
          <Button
            style={{
              width: "100%",
              fontSize: "16px",
              marginTop: "10px",
              fontWeight: 500,
            }}
            onClick={() => {
              router.push("https://www.google.com/intl/vi/gmail/about/");
            }}
            type="primary"
            size="large"
          >
            OPEN GMAIL
          </Button>
        </div>
      </div>
    </Flex>
  );
};
export default EmailSent;
