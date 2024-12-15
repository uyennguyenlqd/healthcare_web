"use client";
import React, { useState } from "react";
import { Form, Input, Button, Switch, Select, message, Modal } from "antd";
import { useRouter } from "next/navigation";

const { TextArea } = Input;

const AddNewsModal = ({ visible, onCancel, onFinish }: any) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleCancel = () => {
    onCancel(); // Gọi onCancel từ props để đóng modal
  };

  const handleFinish = async (values: {
    title: any;
    category: any;
    brief: any;
    author: any;
    top: any;
    trending: any;
  }) => {
    // Dữ liệu giả lập, không kết nối với API
    const newsData = {
      title: values.title,
      category: values.category,
      brief: values.brief,
      author: values.author,
      top: values.top,
      trending: values.trending,
    };

    console.log("Submitted News Data:", newsData);

    // Hiển thị thông báo thành công
    message.success("News added successfully!");

    // Gọi onFinish từ props và chuyển dữ liệu
    onFinish(newsData);

    // Chuyển hướng đến trang danh sách tin tức
    router.push("/doctor/news");
  };

  return (
    <Modal
      title="Add News"
      visible={visible}
      onCancel={handleCancel}
      footer={null}
      width={600}
    >
      <Form
        form={form}
        name="addNews"
        onFinish={handleFinish}
        initialValues={{
          top: false,
          trending: false,
        }}
        layout="vertical"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select the category!" }]}
        >
          <Select placeholder="Select category">
            <Select.Option value="Health">Health</Select.Option>
            <Select.Option value="News">News</Select.Option>
            <Select.Option value="Updates">Updates</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="brief"
          label="Brief"
          rules={[{ required: true, message: "Please input the brief!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="author"
          label="Author"
          rules={[{ required: true, message: "Please input the author name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="top" label="Top News" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item
          name="trending"
          label="Trending News"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ height: "30px", fontSize: "16px" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddNewsModal;
