"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import ProfilePage from "./profile/page";
import BookingLayout from "./layout";

const BookingPage: React.FC = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<JSX.Element | null>(<ProfilePage />);

  return <div>{selectedComponent}</div>;
};
export default BookingPage;
