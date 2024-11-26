import { Flex } from "antd";
import Title from "antd/es/typography/Title";

const HeaderTitle: React.FC = () => {
  return (
    <Flex>
      <Title
        style={{
          fontSize: 28,
          fontWeight: "bold",
          margin: 0,
          color: "#1677FF",
          marginRight: "5px",
        }}
        level={4}
      >
        UTE
      </Title>

      <Title
        style={{
          fontSize: 28,
          fontWeight: "bold",
          margin: 0,
          color: "#10217D",
        }}
        level={4}
      >
        Health
      </Title>
    </Flex>
  );
};
export default HeaderTitle;
