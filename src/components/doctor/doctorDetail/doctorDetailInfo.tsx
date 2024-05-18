import {
  DropboxOutlined,
  EnvironmentOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Avatar, Flex } from "antd";
import Typography from "antd/es/typography/Typography";
import Link from "next/link";

const DoctorDetailInfo: React.FC = () => {
  return (
    <div>
      <Flex
        style={{
          //   width: "fit-content",
          border: "solid 0.2px rgba(152, 162, 179, 0.4)",
          borderRadius: "8px",
          padding: "24px",
          gap: "40px",
          backgroundColor: "#fff",
        }}
      >
        <Avatar
          style={{ backgroundColor: "#E0E0E0" }}
          size={200}
          src={
            <img
              src={"/icons/doctor02.png"}
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
              fontSize: "22px",
              lineHeight: "48px",
              letterSpacing: "0.02em",
            }}
          >
            BS.CK2 Y K Mishra
          </Typography>
          <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <UserAddOutlined size={25} />
            <Typography
              style={{
                fontSize: "16px",
                color: "#303030",
                textAlign: "center",
                lineHeight: "24px",
                letterSpacing: "0.02em",
              }}
            >
              6 Years of Experiece
            </Typography>
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <DropboxOutlined size={25} />
            {/* <Typography
              style={{
                fontSize: "16px",
                color: "#303030",
                textAlign: "center",
                lineHeight: "24px",
                letterSpacing: "0.02em",
              }}
            >
              Nhi Khoa
            </Typography> */}
            <Link
              style={{
                fontSize: "16px",
                color: "#303030",
                textAlign: "center",
                lineHeight: "24px",
                letterSpacing: "0.02em",
                fontFamily:
                  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'",
              }}
              href="/"
            >
              Nhi Khoa
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <EnvironmentOutlined size={25} />
            <Typography
              style={{
                fontSize: "16px",
                color: "#303030",
                textAlign: "center",
                letterSpacing: "0.02em",
              }}
            >
              01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Thành phố Hồ Chí Minh
            </Typography>
          </div>
        </Flex>
      </Flex>
    </div>
  );
};
export default DoctorDetailInfo;
