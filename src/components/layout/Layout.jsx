import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ProductDetailsModal from "../product/ProductDetailsModal";
import { Outlet } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {" "}
        <Outlet />
        <ProductDetailsModal />
      </main>
      <Footer />
    </div>
  );
}
