"use client";

import React, { useEffect, useState } from "react";
import { Avatar, Card, Descriptions, Spin, message } from "antd";
import axios from "axios";

import { ENV } from "@/constants/env";
import { UserProfileModel } from "@/interfaces/models/users";

export default function UserDetailsAdmin({
  params: { id },
}: {
  params: { id: string };
}) {
  const [user, setUser] = useState<UserProfileModel | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${ENV}/api/v1/users/get_single_user/${id}`
      );
      const { success, data } = response.data;

      if (success) {
        setUser(data);
      } else {
        message.error("Failed to fetch user details.");
      }
    } catch (error) {
      message.error("Error fetching user details: " + message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        No user data available.
      </div>
    );
  }

  return (
    <Card
      bordered
      style={{
        width: "90%",
        margin: "20px auto",
        borderRadius: "30px",
        padding: "24px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Avatar size={150} src={user.avatar} alt="User Avatar" />
        <h2
          style={{ fontSize: "22px" }}
        >{`${user.first_name} ${user.last_name}`}</h2>
      </div>
      <Descriptions bordered column={1} title="User Details">
        <Descriptions.Item label="Email" style={{ fontSize: "16px" }}>
          {user.email}
        </Descriptions.Item>
        <Descriptions.Item label="Phone" style={{ fontSize: "16px" }}>
          {user.phone || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Gender" style={{ fontSize: "16px" }}>
          {user.gender || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Date of Birth" style={{ fontSize: "16px" }}>
          {user.day_of_birth || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Address" style={{ fontSize: "16px" }}>
          {user.address || "N/A"}
        </Descriptions.Item>
        <Descriptions.Item label="Role" style={{ fontSize: "16px" }}>
          {user.roles}
        </Descriptions.Item>
        <Descriptions.Item label="First Login" style={{ fontSize: "16px" }}>
          {user.first_login ? "Yes" : "No"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
