import React from "react";
import Link from "next/link";
import { CalendarOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import "./postItem.css";
export default function PostItem_HomePage({
  large,
  item,
}: {
  large: boolean;
  item: {
    _id: string;
    img: string;
    category: string;
    date: string;
    title: string;
    brief: string;
    avatar: string;
    author: string;
  };
}) {
  return (
    <div className={`post-entry-1 ${large ? "lg" : undefined}`}>
      <Link href={`user/news/${item._id}`}>
        <img
          src={item.img}
          alt=""
          style={{ width: "100%", borderRadius: " 16px 0px" }}
        />
      </Link>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "0 16px 16px",
        }}
      >
        <span className="post-meta">{item.category}</span>
        <div style={{ display: "flex", gap: "8px" }}>
          <CalendarOutlined />
          <span>{new Date(item.date).toLocaleDateString("en-US")}</span>
        </div>

        <h2>
          <Link href={`user/news/${item._id}`}>{item.title}</Link>
        </h2>
        <div className="author" style={{ display: "flex", marginTop: "48px" }}>
          <div className="photo">
            <img src={item.avatar} alt="" className="img-fluid" />
          </div>
          <div className="name">
            <Typography
              style={{
                fontSize: "18px",
                marginBottom: "16px",
                fontFamily: "#6C757D",
                fontWeight: 400,
              }}
            >
              {item.author}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
