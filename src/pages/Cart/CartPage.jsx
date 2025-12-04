import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cart.length === 0 && <div>Your cart is empty.</div>}

      {cart.length > 0 &&
        cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-5 border-b border-teal-200 py-4"
          >
            <img
              src={item.Image?.url}
              className="w-16 h-16 rounded object-cover"
            />

            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-gray-500 text-sm">${item.price}</p>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, "decrease")}
                className="border px-3 py-1 rounded"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => updateQuantity(item.id, "increase")}
                className="border px-3 py-1 rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 font-medium cursor-pointer"
            >
              <RiDeleteBin6Line className="w-5 h-5" />
            </button>
          </div>
        ))}

      {cart.length > 0 && (
        <div className="mt-5 text-right text-xl font-bold">
          Subtotal: ${subtotal.toFixed(2)}
        </div>
      )}
      <button
        onClick={() => navigate("/checkout")}
        className="bg-primary text-white px-4 py-2 rounded cursor-pointer"
      >
        Proceed To Checkout
      </button>
    </div>
  );
}
