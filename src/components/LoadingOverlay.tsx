import { FC } from "react";
import { Flex, Image, Typography } from "antd";

interface LoadingOverlayProps {}

const LoadingOverlay: FC<LoadingOverlayProps> = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        flexDirection: "column",

        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        background: "#fff",
      }}
    >
      <Image
        src="/icons/health_logo.png"
        width={350}
        height={350}
        loading="lazy"
        alt="Federated Service Solutions Logo"
        preview={false}
      />
    </div>
  );
};

export default LoadingOverlay;
