import React, { useState } from "react";
import { useProductModal } from "../../context/ProductModalContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useProduct } from "../../context/ProductContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function ProductDetailsModal() {
  const { isOpen, selectedProduct, openModal, closeModal } = useProductModal();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { products } = useProduct();

  const [qty, setQty] = useState(1);

  if (!isOpen || !selectedProduct) return null;

  const increase = () => setQty((q) => q + 1);
  const decrease = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    addToCart(selectedProduct._id, qty);
  };

  // -------- Related Products -------
  const relatedProducts = products.filter(
    (p) =>
      p.categoryId?._id === selectedProduct.categoryId?._id &&
      p._id !== selectedProduct._id
  );

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999] px-2"
      onClick={closeModal}
    >
      <div
        className="
        bg-white rounded-xl p-4 sm:p-6 
        w-full max-w-4xl 
        max-h-[95vh] overflow-y-auto 
        relative
      "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute right-3 top-3 text-2xl font-semibold"
        >
          ✕
        </button>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* LEFT IMAGE */}
          <div className="flex flex-col items-center">
            <img
              src={selectedProduct.Image?.url}
              className="
              w-full 
              h-56 sm:h-64 md:h-72 
              object-cover rounded-lg mb-3
            "
            />
          </div>

          {/* RIGHT INFO */}
          <div className="px-1 sm:px-3">
            <h2 className="text-xl sm:text-2xl font-bold">
              {selectedProduct.Name}
            </h2>

            <p className="text-lg sm:text-xl text-primary font-semibold mt-2">
              ${selectedProduct.Price}
            </p>

            {/* Quantity */}
            <div
              className="
              flex items-center justify-between 
              border rounded-lg px-4 py-2 
              w-full max-w-xs 
              mt-4
            "
            >
              <button onClick={decrease} className="text-xl">
                -
              </button>
              <span className="text-lg font-medium">{qty}</span>
              <button onClick={increase} className="text-xl">
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-primary text-white py-3 rounded-lg mt-4 sm:mt-5 font-medium"
            >
              Add to Cart
            </button>

            <button
              onClick={() => addToWishlist(selectedProduct._id)}
              className="w-full border py-3 rounded-lg mt-3 font-medium"
            >
              ❤️ Wishlist
            </button>

            <p className="text-gray-600 mt-4 text-sm sm:text-base leading-6">
              {selectedProduct.description || "No description available."}
            </p>
          </div>
        </div>

        {/* -------- RELATED PRODUCTS -------- */}
        {relatedProducts.length > 0 && (
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4">Related Products</h3>

            <Swiper
              slidesPerView={2.2}
              spaceBetween={12}
              breakpoints={{
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
            >
              {relatedProducts.map((p) => (
                <SwiperSlide key={p._id}>
                  <div
                    onClick={() => openModal(p)}
                    className="
                    border border-gray-200 rounded-lg p-3 
                    cursor-pointer 
                    hover:shadow-md hover:scale-95 
                    transition-all bg-white
                  "
                  >
                    <img
                      src={p.Image?.url}
                      className="w-full h-32 sm:h-40 object-cover rounded-lg"
                    />
                    <p className="font-medium mt-2 text-sm sm:text-base">
                      {p.Name}
                    </p>
                    <p className="text-primary font-bold text-sm sm:text-base">
                      ${p.Price}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </div>
  );
}
