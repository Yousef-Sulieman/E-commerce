import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/Shop/FilterSidebar";
import ProductsList from "../../components/product/ProductsList";
import { useProduct } from "../../context/ProductContext";
import banner from "../../assets/bacola-banner-18.jpg.png";

function Shop() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const categoryId = params.get("category");

  const { fetchAllProducts, setCategory } = useProduct();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchAllProducts();
    if (categoryId) {
      setCategory(categoryId);
    }
  }, [categoryId, fetchAllProducts, setCategory]);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="container mx-auto px-4 mt-10 relative">
      {/* Mobile Burger Button */}
      <div className="lg:hidden mb-4 flex justify-end">
        <button
          onClick={toggleSidebar}
          className="relative w-10 h-10 flex flex-col justify-between items-center text-white z-50"
          aria-label="Toggle Sidebar"
        >
          <span
            className={`block h-1 w-full bg-orange-500 rounded transition-transform duration-300 ${
              sidebarOpen ? "rotate-45 translate-y-3" : ""
            }`}
          ></span>
          <span
            className={`block h-1 w-full bg-orange-500 rounded transition-opacity duration-300 ${
              sidebarOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block h-1 w-full bg-orange-500 rounded transition-transform duration-300 ${
              sidebarOpen ? "-rotate-45 -translate-y-3" : ""
            }`}
          ></span>
        </button>
      </div>

      <div className="lg:flex lg:gap-10">
        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 h-full w-[250px] bg-white shadow-lg z-50 transform transition-transform duration-300 lg:static lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar />
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Product List + Banner */}
        <div className="flex-1 lg:mt-0 mt-6">
          <ProductsList />
        </div>
      </div>
    </div>
  );
}

export default Shop;
