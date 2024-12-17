import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Table as AntdTable, Tag } from "antd";
import axios from "axios";
import styled from "styled-components";

import { ENV } from "@/constants/env";
interface Booking {
  _id: string;
  user: {
    _id: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
  appointmentDate: string;
  timeslot: string;
  status: string;
  notes: string;
  createdAt: string;
}

const StyledAntdTable = styled(AntdTable)<{ scroll?: object }>`
  .ant-table {
    background-color: rgba(0, 0, 0, 0);
    .ant-table-container {
      .ant-table-content {
        padding-bottom: ${(props) => (props.scroll ? 24 : 0)}px;
        table {
          table-layout: fixed;
          height: 100%;
          border: 0.5px solid var(--border-color, #d8d8d8);
          border-radius: 8px;

          .ant-table-thead > tr > th {
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            line-height: 16px;
            height: 72px;
            padding: 0px 24px;
            border: 0.5px solid var(--border-color, #e8e8e8);
          }

          .ant-table-tbody > tr > td {
            text-align: center;
            font-size: 16px;
            font-weight: 400;
            line-height: 20px;
            height: 64px;
            border: 0.5px solid var(--border-color, #e8e8e8);
            background: #ffff;
          }

          .ant-table-summary > tr > td {
            text-align: center;
            font-size: 16px;
            font-style: normal;
            font-weight: 700;
            line-height: 16px;
            color: var(--header-color, #bf0a0a);
          }
        }
      }
    }
  }

  .ant-table-pagination.ant-pagination {
    margin-bottom: 0 !important;
  }
`;

const BookingTable: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession();
  // State to store bookings data
  const [appointments, setAppointments] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${ENV}/api/v1/doctor/bookings`, {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });
        setAppointments(response.data.data); // Gán dữ liệu từ API vào state
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => (
        <a
          onClick={() => router.push(`/doctor/booking/${text}`)}
          style={{ color: "#1b61bd", fontWeight: "bold", cursor: "pointer" }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "User Name",
      key: "userName",
      render: (text: string, record: Booking) =>
        `${record.user.first_name} ${record.user.last_name}`,
    },

    {
      title: "Appointment Date",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Timeslot",
      dataIndex: "timeslot",
      key: "timeslot",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = status === "approved" ? "green" : "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Expiration Status", // Cột hiển thị trạng thái hết hạn
      key: "expirationStatus",
      render: (text: string, record: Booking) => {
        const appointmentDate = new Date(record.appointmentDate);
        const timeslot = record.timeslot.split(" - "); // Chia timeslot thành khoảng thời gian bắt đầu và kết thúc
        const startTime = timeslot[0]; // Lấy giờ bắt đầu
        const [hours, minutes] = startTime.split(":").map(Number); // Tách giờ và phút từ chuỗi

        // Cập nhật đối tượng Date với giờ và phút từ timeslot
        appointmentDate.setHours(hours, minutes, 0, 0); // Thiết lập giờ, phút cho ngày đã có

        const currentDate = new Date();

        // Kiểm tra nếu thời gian cuộc hẹn đã quá hạn
        if (appointmentDate < currentDate) {
          return <Tag color="red">Expired</Tag>; // Cuộc hẹn quá hạn
        } else {
          return <Tag color="green">Active</Tag>; // Cuộc hẹn còn hạn
        }
      },
    },
  ];

  return (
    <StyledAntdTable
      dataSource={appointments}
      columns={columns as any}
      rowKey="id"
      bordered
      pagination={{ pageSize: 10 }}
      loading={loading} // Hiển thị loading khi dữ liệu chưa được tải
      scroll={{ x: true }}
    />
  );
};

export default BookingTable;
