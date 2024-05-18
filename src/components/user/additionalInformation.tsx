import { Flex } from "antd";
import TextArea from "antd/es/input/TextArea";
import Typography from "antd/es/typography/Typography";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";

const AdditionalInformation: React.FC = () => {
  return (
    <>
      {/* {content.map((item, index) => ( */}
      <Flex
        style={{
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px",
          gap: "24px",
        }}
      >
        <Typography
          style={{
            fontSize: "18px",
          }}
        >
          Notes
        </Typography>

        <TextArea />
        <Typography
          style={{
            fontSize: "18px",
          }}
        >
          Upload file
        </Typography>
        <Dragger>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
      </Flex>
    </>
  );
};
export default AdditionalInformation;
