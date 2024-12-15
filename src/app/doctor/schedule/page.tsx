"use client";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import SharedButton from "@/components/dashboard/admin/button/SharedButton";
import NewsTable from "../news/News/NewsTable";
import AddScheduleModal from "./Schedule/AddScheduleModal";
import ScheduleTable from "./Schedule/ScheduleTable";
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
        gap: "40px",
        alignItems: "flex-end",
        width: "100%",
      }}
    >
      <SharedButton
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleShowModal}
        title="Add Schedule"
      />
      <AddScheduleModal visible={isModalVisible} onClose={handleCloseModal} />
      <ScheduleTable />
    </div>
  );
};

export default NewsPage;
