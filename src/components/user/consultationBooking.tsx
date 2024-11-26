import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Avatar, Button, Flex, notification, Typography } from "antd";
import dayjs from "dayjs";
import moment from "moment";

import { ENV } from "@/constants/env";
import { DoctorModel } from "@/interfaces/models/doctors";

interface DoctorDetailInfoProps {
  doctor: DoctorModel;
  selectedTimeslot: string;
  selectedDate: string;
  notes: string;
  url: string;
  ticketPrice: number;
}
const ConsultationBooking: React.FC<DoctorDetailInfoProps> = ({
  doctor,
  selectedTimeslot,
  selectedDate,
  notes,
  url,
  ticketPrice,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const timeslot = selectedTimeslot;
  const bookingHandler = async () => {
    // try {
    //   const res = await fetch(`${ENV}/api/v1/booking/vnpay-checkout`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       amount: doctor.ticketPrice, // Giá vé từ Backend
    //       orderId: "ORDER123", // Mã đơn hàng
    //       orderInfo: "Thanh toan dat lich", // Thông tin thanh toán
    //     }),
    //   });
    //   const { paymentUrl } = await res.json();
    //   if (paymentUrl) {
    //     window.location.href = paymentUrl; // Điều hướng đến trang thanh toán
    //   }
    // } catch (err) {
    //   console.error("Payment error:", err);
    // }
    try {
      if (!session?.user?.token) {
        throw new Error("User not authenticated");
      }

      // Send request to create booking
      const response = await fetch(
        `${ENV}/api/v1/booking/checkout-session/${doctor._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: doctor.ticketPrice,
            orderId: `ORDER-${Date.now()}`,
            orderInfo: "Payment for booking",
            timeslot,
            notes,
            status: "pending",
            isPaid: false,
            file_upload: url,
            txnRef: moment().format("DDHHmmss"),
            appointmentDate: dayjs(selectedDate).format(
              "YYYY-MM-DDTHH:mm:ss.SSSZ"
            ),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.message;
        notification.error({
          message: "Payment failed",
          description: errorMessage,
        });
        return;
      }

      // Check if payment URL is returned
      if (data.paymentUrl) {
        // Redirect user to payment page
        window.location.href = data.paymentUrl;
      } else {
        // If no payment URL, show success message (or handle differently)
        notification.success({
          message: "Booking created successfully",
          description: "Your appointment has been scheduled.",
        });
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      notification.error({
        message: "Failed to create booking",
        description: "An unexpected error occurred. Please try again.",
      });
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "24px",
        marginTop: "96px",
        width: "300px",
        gap: "24px",
        height: "fit-content",
        border: "solid 0.5px rgba(152, 162, 179, 0.4)",
        borderRadius: "16px",
        backgroundColor: "#fff",
      }}
    >
      <h4
        style={{
          fontWeight: "bold",
          color: "#10217D",
          fontSize: "24px",
          textAlign: "center",
          margin: 0,
          marginBottom: "10px",
        }}
      >
        Consultation Booking
      </h4>
      <Flex style={{ justifyContent: "space-between" }}>
        <Avatar
          style={{ backgroundColor: "#E0E0E0" }}
          size={64}
          src={
            <img
              src={doctor.avatar || "/icons/doctor02.png"}
              alt=""
              style={{
                position: "relative",
                objectFit: "contain",
                objectPosition: "center bottom",
              }}
            />
          }
        />
        <Typography
          style={{
            fontSize: "20px",
            color: "#10217D",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
          {doctor.first_name} {doctor.last_name}
        </Typography>
      </Flex>
      <Flex style={{ justifyContent: "space-between" }}>
        <Typography style={{ fontSize: "18px" }}>Price</Typography>
        <Typography style={{ fontSize: "18px", fontWeight: "bold" }}>
          {doctor.ticketPrice} VND
        </Typography>
      </Flex>
      <Flex style={{ justifyContent: "space-between" }}>
        <Typography style={{ fontSize: "18px" }}>Patient</Typography>
        <Typography style={{ fontSize: "18px", fontWeight: "bold" }}>
          {session?.user?.name}
        </Typography>
      </Flex>
      <Flex style={{ justifyContent: "space-between" }}>
        <Typography style={{ fontSize: "18px" }}>Appointment Date </Typography>
        <Typography style={{ fontSize: "18px", fontWeight: "bold" }}>
          {selectedDate}
        </Typography>
      </Flex>
      <Flex style={{ justifyContent: "space-between" }}>
        <Typography style={{ fontSize: "18px" }}>Time Slot</Typography>
        <Typography style={{ fontSize: "18px", fontWeight: "bold" }}>
          {selectedTimeslot}
        </Typography>
      </Flex>

      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1b61bd",
          color: "#fff",
          fontWeight: 500,
          fontSize: "16px",
          padding: "0px 8px",
          borderRadius: "8px",
          height: "45px",
          border: "1px solid #1677FF",

          letterSpacing: "1px",
        }}
        disabled={!selectedDate || !selectedTimeslot}
        onClick={bookingHandler}
      >
        Book an Appointment
      </Button>
    </div>
  );
};
export default ConsultationBooking;
