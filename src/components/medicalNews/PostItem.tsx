import React from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { CalendarOutlined } from "@ant-design/icons";
import { Typography } from "antd";

import "./postItem.css";
const inter = Inter({ subsets: ["latin"] });
export default function PostItem({
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
    <div
      className={`post-entry-1 ${large ? "lg" : undefined} ${inter.className}`}
    >
      <Link href={`news/${item._id}`}>
        <img
          src={item.img}
          alt=""
          style={{ width: "100%", height: "200px", borderRadius: " 16px 0px" }}
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

        <h2 style={{ height: "80px", margin: 0 }}>
          <Link href={`news/${item._id}`}>{item.title}</Link>
        </h2>
        <>
          <p
            style={{
              margin: 0,
              display: "block",
              height: "72px",
            }}
          >
            
            {item.brief.substring(0, 110)}...
          </p>
          <div className="author" style={{ display: "flex" }}>
            <div className="photo">
              <img
                src={item.avatar}
                alt=""
                className="img-fluid"
                style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              />
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
        </>
      </div>
    </div>
  );
}
