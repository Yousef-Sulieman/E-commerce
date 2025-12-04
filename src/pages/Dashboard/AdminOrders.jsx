import { useOrder } from "../../context/OrderContext";
import { useEffect, useState } from "react";

export default function AdminOrders() {
  const { fetchAllOrders, updateOrderStatus } = useOrder();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAllOrders().then((data) => setOrders(data));
  }, []);

  const handleUpdate = async (id, status) => {
    await updateOrderStatus(id, status);
    alert("Status updated!");
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">All Orders</h2>

      {orders?.map((order) => (
        <div key={order._id} className="p-6 bg-white shadow rounded mb-4">
          <p>Order ID: {order._id}</p>
          <p>User: {order.userId}</p>
          <p>Status: {order.status}</p>

          <select
            onChange={(e) => handleUpdate(order._id, e.target.value)}
            defaultValue={order.status}
            className="border p-2 rounded mt-2"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="on-delivery">On Delivery</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
}
