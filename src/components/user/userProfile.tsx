import { Flex } from "antd";

import CustomCollapse from "../CustomCollapse";
import UserProfileTitle from "./userProfileCard";
import UserProfileForm from "./userProfileDetail";
import UserProfileDetail from "./userProfileDetail";
import AdditionalInformation from "./additionalInformation";

const UserProfile: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",

        backgroundColor: "#fff",
        width: "900px",
      }}
    >
      <CustomCollapse
        items={[
          {
            key: 1,
            label: <UserProfileTitle />,
            children: <UserProfileDetail />,
          },
        ]}
      />
      <AdditionalInformation />
    </div>
  );
};
export default UserProfile;
