import { Avatar, Flex } from "antd";
import Typography from "antd/es/typography/Typography";
import dayjs from "dayjs";
const UserProfileTitle: React.FC = () => {
  const date = dayjs("01/01/2024", "DD/MM/YYYY");
  return (
    <Flex
      style={{
        // width: "fit-content",
        border: "solid 0.2px rgba(152, 162, 179, 0.4)",
        borderRadius: "8px",
        padding: "8px 24px",
        gap: "40px",
      }}
    >
      <Avatar
        style={{ backgroundColor: "#E0E0E0" }}
        size={100}
        src={
          <img
            src={"/icons/teen-girl.png"}
            alt="doctor_card"
            style={{
              position: "relative",
              objectFit: "contain",
              objectPosition: "center bottom",
            }}
          />
        }
      />

      <Flex
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Typography
          style={{
            fontWeight: "bold",
            color: "#122853",
            fontSize: "18px",
            lineHeight: "48px",
            letterSpacing: "0.02em",
          }}
        >
          Jennie Kim
        </Typography>
        <Typography
          style={{
            fontSize: "16px",
            color: "#303030",
            textAlign: "center",
            lineHeight: "24px",
            letterSpacing: "0.02em",
          }}
        >
          {date.format("YYYY-MM-DD")}
        </Typography>
      </Flex>
    </Flex>
  );
};
export default UserProfileTitle;
