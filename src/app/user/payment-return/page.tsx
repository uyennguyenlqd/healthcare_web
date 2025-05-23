// "use client";
// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Button, Result, Spin } from "antd";

// import { ENV } from "@/constants/env";

// // Define an interface for payment status
// interface PaymentStatus {
//   success: boolean;
//   message: string;
// }

// const VNPayReturn = () => {
//   const searchParams = useSearchParams(); // Use useSearchParams to get query parameters
//   const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(
//     null
//   );
//   const router = useRouter();
//   useEffect(() => {
//     const queryParams = searchParams;

//     if (queryParams) {
//       console.log("Search Params:", queryParams); // Log the searchParams to ensure it's correct

//       // Convert searchParams into query string
//       const queryString = new URLSearchParams(
//         Array.from(queryParams.entries()).reduce(
//           (acc, [key, value]) => {
//             acc[key] = value || ""; // Ensure values are not undefined
//             return acc;
//           },
//           {} as Record<string, string>
//         )
//       ).toString();

//       console.log("Query String:", queryString); // Log the queryString

//       // Call API to process payment result
//       const fetchPaymentStatus = async () => {
//         try {
//           const response = await fetch(
//             `${ENV}/api/v1/booking/vnpay-return?${queryString}`
//           );
//           if (!response.ok) {
//             throw new Error("Network response was not ok");
//           }
//           const data: PaymentStatus = await response.json();
//           setPaymentStatus(data); // Update payment result
//         } catch (error) {
//           setPaymentStatus({
//             success: false,
//             message: "Error while processing payment",
//           });
//           console.error("Fetch error:", error);
//         }
//       };

//       fetchPaymentStatus();
//     }
//   }, [searchParams]);

//   return (
//     <div style={{ textAlign: "center", marginTop: "40px" }}>
//       {paymentStatus === null ? (
//         <Spin size="large" />
//       ) : paymentStatus.success ? (
//         <Result
//           status="success"
//           title="Payment Successful"
//           subTitle={paymentStatus.message}
//           extra={[
//             <Button
//               type="primary"
//               key="home"
//               onClick={() => router.push("/user/booking/payment")}
//             >
//               Go to My Appointment
//             </Button>,
//           ]}
//         />
//       ) : (
//         <Result
//           status="error"
//           title="Payment Failed"
//           subTitle={paymentStatus.message}
//           extra={[
//             <Button
//               type="primary"
//               key="home"
//               onClick={() => (window.location.href = "/")}
//             >
//               Go to Homepage
//             </Button>,
//           ]}
//         />
//       )}
//     </div>
//   );
// };

// export default VNPayReturn;

"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Result, Spin } from "antd";
import { ENV } from "@/constants/env";

// Define an interface for payment status
interface PaymentStatus {
  success: boolean;
  message: string;
}

const VNPayReturn = () => {
  const searchParams = useSearchParams(); // Get query parameters
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const router = useRouter();
  const isApiCalled = useRef(false); // Reference to ensure API is only called once

  useEffect(() => {
    if (isApiCalled.current) return; // Prevent API from being called again if it's already called
    isApiCalled.current = true; // Mark the API as called once

    const queryParams = searchParams;
    
    if (!queryParams) {
      setPaymentStatus({
        success: false,
        message: "No payment information found in the query parameters.",
      });
      return;
    }

    console.log("Search Params:", queryParams); // Log searchParams to verify

    // Convert queryParams to query string
    const queryString = new URLSearchParams(
      Array.from(queryParams.entries()).reduce(
        (acc, [key, value]) => {
          acc[key] = value || ""; // Ensure values are not undefined
          return acc;
        },
        {} as Record<string, string>
      )
    ).toString();

    console.log("Query String:", queryString); // Log the queryString for debugging

    // Call API to process payment result
    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch(
          `${ENV}/api/v1/booking/vnpay-return?${queryString}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: PaymentStatus = await response.json();
        setPaymentStatus(data); // Update payment status based on response
      } catch (error) {
        setPaymentStatus({
          success: false,
          message: "Error while processing payment",
        });
        console.error("Fetch error:", error);
      }
    };

    fetchPaymentStatus();
  }, [searchParams]);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      {paymentStatus === null ? (
        <Spin size="large" />
      ) : paymentStatus.success ? (
        <Result
          status="success"
          title="Payment Successful"
          subTitle={paymentStatus.message}
          extra={[
            <Button
              type="primary"
              key="home"
              onClick={() => router.push("/user/booking/payment")}
            >
              Go to My Appointment
            </Button>,
          ]}
        />
      ) : (
        <Result
          status="error"
          title="Payment Failed"
          subTitle={paymentStatus.message}
          extra={[
            <Button
              type="primary"
              key="home"
              onClick={() => (window.location.href = "/")}
            >
              Go to Homepage
            </Button>,
          ]}
        />
      )}
    </div>
  );
};

export default VNPayReturn;
