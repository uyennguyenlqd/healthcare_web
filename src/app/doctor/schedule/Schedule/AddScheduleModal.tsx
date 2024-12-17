import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  List,
  Modal,
  Space,
  TimePicker,
  Typography,
} from "antd";

import { ENV } from "@/constants/env";

interface TimeSlot {
  start: string;
  end: string;
  isBooked: boolean;
}

const AddScheduleModal = ({ visible, onClose, onSubmit }: any) => {
  const [form] = Form.useForm();
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // Handler to add a new time slot
  const handleAddTimeSlot = () => {
    const { start, end } = form.getFieldsValue(["start", "end"]);

    if (!start || !end) {
      return;
    }

    setTimeSlots((prev) => [
      ...prev,
      {
        start: start.format("HH:mm"),
        end: end.format("HH:mm"),
        isBooked: false,
      },
    ]);

    form.resetFields(["start", "end"]);
  };

  // Handler to remove a time slot
  const handleRemoveTimeSlot = (index: number) => {
    setTimeSlots((prev) => prev.filter((_, i) => i !== index));
  };

  // Form submission handler
  const handleSubmit = async () => {
    form.validateFields().then(async (values) => {
      const payload = {
        doctorId: values.doctorId,
        date: values.date.format("YYYY-MM-DD"),
        timeSlots,
      };

      try {
        const response = await fetch(`${ENV}/api/v1/schedule/create_schedule`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Schedule created successfully:", data);
          onSubmit(payload); // Call onSubmit prop to notify parent component
          form.resetFields();
          setTimeSlots([]);
          onClose();
        } else {
          const errorData = await response.json();
          console.error("Failed to create schedule:", errorData);
        }
      } catch (error) {
        console.error("Error occurred while submitting:", error);
      }
    });
  };

  return (
    <Modal
      title="Add Schedule"
      visible={visible}
      onCancel={onClose}
      footer={null}
      bodyStyle={{
        padding: "24px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
      }}
      style={{
        top: "50px",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Doctor ID"
          name="doctorId"
          rules={[{ required: true, message: "Please enter the doctor ID!" }]}
        >
          <Input
            placeholder="Enter Doctor ID"
            style={{
              padding: "8px",
              backgroundColor: "#f0f2f5",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
            }}
          />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select the date!" }]}
        >
          <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
        </Form.Item>

        <Divider style={{ margin: "16px 0", color: "#595959" }}>
          Time Slots
        </Divider>

        <Space
          align="start"
          style={{
            display: "flex",
            marginBottom: "16px",
            gap: "16px",
          }}
        >
          <Form.Item
            label="Start Time"
            name="start"
            // rules={[
            //   { required: true, message: "Please select the start time!" },
            // ]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="end"
            // rules={[{ required: true, message: "Please select the end time!" }]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Button
            type="primary"
            onClick={handleAddTimeSlot}
            style={{ alignSelf: "flex-end", marginTop: "28px" }}
          >
            Add
          </Button>
        </Space>

        <List
          header={<Typography>Added Time Slots</Typography>}
          bordered
          dataSource={timeSlots}
          renderItem={(slot, index) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  danger
                  onClick={() => handleRemoveTimeSlot(index)}
                  style={{ padding: "0" }}
                >
                  Remove
                </Button>,
              ]}
              style={{
                padding: "8px 16px",
                backgroundColor: "#ffffff",
                borderRadius: "4px",
                marginBottom: "8px",
              }}
            >
              {slot.start} - {slot.end}
            </List.Item>
          )}
          style={{
            marginBottom: "16px",
            maxHeight: "200px",
            overflowY: "auto",
            backgroundColor: "#f5f5f5",
            padding: "8px",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
          }}
        />

        <Form.Item>
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ width: "100%" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddScheduleModal;
