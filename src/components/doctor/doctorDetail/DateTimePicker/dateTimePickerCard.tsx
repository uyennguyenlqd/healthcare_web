import { Button, Typography } from "antd";
const mock: any = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}];
const DateTimePickerCard: React.FC = () => {
  return (
    <div
      style={{
        border: "solid 0.2px rgba(152, 162, 179, 0.4)",
        borderRadius: "8px",
        padding: "24px",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          padding: "24px 0",
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",

          gap: "20px",
        }}
      >
        {mock.map((_: any, idx: React.Key | null | undefined) => (
          <Button
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              border: "solid 0.2px rgba(152, 162, 179, 0.4)",
              borderRadius: "12px",
              padding: "10px 0",
              justifyContent: "flex-start",
              alignItems: "center",
              height: "fit-content",
            }}
            onClick={() => {
              console.log("button");
            }}
          >
            <Typography
              style={{
                color: "#122853",
                fontSize: "16px",
              }}
            >
              10:30 - 11:00
            </Typography>
          </Button>
        ))}
      </div>
      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",
          color: "#1b61bd",
          fontSize: "16px",
          border: 0,
          padding: 0,
          boxShadow: "none",
          width: "fit-content",
        }}
        onClick={() => {
          console.log("button");
        }}
      >
        View All
      </Button>
    </div>
  );
};
export default DateTimePickerCard;
