import { Flex } from "antd";
import SolutionStep from "./AboutUs/solutionStep";

const PrivacyPolicy: React.FC = () => {
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
        Privacy Policy
      </h3>
      <SolutionStep
        title="Gather informationGather information"
        description="Personal information : UteHealth only requires personal information such as name, email, phone number, address,... and some other optional information when users want to interact with some content on the website. , application. This personal information is used for UteHealth and related platforms to identify and contact when needed, as well as optimize features based on that information.
Search history: UteHealth will store the user's search history in the system. The purpose of this storage is for us to improve search quality so that future visits will be more accurate and more relevant. with user needs."
      />
      <SolutionStep
        title="How to use information"
        description="Normally, we use information provided by users only to contact, respond to questions or fulfill requests. Personal information including medical and health data, images, and user records can be shared with doctors, hospitals, and medical facilities in case of consent to ensure ensure that your needs are best met when using our services.
We absolutely do not share any user's personal information with third parties without consent. Where required by law, UteHealth is responsible for cooperating in providing customer information.UteHealth customer data may be transferred to a successor or person designated to manage the company in the event of a merger, acquisition or bankruptcy."
      />
      <SolutionStep
        title="Ensure security of collected information"
        description="UteHealth only gathers personal information to the extent that it is relevant and necessary for the purpose of best serving our users' needs. We maintain appropriate measures to ensure the safety, integrity, accuracy and confidentiality of the information users provide.
In addition, we also take appropriate measures to ensure that third parties use similar security measures for the information we provide to them, if any."
      />
      <SolutionStep
        title="Cookies"
        description="Cookies are small files downloaded to record activities within a website/application. We use cookies to record user activities with the aim of limiting the same user from seeing the same advertising content repeatedly. In addition, we also use cookies to respond to user requests and for other purposes.
On our website/application, we may place advertisements from other individuals and units. These advertisements may collect users' cookies and UteHealth cannot access this information. Whenever a user accesses a website/application, most browsers set to automatically receive cookies. If you want to disable cookies, you can set cookies in your browser settings."
      />
      <SolutionStep
        title="Terms of change"
        description="We reserve the right to change the content of these terms. Please check back regularly for changes to our privacy policy. In addition, we will notify users by email when there are significant changes in the way we use your personal information."
      />
    </Flex>
  );
};
export default PrivacyPolicy;
