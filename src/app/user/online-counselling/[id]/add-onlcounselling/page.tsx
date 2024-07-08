import OnlineCounsellingTabs from "../ViewAddEdit/ViewAddAppointment";

export default function OnlineCounselling({
  params: { id },
}: Readonly<{
  params: { id: string };
}>) {
  return <OnlineCounsellingTabs id={id} />;
}
