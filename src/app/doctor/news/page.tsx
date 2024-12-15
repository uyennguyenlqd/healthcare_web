"use client";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import AddNewsModal from "./News/NewsModal";

import SharedButton from "@/components/dashboard/admin/button/SharedButton";
import NewsTable from "./News/NewsTable";

const NewsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

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
        title="Add News"
      />

      <AddNewsModal visible={isModalVisible} onCancel={handleCloseModal} />
      <NewsTable />
    </div>
  );
};

export default NewsPage;
