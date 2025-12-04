// WishlistContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user, accessToken } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // Fetch wishlist
  // -------------------------------
  const fetchWishlist = async () => {
    if (!user?._id || !accessToken) {
      setWishlist([]); // لو مفيش user أو token
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosClient.get(
        `/wishlist/get-favorite/${user._id}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setWishlist(Array.isArray(data?.favorites) ? data.favorites : []);
    } catch (err) {
      if (err.response?.status === 404) {
        setWishlist([]); // لو مفيش بيانات → خلي القائمة فاضية
      } else {
        console.error(
          "Fetch wishlist error:",
          err.response?.data || err.message
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Add product to wishlist
  // -------------------------------
  const addToWishlist = async (productId) => {
    if (!user?._id || !accessToken) {
      alert("Please login first");
      return;
    }

    try {
      const body = { userId: user._id, productId };
      const { data } = await axiosClient.post("/wishlist/add-favorite", body, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log("Wishlist added:", data);
      fetchWishlist(); // تحديث الstate بعد الإضافة
      return data;
    } catch (err) {
      console.error(
        "Add to wishlist error:",
        err.response?.data || err.message
      );
      alert("Failed to add product to wishlist. Try again.");
    }
  };

  // -------------------------------
  // Clear wishlist
  // -------------------------------
  const clearWishlist = async () => {
    if (!user?._id || !accessToken) return;
    try {
      await axiosClient.delete(`/wishlist/delete-favorite/${user._id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setWishlist([]);
    } catch (err) {
      console.error("Clear wishlist error:", err.response?.data || err.message);
    }
  };

  // -------------------------------
  // Auto fetch on login
  // -------------------------------
  useEffect(() => {
    if (user && accessToken) fetchWishlist();
    else setWishlist([]);
  }, [user, accessToken]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        fetchWishlist,
        addToWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
