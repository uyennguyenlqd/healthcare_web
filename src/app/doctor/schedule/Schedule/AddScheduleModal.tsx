import React, { useState } from "react";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  List,
  Modal,
  Space,
  TimePicker,
  Typography,
} from "antd";
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
  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const payload = {
        doctorId: values.doctorId,
        date: values.date.format("YYYY-MM-DD"),
        timeSlots,
      };
      onSubmit(payload);
      form.resetFields();
      setTimeSlots([]);
      onClose();
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
        <Form.Item label="Doctor ID">
          <Typography
            style={{
              display: "block",
              padding: "8px",
              backgroundColor: "#f0f2f5",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
            }}
          >
            0000000
          </Typography>
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
            rules={[
              { required: true, message: "Please select the start time!" },
            ]}
          >
            <TimePicker format="HH:mm" />
          </Form.Item>

          <Form.Item
            label="End Time"
            name="end"
            rules={[{ required: true, message: "Please select the end time!" }]}
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
