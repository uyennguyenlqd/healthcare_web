"use client";
import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { Table as AntdTable, Tag } from "antd";
import styled from "styled-components";
// Define the type for News
interface News {
  _id: string;
  img: string;
  category: string;
  date: string;
  title: string;
  brief: string | null;
  avatar: string | null;
  author: string | null;
  top: boolean;
  trending: boolean;
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

const NewsTable = () => {
  const [newsList, setNewsList] = useState<News[]>([]);

  // Fetch news data from API
  useEffect(() => {}, []);

  // Handle delete news
  const handleDelete = () => {};

  // Columns definition for the table
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Top",
      dataIndex: "top",
      key: "top",
      render: (top: boolean) => (
        <Tag color={top ? "green" : "red"}>{top ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Trending",
      dataIndex: "trending",
      key: "trending",
      render: (trending: boolean) => (
        <Tag color={trending ? "blue" : "red"}>{trending ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: News) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              // Implement Edit functionality
              console.log("Editing", record._id);
            }}
          >
            Edit
          </Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete()}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <StyledAntdTable
      dataSource={newsList}
      columns={columns as any}
      rowKey="id"
      bordered
      pagination={{ pageSize: 10 }}
      scroll={{ x: true }}
    />
  );
};

export default NewsTable;
