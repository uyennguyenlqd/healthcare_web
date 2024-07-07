import Link from "next/link";
import {
  DropboxOutlined,
  EnvironmentOutlined,
  StarFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import { Avatar, Flex } from "antd";
import Typography from "antd/es/typography/Typography";

import { DoctorModel } from "@/interfaces/models/doctors";
interface DoctorDetailInfoProps {
  doctor: DoctorModel;
}

const DoctorDetailInfo: React.FC<DoctorDetailInfoProps> = ({ doctor }) => {
  return (
    <div>
      <Flex
        style={{
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
              src={doctor.avatar || "/icons/doctor02.png"}
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
            {doctor.first_name} {doctor.last_name}
          </Typography>
          <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <UserAddOutlined />
            <Typography
              style={{
                fontSize: "16px",
                color: "#303030",
                textAlign: "center",
                lineHeight: "24px",
                letterSpacing: "0.02em",
              }}
            >
              {doctor.experiences[0].years || null}{" "}
              {doctor.experiences[0].description || null}
            </Typography>
          </div>

          <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <DropboxOutlined />

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
              {doctor.specialty?.name_specialty}
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <EnvironmentOutlined />
            <Typography
              style={{
                fontSize: "16px",
                color: "#303030",
                textAlign: "center",
                letterSpacing: "0.02em",
              }}
            >
              {doctor.hospital?.hospital_name}
            </Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "16px" }}>
            <StarFilled style={{ color: "#FFFF24", fontSize: "22px" }} />
            <Typography
              style={{
                fontSize: "16px",
                color: "#303030",
                textAlign: "center",
                letterSpacing: "0.02em",
              }}
            >
              {doctor.averageRating}
            </Typography>
          </div>
        </Flex>
      </Flex>
    </div>
  );
};
export default DoctorDetailInfo;
