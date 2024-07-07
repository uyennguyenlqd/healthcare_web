"use client";

import ViewDoctorDetail from "./ViewAddEdit/ViewDetailDoctor";

export default function CustomerDetail({
  params: { id },
}: Readonly<{
  params: { id: string };
}>) {
  return <ViewDoctorDetail id={id} />;
}
