import { useEffect, useState } from "react";
import type { Food } from "../../types/food";
import type { Order, OrderStatus } from "../../types/order";
import type { User } from "../../types/user";

import { Utensils, ShoppingCart, Users } from "lucide-react";

import Loader from "../../components/common/Loader";
import StatCard from "../../components/common/StatCard";
import FoodsTable from "../../components/foods/Foods.Table";
import OrdersTable from "../../components/orders/OrdersTable";
import UsersTable from "../../components/users/UsersTable";
import UserForm from "../../components/users/UserForm"; // <-- import form

import FoodService from "../../services/food.service";
import OrderService from "../../services/order.service";
import UserService from "../../services/user.service";

import { getLatest } from "../../utils/helper";

const DashboardPage = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Edit User Modal State ---
  const [editingUser, setEditingUser] = useState<User | undefined>();

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [foodsRes, ordersRes, usersRes] = await Promise.all([
          FoodService.getAll(),
          OrderService.getAll(),
          UserService.getAll(),
        ]);

        setFoods(foodsRes.data ?? []);
        setOrders(ordersRes.data ?? []);
        setUsers(usersRes.data.users ?? []);
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
        setFoods([]);
        setOrders([]);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // --- Orders Handlers ---
  const handleOrderStatusChange = async (_id: string, status: string) => {
    const newStatus = status as OrderStatus;
    try {
      await OrderService.update(_id, newStatus);

      setOrders((prev) =>
        prev.map((o) => (_id === o._id ? { ...o, status: newStatus } : o)),
      );
    } catch (err) {
      console.error("Failed to update order status", err);
      alert("Failed to update order status");
    }
  };

  const handleOrderDelete = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await OrderService.delete(_id);
      setOrders((prev) => prev.filter((o) => o._id !== _id));
    } catch (err) {
      console.error("Failed to delete order", err);
      alert("Failed to delete order");
    }
  };

  // --- Users Handlers ---
  const handleUserDelete = async (_id?: string) => {
    if (!_id) return;
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await UserService.delete(_id);
      setUsers((prev) => prev.filter((u) => u._id !== _id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  const handleUserUpdate = async (data: Partial<User>) => {
    if (!editingUser?._id) return;
    try {
      await UserService.update(editingUser._id, data);
      setUsers((prev) =>
        prev.map((u) => (u._id === editingUser._id ? { ...u, ...data } : u)),
      );
      setEditingUser(undefined); // close modal
    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={60} />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Foods"
          value={foods.length}
          icon={<Utensils />}
          color="text-yellow-500"
        />
        <StatCard
          title="Total Orders"
          value={orders.length}
          icon={<ShoppingCart />}
          color="text-green-500"
        />
        <StatCard
          title="Total Users"
          value={users.length}
          icon={<Users />}
          color="text-blue-500"
        />
      </div>

      {/* Foods Table */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Latest Foods</h2>
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <FoodsTable foods={getLatest(foods, (f) => f.createdAt)} />
        </div>
      </section>

      {/* Orders Table */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Latest Orders</h2>
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <OrdersTable
            orders={getLatest(orders, (o) => o.createdAt)}
            onStatusChange={handleOrderStatusChange}
            onDelete={handleOrderDelete}
          />
        </div>
      </section>

      {/* Users Table */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Latest Users</h2>

        {/* User Edit Modal */}
        {editingUser && (
          <UserForm
            user={editingUser}
            onSubmit={handleUserUpdate}
            onClose={() => setEditingUser(undefined)}
          />
        )}

        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <UsersTable
            users={getLatest(users, (u) => u.createdAt)}
            onDelete={handleUserDelete}
            onUpdate={(user) => setEditingUser(user)} // <-- open modal
          />
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
