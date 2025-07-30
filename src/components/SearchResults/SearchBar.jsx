import React, { useState } from "react";
import axios from "axios";
import "./search.css";

function SearchBar({ setSearchResults }) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    const searchText = e.target.value;
    setQuery(searchText);

    if (searchText.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=0ffb386a852dbf070ac6b977313d8039&query=${searchText}`
      );
      setSearchResults(response.data.results);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        placeholder="Search for Movies or TV Shows"
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchBar;
