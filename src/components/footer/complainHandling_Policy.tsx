import { Flex } from "antd";
import SolutionStep from "./AboutUs/solutionStep";

const ComplainHandlingPolicy: React.FC = () => {
  return (
    <Flex
      style={{
        flexDirection: "column",
        padding: "24px 96px",
        width: "700px",
        margin: "auto",
      }}
    >
      <h3 style={{ color: "#10217D", fontSize: "32px", textAlign: "center" }}>
        Process for receiving and resolving customer complaints
      </h3>
      <SolutionStep
        title="Subject of complaint"
        description="Be a Customer/Patient using services through the Application of UteHealth Vietnam Company Limited."
      />
      <SolutionStep
        title=" Form of complaint"
        description="Customers/Patients who have complaints about the service can contact Hotline 1900 2805 directly during business hours for answers."
      />
      <SolutionStep
        title="End the complaint"
        description="Maintain customer/patient complaint records.
After resolving the dispute, the parties are responsible for reporting it to UteHealth. In case a conflict arises due to an error from the service provider/seller, UteHealth will apply appropriate handling measures depending on the level of violation. At the same time, the service provider/seller is responsible for compensating the customer based on the agreement with the customer.
Within 30 days, if negotiations cannot be reached, the parties can bring the dispute to be resolved at the competent People's Court."
      />
    </Flex>
  );
};
export default ComplainHandlingPolicy;
