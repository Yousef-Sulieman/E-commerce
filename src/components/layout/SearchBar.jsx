import React, { useState, useEffect, useRef } from "react";
import { useProduct } from "../../context/ProductContext";
import { Link, useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
function SearchBar() {
  const { allProducts, setSearch } = useProduct();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // -------------------------------------------
  // Debounce Search (300ms)
  // -------------------------------------------
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const filtered = allProducts.filter((p) =>
        p.Name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 6));
      setShowDropdown(true);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, allProducts]);

  // -------------------------------------------
  // Close dropdown if clicked outside
  // -------------------------------------------
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // -------------------------------------------
  // Submit Search → navigate to /shop?search=
  // -------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setSearch(query);
    navigate(`/shop?search=${query}`);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 flex items-center gap-2 rounded-lg py-5 px-4 w-full"
      >
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full text-xl outline-none bg-transparent"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setShowDropdown(true)}
        />

        <GoSearch className="text-2xl" />
      </form>

      {/* Search Dropdown */}
      {showDropdown && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg max-h-80 overflow-auto z-50 p-2">
          {results.map((item) => (
            <Link
              key={item._id}
              to={`/product/${item._id}`}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => setShowDropdown(false)}
            >
              <img
                src={item.Image.url}
                alt={item.Name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <p className="font-medium text-sm">{item.Name}</p>
                <p className="text-primary text-sm">${item.Price}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* No results */}
      {showDropdown && query && results.length === 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg p-3 text-gray-500">
          No products found.
        </div>
      )}
    </div>
  );
}

export default SearchBar;
