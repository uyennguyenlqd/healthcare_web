/* eslint-disable max-len */
"use client";

import React, { useEffect, useState } from "react";

import CategoryFilter from "./ui/CategoryFilter";
import SearchBar from "./ui/SearchBar";
import PostItem from "./PostItem";
import Preloader from "./Preloader";
import { Pagination } from "antd";

import { ENV } from "@/constants/env";

export default function PostItems() {
  //const [items, setItems] = useState<[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20; // Số lượng bài viết trên mỗi trang

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

  const filteredItems = items.filter((item) => {
    const matchesCategory = category ? item.category === category : true;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      // item.brief.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // return (
  //   <section id="posts" className="posts">
  //     <div className="container">
  //       <h3
  //         style={{
  //           fontSize: "24px",
  //           marginBottom: "32px",
  //           fontWeight: "bold",
  //         }}
  //       >
  //         Mental Health News
  //       </h3>
  //       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-12 mb-5">
  //         {/* search bar */}
  //         <SearchBar onSearch={setSearch} />

  //         {/* category filtering */}
  //         <CategoryFilter onCategoryChange={setCategory} />
  //       </div>
  //       {items && items.length > 0 ? (
  //         <div
  //           style={{
  //             display: "grid",
  //             gridTemplateColumns: "repeat(4, 1fr)",
  //             gap: "16px",
  //           }}
  //         >
  //           {items
  //             .slice(0, 16)
  //             .map(
  //               (item: {
  //                 _id: string;
  //                 img: string;
  //                 category: string;
  //                 date: string;
  //                 title: string;
  //                 brief: string;
  //                 avatar: string;
  //                 author: string;
  //               }) => (
  //                 <div key={item._id}>
  //                   <PostItem large={false} item={item} />
  //                 </div>
  //               )
  //             )}
  //         </div>
  //       ) : (
  //         <Preloader />
  //       )}
  //     </div>
  //   </section>
  // );
  return (
    <section id="posts" className="posts">
      <div className="container">
        <h3
          style={{
            fontSize: "28px",
            marginBottom: "16px",
            fontWeight: "bold",
          }}
        >
          Mental Health News
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",

            gap: "16px",

            marginBottom: "48px",
          }}
        >
          {/* Search Bar */}
          <SearchBar onSearch={setSearch} />

          {/* Category Filtering */}
          <CategoryFilter onCategoryChange={setCategory} />
        </div>
        {/* {filteredItems.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
            }}
          >
            {filteredItems
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
                    <PostItem large={false} item={item} />
                  </div>
                )
              )}
          </div>
        ) : (
          <Preloader />
        )} */}
        {paginatedItems.length > 0 ? (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
              }}
            >
              {paginatedItems.map((item) => (
                <div key={item._id}>
                  <PostItem large={false} item={item} />
                </div>
              ))}
            </div>
            {/* Pagination */}
            <div style={{ marginTop: "24px", textAlign: "center" }}>
              <Pagination
                current={currentPage}
                total={filteredItems.length}
                pageSize={itemsPerPage}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          </>
        ) : (
          <Preloader />
        )}
      </div>
    </section>
  );
}
