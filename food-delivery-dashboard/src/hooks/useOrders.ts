// src/hooks/useOrders.ts
import { useState, useEffect } from "react";
import type { Order } from "../types/order";
import OrderService from "../services/order.service";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await OrderService.getAll();
        setOrders(res.data.data); // data: Order[]
      } catch {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error, setOrders };
}
