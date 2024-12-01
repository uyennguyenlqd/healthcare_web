"use client";

import React, { useEffect, useState } from "react";

import CategoryFilter from "./ui/CategoryFilter";
import SearchBar from "./ui/SearchBar";
import PostItem from "./PostItem";
import Preloader from "./Preloader";
import { Pagination } from "antd";

import { ENV } from "@/constants/env";

export default function PostItems() {
  const [allItems, setAllItems] = useState<any[]>([]); // Full list of posts
  const [items, setItems] = useState<any[]>([]); // Filtered list
  const [category, setCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  // Fetch all posts initially
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

        setAllItems(data.data); // Save full list
        setItems(data.data); // Set initial display
      } catch (error: any) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchAllPosts();
  }, []);

  const handleSearch = async (searchText: string) => {
    setSearch(searchText);

    try {
      const response = await fetch("http://localhost:8000/api/title-search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: searchText }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      const matchingTitles = data.titles || [];

      console.log("Matching titles from API:", matchingTitles);

      // Use `allItems` for filtering instead of `items`
      console.log(
        "Items available for filtering:",
        allItems.map((item) => item.title)
      );

      const filteredResults = allItems.filter((item) =>
        matchingTitles.some(
          (title: string) =>
            title.trim().toLowerCase() === item.title.trim().toLowerCase()
        )
      );

      console.log("Filtered results:", filteredResults);

      if (filteredResults.length === 0) {
        console.warn("No matches found. Keeping existing items.");
        setItems([]); // Reset to all items if no matches
      } else {
        setItems(filteredResults);
      }
    } catch (error: any) {
      console.error("Error fetching search results:", error.message);
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesCategory = category ? item.category === category : true;
    return matchesCategory;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
          <SearchBar onSearch={handleSearch} />

          {/* Category Filtering */}
          <CategoryFilter onCategoryChange={setCategory} />
        </div>
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
