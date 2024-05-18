import Link from "next/link";
import { Button, Result } from "antd";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle="Trang bạn đang tìm kiếm không tồn tại"
        extra={
          <Link href="/">
            <Button
              type="primary"
              style={{
                alignItems: "center",
                backgroundColor: "#1b61bd",
                fontSize: "14px",
              }}
            >
              Back Home
            </Button>
          </Link>
        }
      />
    </div>
  );
}
