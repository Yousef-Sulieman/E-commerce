// -----------------------------------------
// OrderContext.jsx (Improved)
// -----------------------------------------
import { createContext, useContext, useState, useEffect } from "react";
import axiosClient from "../utils/axiosClient";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext"; // ⬅️ ربط الـ Cart

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user, accessToken } = useAuth();
  const { cartItems, clearCart } = useCart();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const getConfig = () => ({
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  // ----------------------------------------
  // 1) Create Order
  // ----------------------------------------
  const createOrder = async (orderData) => {
    if (!user?._id || !accessToken) return console.log("User not logged in!");
    if (!cartItems?.length) return console.log("Cart is empty!");

    try {
      const res = await axiosClient.post(
        "/order/create-order",
        {
          userId: user._id,
          items: cartItems,
          ...orderData,
        },
        getConfig()
      );

      clearCart();
      fetchUserOrders();

      return res.data;
    } catch (err) {
      console.error("createOrder error:", err.response?.data || err);
      throw err;
    }
  };

  // ----------------------------------------
  // 2) Fetch Orders For User
  // ----------------------------------------
  const fetchUserOrders = async () => {
    if (!user?._id || !accessToken) {
      setOrders([]); // تأكد من فراغ القائمة لو مفيش user أو token
      return;
    }

    setLoading(true);
    try {
      const { data } = await axiosClient.get(
        `/order/get-user-orders/${user._id}`,
        getConfig()
      );
      setOrders(Array.isArray(data?.orders) ? data.orders : []); // لو مفيش أوردرز، مصفوفة فاضية
    } catch (err) {
      if (err.response?.status === 404) {
        setOrders([]); // No orders found → list remains empty
      } else {
        console.error("Fetch orders error:", err.response?.data || err);
      }
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------
  // 3) Admin: fetch all orders
  // ----------------------------------------
  const fetchAllOrders = async () => {
    try {
      const res = await axiosClient.get("/order/get-order", getConfig());
      return Array.isArray(res.data?.orders) ? res.data.orders : [];
    } catch (err) {
      console.error("fetchAllOrders error:", err);
      return [];
    }
  };

  // ----------------------------------------
  // 4) Admin: update order status
  // ----------------------------------------
  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await axiosClient.put(
        `/order/${orderId}/status`,
        { status },
        getConfig()
      );
      fetchUserOrders();
      return res.data;
    } catch (err) {
      console.error("updateOrderStatus error:", err);
    }
  };

  // ----------------------------------------
  // Fetch orders بعد ما الـ user يتحمل
  // ----------------------------------------
  useEffect(() => {
    if (user?._id && accessToken) fetchUserOrders();
    else setOrders([]); // لو مفيش user، خلي الأوردرز فاضية
  }, [user, accessToken]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        createOrder,
        fetchUserOrders,
        fetchAllOrders,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
