"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, message, Table } from "antd";
import axios from "axios";

import { ENV } from "@/constants/env";
import { UserProfileModel } from "@/interfaces/models/users";

const UserTable = () => {
  const [users, setUsers] = useState<UserProfileModel[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Gọi API lấy dữ liệu
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${ENV}/api/v1/users/get_all_user`); // Thay URL bằng endpoint của bạn
      const { success, data } = response.data;
      if (success) {
        setUsers(data);
      } else {
        message.error("Failed to fetch users.");
      }
    } catch (error) {
      message.error("Error fetching users: " + message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => (
        <a
          onClick={() => router.push(`/admin/user/${text}`)}
          style={{ color: "#1b61bd", fontWeight: "bold", cursor: "pointer" }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar) => <Avatar src={avatar} alt="User Avatar" />,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string | number | Date) =>
        new Date(createdAt).toLocaleDateString(),
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      rowKey="_id"
      loading={loading}
      bordered
      pagination={{ pageSize: 10 }}
    />
  );
};

export default UserTable;
