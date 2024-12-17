import React, { useState } from "react";
import { Modal, Form, Input, Button, Select, message } from "antd";
import axios from "axios";

const { Option } = Select;

interface CreateDoctorModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const CreateDoctorModal: React.FC<CreateDoctorModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/v1/doctor/create_doctor`, values);
      if (response.data.success) {
        message.success("Doctor created successfully!");
        form.resetFields();
        onSuccess();
        onClose();
      }
    } catch (error: any) {
      message.error(
        error.response?.data?.message || "Failed to create doctor. Try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      title="Create New Doctor"
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          role: "doctor",
        }}
      >
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[{ required: true, message: "Please enter first name" }]}
        >
          <Input placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[{ required: true, message: "Please enter last name" }]}
        >
          <Input placeholder="Enter last name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            { required: true, message: "Please enter password" },
            { min: 8, message: "Password must be at least 8 characters" },
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          name="confirmpassword"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm password" />
        </Form.Item>

        <Form.Item name="role" label="Role">
          <Select>
            <Option value="doctor">Doctor</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Create Doctor
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateDoctorModal;
