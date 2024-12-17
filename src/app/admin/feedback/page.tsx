"use client";
import React, { useEffect, useState } from "react";
import { Avatar, Button, Input, message, Select, Table, Tag } from "antd";
import axios from "axios";

import { ENV } from "@/constants/env";

const { Option } = Select;

// Định nghĩa kiểu cho review
interface Review {
  _id: string;
  doctor: {
    avatar: string;
    first_name: string;
    last_name: string;
  };
  user: {
    avatar: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  reviewText: string; // Thêm trường reviewText
  status: string;
  createdAt: string;
}

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([]); // Định nghĩa kiểu dữ liệu
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | undefined>();
  const [doctorId, setDoctorId] = useState<string | undefined>();
  const [searchDoctorId, setSearchDoctorId] = useState<string | undefined>("");

  // Hàm gọi API lấy danh sách reviews
  const fetchReviews = async (filters: {
    status?: string;
    doctorId?: string;
  }) => {
    try {
      setLoading(true);
      const response = await axios.get(`${ENV}/api/v1/reviews/get_reviews`, {
        params: filters,
      });
      setReviews(response.data.data); // Gán danh sách reviews vào state
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
          "Có lỗi xảy ra khi lấy danh sách reviews"
      );
    } finally {
      setLoading(false);
    }
  };
  // Hàm cập nhật trạng thái review
  const updateReviewStatus = async (reviewId: string, status: string) => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${ENV}/api/v1/reviews/${reviewId}/status`,
        {
          status,
        }
      );
      message.success(
        response.data.message || "Cập nhật trạng thái thành công"
      );
      fetchReviews({ status, doctorId }); // Tải lại danh sách sau khi cập nhật
    } catch (error: any) {
      message.error(
        error?.response?.data?.message ||
          "Có lỗi xảy ra khi cập nhật trạng thái"
      );
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteReview = async (reviewId: string) => {
    try {
      // Xác nhận trước khi xóa
      const confirmed = window.confirm(
        "Are you sure you want to delete this review?"
      );
      if (!confirmed) return;

      // Gọi API xóa review
      await axios.delete(`${ENV}/api/v1/reviews/${reviewId}`);

      // Cập nhật danh sách review sau khi xóa thành công
      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );

      message.success("Review deleted successfully.");
    } catch (error: any) {
      message.error(
        error?.response?.data?.message || "Failed to delete the review."
      );
    }
  };

  // Lấy danh sách reviews mỗi khi bộ lọc thay đổi
  useEffect(() => {
    fetchReviews({ status, doctorId });
  }, [status, doctorId]);

  // Cột dữ liệu trong bảng
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => <span>{id}</span>,
    },
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      render: (doctor) =>
        doctor ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={doctor.avatar} alt="Doctor Avatar" />
            <span style={{ marginLeft: 8 }}>
              {doctor.first_name} {doctor.last_name}
            </span>
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user) =>
        user ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar src={user.avatar} alt="User Avatar" />
            <span style={{ marginLeft: 8 }}>
              {user.first_name} {user.last_name}
            </span>
          </div>
        ) : (
          "N/A"
        ),
    },
    {
      title: "Review Text",
      dataIndex: "reviewText",
      key: "reviewText",
      render: (text: string) => <span>{text || "No review"}</span>, // Hiển thị nội dung review
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "approved"
              ? "green"
              : status === "rejected"
                ? "red"
                : "blue"
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string | number | Date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (review: Review) => (
        <Select
          value={review.status}
          style={{ width: 150 }}
          onChange={(newStatus) => updateReviewStatus(review._id, newStatus)}
        >
          <Option value="pending">Pending</Option>
          <Option value="approved">Approved</Option>
          <Option value="rejected">Rejected</Option>
        </Select>
      ),
    },
    {
      title: "Delete",
      key: "delete",
      render: (review: Review) => (
        <Button
          type="primary"
          danger
          onClick={() => handleDeleteReview(review._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Reviews Management</h1>

      {/* Bộ lọc */}
      <div style={{ marginBottom: 16, display: "flex", gap: "10px" }}>
        <Select
          placeholder="Filter by status"
          style={{ width: 200 }}
          onChange={(value) => setStatus(value)}
          allowClear
        >
          <Option value="approved">Approved</Option>
          <Option value="pending">Pending</Option>
          <Option value="rejected">Rejected</Option>
        </Select>

        <Input
          placeholder="Filter by Doctor ID"
          style={{ width: 300 }}
          onChange={(e) => setSearchDoctorId(e.target.value)}
        />
        <Button
          type="primary"
          onClick={() => {
            if (searchDoctorId) {
              setDoctorId(searchDoctorId); // Gán doctorId khi nhấn search
            } else {
              message.warning("Vui lòng nhập Doctor ID.");
            }
          }}
        >
          Search
        </Button>
      </div>

      <Table
        dataSource={reviews}
        columns={columns}
        rowKey={(record) => record._id}
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ReviewsPage;
