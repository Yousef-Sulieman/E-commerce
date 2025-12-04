// CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, accessToken, refresh } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // -------------------------------
  // Helper: Get headers config with valid token
  // -------------------------------
  const getConfig = async () => {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };

  const handleRequest = async (callback) => {
    try {
      return await callback();
    } catch (err) {
      if (err.response?.status === 401) {
        console.log("Token expired, refreshing...");
        // هنا axiosClient هيجرب refresh تلقائي
        try {
          return await callback(); // إعادة المحاولة بعد التحديث
        } catch (refreshError) {
          console.log("Login required after refresh failed");
          setCart([]); // مسح الكارت لو refresh فشل
          return;
        }
      } else {
        console.error(err.response?.data || err.message);
      }
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) return;

    await handleRequest(async () => {
      await axiosClient.post("/cart/add-cart", {
        userId: user._id,
        productId,
        quantity,
      });
      await fetchCart();
    });
  };

  // -------------------------------
  // Fetch Cart
  // -------------------------------
  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await handleRequest(async () => {
        const res = await axiosClient.get("/cart/get-cart", await getConfig());
        setCart(res.data.cart?.items || []);
      });
    } catch (err) {
      console.error("fetchCart error:", err.response || err);
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  // -------------------------------
  // Add to Cart
  // -------------------------------
  // const addToCart = async (productId, quantity = 1) => {
  //   if (!user) return;
  //   try {
  //     await handleRequest(async () => {
  //       await axiosClient.post(
  //         "/cart/add-cart",
  //         { userId: user._id, productId, quantity },
  //         await getConfig()
  //       );
  //       await fetchCart();
  //     });
  //   } catch (err) {
  //     console.error("addToCart error:", err.response || err);
  //   }
  // };

  // -------------------------------
  // Remove from Cart
  // -------------------------------
  const removeFromCart = async (cartItemId) => {
    if (!user) return;
    try {
      await handleRequest(async () => {
        await axiosClient.delete(
          `/cart/remove/${cartItemId}`,
          await getConfig()
        );
        await fetchCart();
      });
    } catch (err) {
      console.error(
        "Remove from Cart Failed:",
        err.response?.data || err.message
      );
    }
  };

  // -------------------------------
  // Clear Cart
  // -------------------------------
  const clearCart = async () => {
    if (!user) return;
    try {
      await handleRequest(async () => {
        await axiosClient.delete("/cart/clear-Cart", await getConfig());
        setCart([]);
      });
    } catch (err) {
      console.error("Clear Cart Failed:", err.response?.data || err.message);
    }
  };

  // -------------------------------
  // Update Cart Quantity
  // -------------------------------
  const updateQuantity = async (cartItemId, action) => {
    if (!user) return;
    try {
      await handleRequest(async () => {
        await axiosClient.patch(
          `/cart/update-quantity/${cartItemId}?action=${action}`,
          {},
          await getConfig()
        );
        await fetchCart();
      });
    } catch (err) {
      console.error(
        "Update Cart Quantity Failed:",
        err.response?.data || err.message
      );
    }
  };

  // -------------------------------
  // Fetch cart on user login
  // -------------------------------
  useEffect(() => {
    if (user) fetchCart();
    else setCart([]);
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        fetchCart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
