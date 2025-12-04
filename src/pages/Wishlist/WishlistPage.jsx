import { useWishlist } from "../../context/WishlistContext";
import { useEffect } from "react";

const WishlistPage = () => {
  const { wishlist, fetchWishlist, clearWishlist } = useWishlist();

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Your Wishlist </h1>

      <button
        onClick={clearWishlist}
        className="bg-red-600 text-white px-3 py-2 rounded mb-4"
      >
        Clear All
      </button>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {wishlist?.map((item) => {
          const product = item.product;
          if (!product) return null;

          return (
            <div key={item._id} className="border p-3 rounded shadow">
              <img
                src={product.Image?.url}
                className="h-40 w-full object-cover"
              />
              <h3 className="mt-2 font-semibold">{product.Name}</h3>
              <p className="text-gray-600">{product.Price} EGP</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPage;
