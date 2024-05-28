import { Tabs, TabsProps } from "antd";
import DateTimePickerCard from "./dateTimePickerCard";

const DateTimeTabs: React.FC = () => {
  const customLabels = ["Morning", "Afternoon", "Evening"];
  return (
    <div
      style={{
        border: "solid 0.2px rgba(152, 162, 179, 0.4)",
        borderRadius: "8px",
        padding: "24px",
        backgroundColor: "#fff",
      }}
    >
      <h3
        style={{
          color: "#10217D",
          fontSize: "24px",
        }}
      >
        Select counseling date
      </h3>
      <Tabs
        defaultActiveKey="1"
        type="card"
        items={customLabels.map((label, i) => {
          const id = String(i + 1);
          return {
            label: label,
            key: id,
            children: <DateTimePickerCard />,
          };
        })}
      />
    </div>
  );
};
export default DateTimeTabs;
