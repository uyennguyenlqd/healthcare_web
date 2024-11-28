import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";

import { ENV } from "@/constants/env";

interface CategoryFilterProps {
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ onCategoryChange }: CategoryFilterProps) => {
  const [categories, setCategories] = useState<string[]>([]); // Lưu danh sách category
  const [loading, setLoading] = useState<boolean>(true); // Hiển thị trạng thái loading

  // Fetch categories từ API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${ENV}/api/v1/news/getListCategory`); // Gọi API backend
        const data = await response.json();

        if (data.success) {
          setCategories(["all", ...data.categories]);
          console.error("Failed to fetch categories:", data.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex gap-2 items-center justify-center mx-4">
      <h3
        style={{
          fontWeight: "bold",
          fontSize: "22px",
          flexShrink: 0,
        }}
      >
        Filter by Category:{" "}
      </h3>

      {/* Hiển thị loading spinner khi đang tải */}
      {loading ? (
        <Spin size="small" />
      ) : (
        <Select
          defaultValue="all"
          style={{ width: 300 }}
          onChange={(value) => onCategoryChange(value === "all" ? "" : value)}
          placeholder="Select Category"
          options={categories.map((category) => ({
            value: category,
            label: category,
          }))}
          className="capitalize"
        />
      )}
    </div>
  );
};

export default CategoryFilter;
