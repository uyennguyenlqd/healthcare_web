import React, { useState, useEffect } from "react";
import { Table as AntdTable, Tag } from "antd";
import styled from "styled-components";
import axios from "axios"; // Sử dụng axios để gọi API
import { ENV } from "@/constants/env";
import { useSession } from "next-auth/react";

// Styled Ant Design Table
const StyledAntdTable = styled(AntdTable)<{ scroll?: object }>`
  .ant-table {
    background-color: rgba(0, 0, 0, 0);
    .ant-table-container {
      .ant-table-content {
        padding-bottom: ${(props) => (props.scroll ? 24 : 0)}px;
        table {
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

const ScheduleTable = () => {
  const [schedules, setSchedules] = useState([]); // State để lưu dữ liệu
  const { data: session } = useSession();
  // Hàm gọi API
  const fetchSchedules = async () => {
    try {
      const response = await axios.get(
        `${ENV}/api/v1/schedule/get_schedules_for_next_7days`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );

      const data = response.data?.schedules || [];
      setSchedules(data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchSchedules();
  }, []);

  // Định nghĩa các cột
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Time Slots",
      dataIndex: "timeSlots",
      key: "timeSlots",
      render: (timeSlots: any[]) => (
        <div>
          {timeSlots.map((slot, index) => (
            <Tag color={slot.isBooked ? "red" : "green"} key={index}>
              {slot.start} - {slot.end}{" "}
              {slot.isBooked ? "(Booked)" : "(Available)"}
            </Tag>
          ))}
        </div>
      ),
    },
  ];

  return (
    <StyledAntdTable
      columns={columns}
      dataSource={schedules}
      rowKey={(record) => record._id} // Đảm bảo mỗi record có _id duy nhất
      bordered
      pagination={{ pageSize: 10 }}
      scroll={{ x: true }}
    />
  );
};

export default ScheduleTable;
