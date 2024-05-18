import { Flex, Form } from "antd";
import Input from "antd/es/input/Input";
import Typography from "antd/es/typography/Typography";
export const content = [
  {
    title: "Name",
    content: "Jennie Kim",
  },
  {
    title: "Birthday",
    content: "01/01/2024",
  },
  {
    title: "Gender",
    content: "Female",
  },
  {
    title: "Phone",
    content: "0116997835",
  },
];
//TO DO => NEED TO CHANGE UI USER PROFILE
const UserProfileDetail: React.FC = () => {
  return (
    <div
      style={{
        border: "solid 0.2px rgba(152, 162, 179, 0.4)",
        borderRadius: "8px",
        padding: "24px",
        width: "94%",
      }}
    >
      {content.map((item) => (
        <div key={item.title} style={{ display: "flex", gap: "40px" }}>
          <Typography
            style={{
              fontWeight: "bold",
              color: "#122853",
              fontSize: "16px",
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
        </div>
      ))}
    </div>
  );
};
export default UserProfileDetail;
