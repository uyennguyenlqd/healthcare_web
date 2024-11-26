"use client";

import React, { useEffect, useState } from "react";

import PostItem_HomePage from "./PostItem_HomePage";
import Preloader from "./Preloader";

import { ENV } from "@/constants/env";

export default function PostHomePage() {
  const [items, setItems] = useState<[]>([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(`${ENV}/api/v1/news/get_all_post`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setItems(data.data);
      } catch (error: any) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchAllPosts();
  }, []);
  return (
    <section id="posts" className="posts">
      <div className="container">
        <h3 style={{ color: "#10217D", fontSize: "36px" }}>
          Mental Health News
        </h3>
        {items && items.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            {items
              .slice(0, 16)
              .map(
                (item: {
                  _id: string;
                  img: string;
                  category: string;
                  date: string;
                  title: string;
                  brief: string;
                  avatar: string;
                  author: string;
                }) => (
                  <div key={item._id}>
                    <PostItem_HomePage large={false} item={item} />
                  </div>
                )
              )}
          </div>
        ) : (
          <Preloader />
        )}
      </div>
    </section>
  );
}
