import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

export default function DropdownMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/");
  };

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
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center flex-col gap-2 p-2 rounded-full hover:bg-gray-200 transition"
      >
        <FaUserCircle className="w-7 h-7 text-gray-700" />
        {user && <span className="font-medium text-xs">{user.Name}</span>}
      </button>

      {open && (
        <div className="absolute -left-10 md:left-0 lg:-left-4 mt-2 w-40 bg-white  rounded-lg shadow-2xl z-50000 overflow-hidden">
          {user ? (
            <>
              <div className="px-4 py-2 border-b border-gray-300 font-medium text-sm flex items-center justify-between cursor-pointer">
                {user.Name} <CiUser className="w-5 h-5" />
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition flex items-center justify-between cursor-pointer"
              >
                Logout <IoIosLogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-4 py-2 hover:bg-gray-100 transition"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 hover:bg-gray-100 transition"
                onClick={() => setOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
