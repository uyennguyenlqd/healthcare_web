"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"; // Import icons
import { Avatar, Button, Space, Table, Typography } from "antd";

import { ENV } from "@/constants/env";
import { useRouter } from "next/navigation";
const PatientTable = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();
  // Lấy danh sách bệnh nhân từ API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch(`${ENV}/api/v1/doctor/regular-patient`, {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setPatients(data.data);
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "userDetails", // Assuming the patient's ID is stored in `_id`
      key: "id",
      render: (userDetails: any) => (
        <Typography
          style={{ cursor: "pointer", color: "blue" }}
          onClick={() => router.push(`/doctor/patients/${userDetails._id}`)} // Navigate to the patient detail page
        >
          {userDetails._id}
        </Typography>
      ),
    },
    {
      title: "Avatar",
      dataIndex: "userDetails",
      key: "avatar",
      render: (userDetails: any) => (
        <Avatar src={userDetails.avatar} size={50} />
      ),
    },
    {
      title: "Name",
      dataIndex: "userDetails",
      key: "name",
      render: (userDetails: any) => (
        <span>
          {userDetails.first_name} {userDetails.last_name}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "userDetails",
      key: "email",
      render: (userDetails: any) => <span>{userDetails.email}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <span>{status === "approved" ? "Approved" : status}</span>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={patients}
      rowKey="bookingId"
      loading={loading}
      pagination={false} // Bạn có thể thay đổi nếu muốn phân trang
      bordered
    />
  );
};

export default PatientTable;
