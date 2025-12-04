import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useWishlist } from "../../context/WishlistContext";
import { useProductModal } from "../../context/ProductModalContext";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { openModal } = useProductModal();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const { user } = useAuth();

  const [qty, setQty] = useState(1);

  const increase = () => setQty((q) => q + 1);
  const decrease = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const handleAdd = async () => {
    if (!user) return alert("Please login first");

    await addToCart(product._id, qty);
    alert(`${product.Name} added to cart!`);
  };

  const handleWishlist = async () => {
    if (!user) return alert("Please login first");

    await addToWishlist(product._id);
    alert(`${product.Name} added to wishlist!`);
  };

  return (
    <div className="border-gray-200 border rounded py-5 px-5 flex flex-col gap-3">
      {/* CLICK TO OPEN MODAL */}
      <div onClick={() => openModal(product)} className="cursor-pointer">
        <img
          src={product.Image?.url}
          alt={product.Name}
          className="w-full h-40 object-cover rounded "
        />

        <h3 className="text-sm font-medium text-gray-900 my-4 line-clamp-2 min-h-[40px]">
          {product.Name}
        </h3>

        <p className="uppercase font-[500] text-[15px] text-[#00B853]">
          Available: {product.quantity}
        </p>

        <div className="flex items-center mb-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={star <= product.review ? "#fbbf24" : "#d1d5db"}
                className="w-4 h-4"
              >
                <path d="M12 .587l3.668 7.568L24 9.748l-6 5.848L19.335 24 12 19.897 4.665 24 6 15.596 0 9.748l8.332-1.593z" />
              </svg>
            ))}
          </div>

          <span className="text-xs text-gray-500 ml-1">({product.review})</span>
        </div>
        <div className="text-lg font-bold text-[#D51243]">${product.Price}</div>
      </div>

      {/* Quantity Counter */}
      <div className="flex items-center justify-center gap-3 mt-2">
        <button
          onClick={decrease}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-l-lg cursor-pointer disabled:opacity-50"
        >
          -
        </button>
        <span className="bg-white px-4 py-1 text-gray-800 ">{qty}</span>
        <button
          onClick={increase}
          className="bg-amber-400 hover:bg-amber-500 text-gray-800 px-3 py-1 rounded-r-lg cursor-pointer"
        >
          +
        </button>
      </div>

      {/* Wishlist */}
      {/* <button
        onClick={handleWishlist}
        className="text-red-500 hover:text-red-700 mt-1"
      >
         Add to Wishlist
      </button> */}

      {/* Add to Cart */}
      <button
        onClick={handleAdd}
        disabled={qty > product.quantity}
        className="mt-3 bg-primary text-white py-2 rounded hover:bg-teal-600 disabled:opacity-50"
      >
        Add To Cart
      </button>
    </div>
  );
}
