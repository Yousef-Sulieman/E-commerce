// -----------------------------------------
// UserOrders.jsx
// -----------------------------------------
import { useOrder } from "../../context/OrderContext";

export default function UserOrders() {
  const { orders, loading } = useOrder();

  if (loading) return <p>Loading...</p>;
  if (!orders.length) return <p>No orders yet.</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="p-4 bg-white shadow rounded mb-4">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total:</strong> {order.total} EGP
          </p>
        </div>
      ))}
    </div>
  );
}
