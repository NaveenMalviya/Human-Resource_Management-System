import React, { useState } from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <header className="navbar-container">
      <div className="search-input-wrapper">
        <svg
          className="search-icon"
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
        <input
          className="search-input"
          type="text"
          // value={query}
          // onChange={handleChange}
          placeholder="Search"
          aria-label="Search"
        />
      </div>
    </header>
  );
};

export default Navbar;
