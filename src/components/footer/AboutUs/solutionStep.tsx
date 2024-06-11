import { CaretDownOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
function SolutionStep(props: any) {
  return (
    <Flex style={{ flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <CaretDownOutlined size={26} />
        <Typography
          style={{ color: "#10217D", fontSize: "20px", fontWeight: "bold" }}
        >
          {props.title}
        </Typography>
      </div>
      <Typography style={{ fontSize: "18px", maxWidth: "700px" }}>
        {props.description}
      </Typography>
    </Flex>
  );
}
export default SolutionStep;
