import { useState, useMemo } from "react";
import { useOrders } from "../../hooks/useOrders";
import Loader from "../../components/common/Loader";
import OrdersTable from "../../components/orders/OrdersTable";
import OrderService from "../../services/order.service";

const OrdersPage = () => {
  const { orders, loading, error, refetch } = useOrders();
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    if (!search) return orders;

    return orders.filter((o) => {
      const userName = typeof o.user === "string" ? o.user : o.user?.name || ""; // safe fallback
      return (
        userName.toLowerCase().includes(search.toLowerCase()) ||
        o.status.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [orders, search]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await OrderService.delete(id); // use your real delete API
      refetch();
    } catch (err) {
      console.error(err);
      alert("Failed to delete order");
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await OrderService.update(id, status);
      refetch();
    } catch (err) {
      console.error(err);
      alert("Failed to update order status");
    }
  };

  return (
    <div className="space-y-6 p-6">
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <Loader size={60} />
        </div>
      ) : error ? (
        <p className="text-red-500 text-center mt-6">{error}</p>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold">Orders</h1>
          </div>

          <div className="flex justify-end">
            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border rounded px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="overflow-x-auto bg-white shadow rounded-lg">
            <OrdersTable
              orders={filteredOrders}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;
