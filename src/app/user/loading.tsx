import { Flex, Spin } from "antd";

export default function Loading() {
  return (
    <Flex align="center" justify="center" style={{ marginTop: "24px" }}>
      <Spin size="large" />
    </Flex>
  );
}
