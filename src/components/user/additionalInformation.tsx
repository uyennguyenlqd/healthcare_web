import { Button, Flex } from "antd";
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
          padding: "24px 96px",
          gap: "16px",
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
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff",
            color: "#1b61bd",
            fontWeight: 500,
            fontSize: "14px",
            padding: "0px 8px",
            borderRadius: "4px",
            border: "1px solid #1b61bd",
            height: "30px",
            width: "fit-content",
          }}
          onClick={() => {
            console.log("button");
          }}
        >
          Add new record
        </Button>
      </Flex>
    </>
  );
};
export default AdditionalInformation;
