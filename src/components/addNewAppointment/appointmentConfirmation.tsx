import UserAppointment from "../user/userAppointment";
import UserProfileDetail from "../user/userProfileDetail";

const OnlineConfirmationTab: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        width: "900px",
        margin: "auto",
      }}
    >
      <UserAppointment />
      <UserProfileDetail />
    </div>
  );
};
export default OnlineConfirmationTab;
