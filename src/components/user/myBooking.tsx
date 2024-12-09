"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import MyBookingCard from "./myBookingCard";

import { ENV } from "@/constants/env";
import { BookingModel } from "@/interfaces/models/booking";

const MyBooking: React.FC = () => {
  const [bookings, setBooking] = useState<BookingModel[]>([]);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${ENV}/api/v1/users/bookings`, {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        setBooking(data.data);
      } catch (error: any) {
        console.error("Error fetching appointments:", error.message);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div style={{ display: "flex", gap: "24px", flexDirection: "column" }}>
      {bookings.map((booking, idx) => (
        <MyBookingCard key={idx} booking={booking} />
      ))}
    </div>
  );
};
export default MyBooking;
