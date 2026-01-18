import type { CreateOrderRequest, CreateOrderResponse } from "../types/api";
import type { Order } from "../types/order";
import http from "./http";

const OrderService = {
  getAll: () => http.get<Order[]>("/orders"),
  create: (data: CreateOrderRequest) =>
    http.post<CreateOrderResponse>("/orders", data),

  // Add these two
  delete: (id: string) => http.delete(`/orders/${id}`),
  update: (id: string, status: string) =>
    http.put<Order>(`/orders/${id}`, { status }),
};

export default OrderService;
