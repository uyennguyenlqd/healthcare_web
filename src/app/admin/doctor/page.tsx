"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";
import { Avatar, message, Select, Table, Typography } from "antd";
import axios from "axios";

import SharedButton from "@/components/dashboard/admin/button/SharedButton";
import { ENV } from "@/constants/env";
import { DoctorModel } from "@/interfaces/models/doctors";
import CreateDoctorModal from "./Doctor/DoctorModal";

const { Text } = Typography;

const DoctorTable = () => {
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState<DoctorModel[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const handleSuccess = () => {
    console.log("Doctor created successfully!");
  };
  const router = useRouter();
  // Fetch API data
  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${ENV}/api/v1/doctor/get_all_doctor`);
      setDoctors(response.data.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);
  // Update doctor approval status
  const handleApprovalChange = async (
    doctorId: string,
    isApproved: "pending" | "approved" | "cancelled" // Cập nhật kiểu là "pending", "approved" hoặc "cancelled"
  ) => {
    try {
      const response = await axios.patch(
        `${ENV}/api/v1/doctor/update_approval/${doctorId}`,
        { isApproved }
      );

      if (response.status === 200) {
        setDoctors((prevDoctors) =>
          prevDoctors.map((doctor) =>
            doctor._id === doctorId ? { ...doctor, isApproved } : doctor
          )
        );
        message.success("Doctor approval status updated successfully!");
      } else {
        message.error("Failed to update doctor approval status.");
      }
    } catch (error) {
      console.error("Error updating doctor approval:", error);
      message.error("Failed to update doctor approval status.");
    }
  };

  // Define table columns
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (text: string) => (
        <a
          onClick={() => router.push(`/admin/doctor/${text}`)}
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
      render: (avatar: string) => <Avatar src={avatar} size="large" />,
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: any) => (
        <Text strong>
          {record.first_name} {record.last_name}
        </Text>
      ),
    },
    {
      title: "Rating",
      dataIndex: "averageRating",
      key: "averageRating",
      render: (rating: number) => (
        <Text type={rating > 0 ? "success" : "secondary"}>
          {rating > 0 ? `${rating} / 5` : "No Ratings"}
        </Text>
      ),
    },
    {
      title: "Approved",
      dataIndex: "isApproved",
      key: "isApproved",
      render: (
        isApproved: "pending" | "approved" | "cancelled",
        record: any
      ) => (
        <Select
          defaultValue={isApproved}
          style={{ width: 120 }}
          onChange={(value) => handleApprovalChange(record._id, value)}
        >
          <Select.Option value="pending">Pending</Select.Option>
          <Select.Option value="approved">Approved</Select.Option>
          <Select.Option value="cancelled">Cancelled</Select.Option>
        </Select>
      ),
    },
    {
      title: "Meet Link",
      dataIndex: "meet_link",
      key: "meet_link",
      render: (meet_link: string) =>
        meet_link ? (
          <a href={meet_link} target="_blank" rel="noopener noreferrer">
            Join Meeting
          </a>
        ) : (
          <Text type="secondary">No Link</Text>
        ),
    },
    {
      title: "Experience",
      dataIndex: "experiences",
      key: "experiences",
      render: (experiences: any[]) =>
        experiences?.[0]?.years ? `${experiences[0].years} years` : "No data",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "40px",
      }}
    >
      <SharedButton
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleShowModal}
        title="Add Doctor"
      />
      <CreateDoctorModal
        visible={isModalVisible}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />

      <Table
        dataSource={doctors}
        columns={columns}
        rowKey="_id"
        loading={loading}
        bordered
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default DoctorTable;
