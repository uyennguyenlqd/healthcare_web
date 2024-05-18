/* eslint-disable max-len */
import { Avatar, Flex } from "antd";
import Typography from "antd/es/typography/Typography";
export const list = [
  {
    title: "Information security",
    content:
      " Complying with HIPAA laws and applying high technology, YouMed is committed to keeping all information about your consultation with your doctor confidential",
    source: "/icons/doctor01.png",
  },
  {
    title: "Connect with specialists 24/7",
    content:
      "Call now or proactively schedule a consultation with YouMed's leading doctors.",
    source: "/icons/hippa.png",
  },
  {
    title: "Convenient and Economical",
    content:
      "No need to travel, no need to wait for examination. Connect with leading doctors with just your laptop.",
    source: "/icons/convenience_icon.png",
  },
];
//FOR COUNSELLING ONLINE PAGE
const HealthConsultant: React.FC = () => {
  return (
    <div>
      <div
        style={{
          padding: "24px 0",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
        }}
      >
        {list.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              border: "solid 0.2px rgba(152, 162, 179, 0.4)",
              borderRadius: "8px",
              padding: "10px",

              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Avatar
              size={150}
              src={
                <img
                  src={item.source}
                  alt="hippa"
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
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <Typography
                style={{
                  fontWeight: "bold",
                  color: "#122853",
                  fontSize: "18px",
                }}
              >
                {item.title}
              </Typography>

              <Typography
                style={{
                  fontSize: "16px",
                  color: "#303030",
                  textAlign: "center",
                  width: "350px",
                }}
              >
                {item.content}
              </Typography>
            </Flex>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HealthConsultant;
