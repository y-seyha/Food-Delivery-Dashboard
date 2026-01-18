import type { Order } from "../../types/order";

interface Props {
  orders: Order[];
  onDelete: (id: string) => void;
  onStatusChange: (
    id: string,
    status: "pending" | "delivered" | "canceled",
  ) => void;
}

const OrdersTable = ({ orders, onDelete, onStatusChange }: Props) => {
  return (
    <table className="w-full table-auto border-collapse">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 border">Order ID</th>
          <th className="px-4 py-2 border">Customer</th>
          <th className="px-4 py-2 border">Total Items</th>
          <th className="px-4 py-2 border">Status</th>
          <th className="px-4 py-2 border">Address</th>
          <th className="px-4 py-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="hover:bg-gray-50">
            <td className="px-4 py-2 border">{order._id}</td>

            {/* Customer name */}
            <td className="px-4 py-2 border">
              {typeof order.user === "string"
                ? order.user
                : order.user?.name || "Unknown"}
            </td>

            {/* Items count */}
            <td className="px-4 py-2 border">{order.items?.length || 0}</td>

            {/* Status select */}
            <td className="px-4 py-2 border">
              <select
                value={order.status}
                onChange={(e) =>
                  onStatusChange(
                    order._id,
                    e.target.value as "pending" | "delivered" | "canceled",
                  )
                }
                className="border px-2 py-1 rounded"
              >
                <option value="pending">Pending</option>
                <option value="delivered">Delivered</option>
                <option value="canceled">Canceled</option>
              </select>
            </td>

            <td className="px-4 py-2 border">{order.address || "-"}</td>

            <td className="px-4 py-2 border space-x-2">
              <button
                onClick={() => onDelete(order._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}

        {orders.length === 0 && (
          <tr>
            <td colSpan={6} className="text-center py-4 text-gray-500">
              No orders found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrdersTable;
