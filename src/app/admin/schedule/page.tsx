"use client";
import React, { useEffect, useState } from "react";
import { Alert, DatePicker, Space, Spin, Table } from "antd";
import axios from "axios";
import moment from "moment";
import { ENV } from "@/constants/env";

interface TimeSlot {
  start: string;
  end: string;
  isBooked: boolean;
}

// Interface cho đối tượng `Schedule`
interface Doctor {
  _id: string;
  first_name: string;
  last_name: string;
}

export interface Schedule {
  _id: string;
  doctorId: Doctor;
  date: Date;
  timeSlots: TimeSlot[];
}

const SchedulePage = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Hàm gọi API
  const fetchSchedules = async (date?: string) => {
    setLoading(true);
    setError(null);

    try {
      // Gọi API với query parameter
      const response = await axios.get(
        `${ENV}/api/v1/schedule/get_all_schedules`,
        {
          params: { date },
        }
      );

      setSchedules(response.data.schedules || []);
    } catch (err) {
      setError("Lỗi khi tải danh sách lịch!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  // Xử lý khi chọn ngày
  const handleDateChange = (date: any) => {
    if (date) {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      setSelectedDate(formattedDate);
      fetchSchedules(formattedDate);
    } else {
      setSelectedDate(null);
      fetchSchedules(); // Lấy lại toàn bộ lịch nếu xóa ngày
    }
  };

  // Cột của bảng
  const columns = [
    {
      title: "Doctor",
      dataIndex: "doctor",
      key: "doctor",
      render: (_: any, record: Schedule) =>
        `${record.doctorId.first_name || "N/A"} ${record.doctorId.last_name || ""}`,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: Date) => moment(date).format("DD/MM/YYYY"),
    },
    {
      title: "TimeSlot",
      dataIndex: "timeSlots",
      key: "timeSlots",
      render: (timeSlots: TimeSlot[]) =>
        timeSlots
          .map(
            (slot) =>
              `${slot.start} - ${slot.end} ${slot.isBooked ? "(isBooked)" : ""}`
          )
          .join(", "),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Schedule Management</h1>

      {/* Bộ lọc ngày */}
      <Space direction="vertical" size="large" style={{ marginBottom: "20px" }}>
        <DatePicker
          onChange={handleDateChange}
          value={selectedDate ? moment(selectedDate, "YYYY-MM-DD") : null}
          allowClear
        />
      </Space>

      {/* Hiển thị bảng */}
      {loading ? (
        <Spin tip="Đang tải dữ liệu..." size="large" />
      ) : error ? (
        <Alert message="Lỗi" description={error} type="error" showIcon />
      ) : (
        <Table
          dataSource={schedules}
          columns={columns}
          rowKey={(record) => record._id}
          bordered
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default SchedulePage;
