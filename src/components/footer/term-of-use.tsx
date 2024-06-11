import { Flex } from "antd";
import SolutionStep from "./AboutUs/solutionStep";

const TermOfUse: React.FC = () => {
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
        Term Of Use
      </h3>
      <SolutionStep
        title="Register to use and log in to your account"
        description="When registering for an account on , you need to provide accurate, complete and up-to-date personal information.

After registering, you are responsible for protecting the password and should not disclose the password to anyone or authorize or allow anyone to use it for any purpose. UTEHealth
 will always treat access and use of the services by someone else's username and password as access and use of the services by that customer, regardless of the username and password. may be used by others without the owner's knowledge or permission.

If you discover that anyone knows your password or is using your password to access and use services on the website, you need to immediately notify us and change your password or request us to do so. Support setting new password."
      />
      <SolutionStep
        title="Right to collect and use information"
        description="When you access and use the website, UteHealth may collect and store information such as access statistics, personal information provided to UteHealth when registering, booking services... Personal information provided by customers includes full name, phone number, email address, residential address... We can use this information for planning, research, design and propaganda. services or providing information to legal authorities as required by Law or Court."
      />
      <SolutionStep
        title="Disclaimer"
        description="UteHealth has appropriate security measures and services in place. However, UteHealth cannot absolutely guarantee the website against sabotage or viruses from the Internet.
UteHealth makes no warranties or representations as to the accuracy or completeness of any information on these platforms. UteHealth will periodically add, change, improve or update features and information on this website without prior notice. In any event, UteHealth will not be responsible for any loss, damage, liability caused by the use of information from these platforms, nor for any errors, omissions, interruptions or information delay.

Use of the information is entirely at the user's own risk. In no event shall UteHealth or its representatives be liable for any direct, indirect, incidental, special or consequential damages.

UteHealth's platforms may contain links to other websites that are not owned or controlled by UteHealth or contain information provided by third parties. Therefore, UteHealth is not responsible for errors or omissions in citation information and the content, privacy, security of websites linked to as well as any damages when you access and use them. use those websites."
      />
      <SolutionStep
        title="Regulations on unacceptable actions"
        description="You are not authorized to violate, penetrate, access, use or attempt to violate, penetrate, access or use any part of our servers, and/or any data areas. without our permission.

You have no right or action to restrict or prohibit any other user from using the facilities on the UteHealth site.

You are not authorized to post or transmit any information that is unlawful, fraudulent, defamatory, defamatory, obscene, pornographic, profane, threatening, abusive, hateful, inflammatory… or otherwise contrary to the law. general moral standards of society in any form, including promoting or encouraging conduct that may constitute a crime or violate any provision of local, national or international law. international. We respect the right to freedom of expression, but also reserve the right to omit or delete part or all of any content you post, regardless of whether the violation is obvious or just implicit. idea.

You are not allowed to post or transmit any messages that are advertising, solicitations, chain letters, investment opportunities or any other form of unsolicited commercial communication, spam or spam messages.

You must not send or transmit any information that does not belong to you unless it is provided free of charge, do not send any information that contains any viruses, Trojan horses, bugs or other components. Which part is dangerous?

You will not send, publish, transmit, reproduce, distribute or in any way exploit any information obtained from UteHealth for commercial purposes; or upload, submit, publish, transmit, reproduce or distribute in any way content protected by UteHealth's copyright and intellectual property laws or create variations of the content content without the written consent of the owner or copyright holder.

You may not use the information on these platforms in any form or for any purpose, except as established in these Terms of Use."
      />
    </Flex>
  );
};
export default TermOfUse;
