import { Button } from "antd";

const ButtonBookDoctor: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          color: "#1b61bd",
          fontWeight: 500,
          fontSize: "18px",
          padding: "0px 20px",
          borderRadius: "8px",
          border: "1px solid #1b61bd",
          minWidth: 144,
          height: "55px",
          letterSpacing: "1px",
          width: "100%",
        }}
        onClick={() => {
          console.log("button");
        }}
      >
        Chat Now
      </Button>
      <div style={{ display: "flex", gap: "8px" }}>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#1b61bd",
            color: "#fff",
            fontWeight: 500,
            fontSize: "18px",
            padding: "0px 20px",
            borderRadius: "8px",
            border: "1px solid #1677FF",
            minWidth: 144,
            height: "55px",
            letterSpacing: "1px",
            width: "50%",
          }}
          onClick={() => {
            console.log("button");
          }}
        >
          Book an Appointment
        </Button>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#17C256",
            color: "#fff",
            fontWeight: 500,
            fontSize: "18px",
            padding: "0px 20px",
            borderRadius: "8px",
            border: "1px solid #17C256",
            minWidth: 144,
            height: "55px",
            letterSpacing: "1px",
            width: "50%",
          }}
          onClick={() => {
            console.log("button");
          }}
        >
          Call Video Now
        </Button>
      </div>
    </div>
  );
};
export default ButtonBookDoctor;
