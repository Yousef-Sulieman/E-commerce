import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../../context/CategoryContext";
import { useProduct } from "../../context/ProductContext"; // ← مهم جداً

function CategoriesDropdown() {
  const navigate = useNavigate();
  const { categories, fetchAllCategories } = useCategory();
  const { products } = useProduct();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!categories || categories.length === 0) {
      fetchAllCategories();
    }
  }, []);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (catId) => {
    setOpen(false);
    navigate(catId ? `/shop?category=${catId}` : "/shop");
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="relative px-10 py-4 rounded-full bg-primary text-white font-semibold 
      flex items-center gap-2 hover:bg-primary/80 transition-all cursor-pointer"
      >
        All CATEGORIES
        {/* Arrow */}
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`w-5 h-5 transition-transform duration-300 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
        {/* Total products badge */}
        <span className="text-[0.6rem] absolute right-35 -bottom-3 translate-x-1/2 bg-gray-200 text-gray-500 w-30 h-5 flex items-center justify-center rounded-full">
          TOTAL {products?.length || 0} PRODUCTS
        </span>
      </button>

      {/* DROPDOWN */}
      <div
        className={`absolute left-0 mt-2 w-60 bg-white border border-gray-200 rounded-xl shadow-lg z-[200] 
      transition-all duration-200 origin-top 
      ${
        open
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      }`}
      >
        <div className="max-h-64 overflow-y-auto custom-scroll">
          {/* Categories */}
          {categories?.map((cat) => (
            <button
              key={cat._id}
              onClick={() => handleSelect(cat._id)}
              className="block w-full text-left px-4 py-2 text-sm 
            hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesDropdown;

// import React from "react";

// function CategoriesDropdown() {
//   return <div>CategoriesDropdown</div>;
// }

// export default CategoriesDropdown;
