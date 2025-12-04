import React, { useEffect } from "react";
import { useProduct } from "../../context/ProductContext";
import ProductCard from "./ProductCard";
import banner from "../../assets/bacola-banner-18.jpg.png";
import ProductSkeleton from "../../components/Loaders/ProductSkeleton";

export default function ProductsList() {
  const {
    fetchAllProducts,
    products,
    loading,
    page,
    setPage,
    limit,
    total,
    loadingProducts,
  } = useProduct();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  if (loadingProducts) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="text-center py-10 text-lg font-semibold">
          Loading...
        </div>
      ) : (
        <>
          <div className="relative mb-8 ">
            <img
              src={banner}
              alt="Shop Banner"
              className="
                w-full 
                rounded-lg 
                object-cover 

                h-40       /* mobile */
                sm:h-52    /* small tablets */
                md:h-64    /* normal tablets */
                lg:h-72    /* laptops */
                xl:h-80    /* desktops */
              "
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p, index) => (
              <div
                key={p._id}
                className="transform transition duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard product={p} />
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center items-center gap-4">
            <button
              className="px-4 py-2 border rounded hover:bg-orange-500 hover:text-white transition"
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
            >
              Prev
            </button>

            <span className="font-semibold">Page {page}</span>

            <button
              className="px-4 py-2 border rounded hover:bg-orange-500 hover:text-white transition"
              onClick={() => setPage(page + 1)}
              disabled={page * limit >= total}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
