import React from "react";
import LanguageDropdown from "./LanguageDropdown";
import { Link } from "react-router-dom";

function TopBanner() {
  return (
    <>
      <div className=" w-full py-2 text-white text-center bg-primary">
        Due to current circumstances, there may be slight delays in order
        processing
      </div>
      <div className="hidden lg:block bg-white border-b border-gray-200">
        <div className=" max-w-7xl mx-auto h-10  flex items-center justify-between">
          <ul className="flex items-center gap-2">
            <li>
              <Link className="text-gray-600  text-md" to="/aboutus">
                About Us
              </Link>
            </li>
            <li>
              <Link className="text-gray-600  text-md" to="/compare">
                Compare
              </Link>
            </li>
            <li>
              <Link className="text-gray-600  text-md" to="/wishlist">
                Wishlist
              </Link>
            </li>
          </ul>
          <div className="flex items-center gap-6 h-full">
            <p className="text-gray-600 text-md">
              100% Secure delivery without contacting the courier
            </p>
            <p className="text-black font-bold text-sm">
              Need help? Call Us:{" "}
              <span className="text-primary font-bold">+ 0020 500</span>
            </p>
            <div className="flex items-center gap-2 border-l border-gray-200 h-full pl-5">
              <LanguageDropdown />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TopBanner;
