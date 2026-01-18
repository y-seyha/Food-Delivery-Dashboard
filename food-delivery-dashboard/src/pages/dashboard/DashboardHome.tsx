import { useEffect, useState } from "react";
import type { Food } from "../../types/food";
import type { Order } from "../../types/order";
import type { User } from "../../types/user";

import Loader from "../../components/common/Loader";
import StatCard from "../../components/common/StatCard";
import FoodsTable from "../../components/foods/Foods.Table";
import OrdersTable from "../../components/orders/OrdersTable";
import UsersTable from "../../components/users/UsersTable";

import FoodService from "../../services/food.service";
import OrderService from "../../services/order.service";
import UserService from "../../services/user.service";

import { getLatest } from "../../utils/helper";

const DashboardPage = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={60} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Foods" value={foods.length} />
        <StatCard title="Total Orders" value={orders.length} />
        <StatCard title="Total Users" value={users.length} />
      </div>

      {/* Tables */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Foods</h2>
        <FoodsTable foods={getLatest(foods, (f) => f.createdAt)} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Orders</h2>
        <OrdersTable orders={getLatest(orders, (o) => o.createdAt)} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <UsersTable users={getLatest(users, (u) => u.createdAt)} />
      </section>
    </div>
  );
};

export default DashboardPage;
