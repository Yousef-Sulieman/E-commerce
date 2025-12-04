import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function CartDropdown() {
  const { cart, loading } = useCart();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const count = cart?.length || 0;

  // Toggle dropdown
  const toggleDropdown = () => setOpen((prev) => !prev);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Icon */}
      <div className="cursor-pointer relative" onClick={toggleDropdown}>
        <FaShoppingCart className="w-7 h-7 text-primary" />

        {/* Count Badge */}
        <span
          className={`absolute -top-2 -right-2 text-xs text-white px-2 py-0.5 rounded-full 
            ${count === 0 ? "bg-red-400" : "bg-red-600 animate-pulse"}
          `}
        >
          {count}
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-72 bg-white shadow-lg rounded-lg p-4 
          transition-all duration-200 z-1000"
        >
          {loading && <div>Loading...</div>}

          {count === 0 && <div className="text-gray-500">Cart is empty</div>}

          {count > 0 &&
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 py-2 border-b border-gray-200"
              >
                <img
                  src={item.Image?.url}
                  alt={item.name}
                  className="w-12 h-12 rounded object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.quantity} × ${item.price}
                  </p>
                </div>
              </div>
            ))}

          {count > 0 && (
            <Link to="/cart">
              <button className="w-full mt-3 bg-primary text-white py-2 rounded hover:bg-teal-600 cursor-pointer transition-colors">
                View Cart
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
