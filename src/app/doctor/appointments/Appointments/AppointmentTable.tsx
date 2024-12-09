import React from "react";
import { useRouter } from "next/navigation";
import { Table as AntdTable, Tag } from "antd";
import styled from "styled-components";

interface Appointment {
  id: string;
  userName: string;
  appointmentDate: string;
  timeslot: string;
  status: string;
  notes: string;
  fileUpload: string;
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

const AppointmentTable: React.FC = () => {
  const router = useRouter();

  const appointments: Appointment[] = [
    {
      id: "674901e7f8f47b042fa5a670",
      userName: "John Doe",
      appointmentDate: "2024-12-02T10:00:00.000+07:00",
      timeslot: "10:00 - 10:30",
      status: "approved",
      notes: "Initial consultation",
      fileUpload: "file1.pdf",
      createdAt: "2024-11-28T23:51:03.074+00:00",
    },
    {
      id: "66875455649ce7d697034876",
      userName: "Jane Smith",
      appointmentDate: "2024-12-01T14:00:00.000+07:00",
      timeslot: "14:00 - 14:30",
      status: "cancelled",
      notes: "Follow-up check",
      fileUpload: "file2.pdf",
      createdAt: "2024-11-27T19:20:03.074+00:00",
    },
    {
      id: "674901e7f8f47b042fa5a670",
      userName: "John Doe",
      appointmentDate: "2024-12-02T10:00:00.000+07:00",
      timeslot: "10:00 - 10:30",
      status: "approved",
      notes: "Initial consultation",
      fileUpload: "file1.pdf",
      createdAt: "2024-11-28T23:51:03.074+00:00",
    },
    {
      id: "674901e7f8f47b042fa5a670",
      userName: "John Doe",
      appointmentDate: "2024-12-02T10:00:00.000+07:00",
      timeslot: "10:00 - 10:30",
      status: "cancelled",
      notes: "Initial consultation",
      fileUpload: "file1.pdf",
      createdAt: "2024-11-28T23:51:03.074+00:00",
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text: string) => (
        <a
          onClick={() => router.push(`/doctor/appointments/${text}`)}
          style={{ color: "#1b61bd", fontWeight: "bold", cursor: "pointer" }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
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
  ];

  return (
    <StyledAntdTable
      dataSource={appointments}
      columns={columns as any}
      rowKey="id"
      bordered
      pagination={{ pageSize: 10 }}
      scroll={{ x: true }}
    />
  );
};

export default AppointmentTable;
