// -----------------------------------------
// CheckoutPage.jsx
// -----------------------------------------
import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import axiosClient from "../../utils/axiosClient";

export default function CheckoutPage() {
  const { cart: cartItems = [], clearCart } = useCart();
  const { createOrder, orders, fetchUserOrders, loading } = useOrder();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  const { accessToken } = JSON.parse(localStorage.getItem("authData")) || {};

  // -------------------------------
  // 1) Place Order & start Stripe Checkout
  // -------------------------------
  const handlePlaceOrder = async () => {
    if (!cartItems || cartItems.length === 0) return alert("Cart is empty");

    setCheckoutLoading(true);
    setError(null);

    try {
      // إنشاء الطلب أولًا
      const newOrder = await createOrder({
        Contact: "+201234567890",
        Delivery: "Home Delivery",
        FirstName: "Omar",
        LastName: "Elhelaly",
        Address: "123 Main Street",
        Apartment: "Apt 4",
        PostCode: "12345",
        City: "Cairo",
        paymentMethod: "Card",
      });

      // بدء Stripe Checkout
      await startStripeCheckout(newOrder._id);
    } catch (err) {
      console.error(err);
      setError("Failed to place order");
    } finally {
      setCheckoutLoading(false);
    }
  };

  // -------------------------------
  // 2) Start Stripe Checkout (POST checkout request)
  // -------------------------------
  const startStripeCheckout = async (orderId) => {
    try {
      const res = await axiosClient.post(
        `/payment/checkout/${orderId}`,
        {},
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      // redirect user to Stripe Checkout
      window.location.href = res.data.url; // assuming backend returns checkout URL
      setSessionId(res.data.sessionId); // optional: track session
    } catch (err) {
      console.error("Stripe checkout error:", err);
      setError("Failed to start payment");
    }
  };

  // -------------------------------
  // 3) Check Payment Status (GET)
  // -------------------------------
  const checkPaymentStatus = async (sessionId) => {
    try {
      const res = await axiosClient.get(`/payment/status`, {
        params: { session_id: sessionId },
      });

      if (res.data.status === "paid") {
        alert("Payment successful!");
        clearCart();
        fetchUserOrders();
      } else if (res.data.status === "pending") {
        alert("Payment is pending. Please wait.");
      } else {
        alert("Payment not found");
      }
    } catch (err) {
      console.error("Check payment status error:", err);
      setError("Failed to check payment status");
    }
  };

  // -------------------------------
  // Optional: Polling for payment status
  // -------------------------------
  useEffect(() => {
    if (sessionId) {
      const interval = setInterval(() => {
        checkPaymentStatus(sessionId);
      }, 5000); // كل 5 ثواني

      return () => clearInterval(interval);
    }
  }, [sessionId]);

  // -------------------------------
  // Render
  // -------------------------------
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* LEFT FORM AREA */}
      <div className="lg:col-span-2 space-y-8">
        {/* CONTACT */}
        <div className=" p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Contact</h2>

          <input
            type="text"
            placeholder="Email or mobile phone number"
            className="w-full border rounded-md px-3 py-2"
          />
          <label className="flex items-center gap-2 mt-3 text-sm">
            <input type="checkbox" />
            Email me with news and offers
          </label>
        </div>

        {/* DELIVERY */}
        <div className=" p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold">Delivery</h2>

          <select className="w-full border px-3 py-2 rounded-md">
            <option>United States</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border px-3 py-2 rounded-md"
              placeholder="First name (optional)"
            />
            <input
              className="border px-3 py-2 rounded-md"
              placeholder="Last name"
            />
          </div>

          <input
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Address"
          />

          <input
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Apartment, suite, etc. (optional)"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              className="border px-3 py-2 rounded-md"
              placeholder="Postal code"
            />
            <input className="border px-3 py-2 rounded-md" placeholder="City" />
          </div>

          <label className="flex items-center gap-2 mt-3 text-sm">
            <input type="checkbox" />
            Save this information for next time
          </label>
        </div>

        {/* SHIPPING METHOD */}
        <div className=" p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold">Shipping method</h2>

          <div className="flex items-center justify-between border px-4 py-3 rounded-md">
            <p>Standard</p>
            <p className="font-semibold">FREE</p>
          </div>
        </div>

        {/* PAYMENT */}
        <div className=" p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-semibold">Payment</h2>
          <p className="text-sm text-gray-500">
            All transactions are secure and encrypted.
          </p>

          <div className="border rounded-md p-6 flex items-center justify-center text-gray-400">
            <p>Payment Method (Stripe will open after submitting)</p>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={checkoutLoading}
            className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-900 transition disabled:bg-gray-400 cursor-pointer"
          >
            {checkoutLoading ? "Processing..." : "Pay now"}
          </button>
        </div>
      </div>

      {/* RIGHT SUMMARY */}
      <div className=" p-6 rounded-lg h-fit space-y-6">
        {/* ITEMS */}
        <div className="space-y-4">
          {cartItems?.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <img
                src={item.Image.url}
                className="w-14 h-14 rounded-md object-cover"
              />

              <div className="flex-1">
                <p className="font-medium">{item.name}</p>
                {/* <p className="text-gray-500 text-sm">
                  {item.quantity} × ${item.price}
                </p> */}
              </div>

              <p className="font-semibold">
                ${(item.quantity * item.price).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* SUMMARY TOTALS */}
        <div className="border-t border-gray-400 pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal · {cartItems?.length} Items</span>
            <span>
              $
              {cartItems
                ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span className="font-semibold">FREE</span>
          </div>

          <div className="flex justify-between text-lg font-bold pt-2">
            <span>Total</span>
            <span>
              USD $
              {cartItems
                ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
                .toFixed(2)}
            </span>
          </div>

          <p className="text-xs text-gray-500">
            Including taxes will be calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
}
