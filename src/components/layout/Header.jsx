import React from "react";
import TopBanner from "./Top Banner";
import logo from "../../assets/logo.svg";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import CategoriesNav from "./CategoriesNav";
import DropdownMenu from "./DropdownMenu";
import CartDropdown from "./CartDropdown";
import { HiMenu } from "react-icons/hi";
import { useState } from "react";
function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <TopBanner />
      <div className="block w-full">
        <div className="w-full py-3">
          <div className="flex justify-between items-center w-full">
            {/*  BURGER BUTTON */}
            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden text-2xl font-bold text-[#009689] rotate-180 ml-2 cursor-pointer z-50 transition-all duration-300  "
            >
              <HiMenu />
            </button>
            <div className="pt-0 lg:pt-4 w-full px-4 xl:px-[150px] flex justify-between items-center md:overflow-visible">
              <div className="flex justify-center items-center w-full gap-0 lg:gap-6 ">
                <Link to="/" className="mx-auto">
                  <img src={logo} alt="" className="min-w-[165px] " />
                </Link>
                {/* Search Bar */}
                <div className="hidden lg:flex w-full ">
                  <SearchBar />
                </div>
                {/* Dropdown Menu */}
                <div className="flex gap-4 items-center mx-auto">
                  <DropdownMenu />
                  <CartDropdown />
                </div>
              </div>
            </div>
          </div>
          {/* Categories Nav */}
          <div className="hidden lg:block">
            <CategoriesNav />
          </div>
          {/* 📱 MOBILE MENU (OFFCANVAS) */}
          {/* Overlay */}
          {isOpen && (
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            ></div>
          )}

          {/* Sidebar itself */}
          <div
            className={`fixed top-0 left-0 h-full w-[80%] bg-white z-50 p-5
                    transform transition-transform duration-300 lg:hidden
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl mb-4 font-bold cursor-pointer"
            >
              ✕
            </button>

            {/* SEARCH BAR */}
            <div className="mb-6">
              <SearchBar />
            </div>

            {/* CATEGORIES NAV */}
            <CategoriesNav />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
