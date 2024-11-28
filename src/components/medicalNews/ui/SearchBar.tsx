import React, { useState } from "react";
import { Input } from "antd";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const { Search } = Input;

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleOnSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value); // Call the onSearch function passed as a prop
  };

  return (
    <div className="mb-4 md:w-3/4">
      <h3
        style={{
          fontWeight: "bold",
          fontSize: "22px",
          flexShrink: 0,
        }}
      >
        Search News
      </h3>
      <Search
        style={{ width: "800px" }}
        placeholder="Search By ......"
        allowClear
        value={searchTerm}
        onSearch={handleOnSearch} // Handle search on submit
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term while typing
      />
    </div>
  );
};

export default SearchBar;
