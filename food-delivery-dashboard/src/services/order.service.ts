import type { CreateOrderRequest, CreateOrderResponse } from "../types/api";
import type { Order, OrderStatus } from "../types/order";
import http from "./http";

const OrderService = {
  getAll: () => http.get<Order[]>("/orders"),
  create: (data: CreateOrderRequest) =>
    http.post<CreateOrderResponse>("/orders", data),

  delete: (id: string) => http.delete(`/orders/${id}`),

  update: (id: string, status: OrderStatus) =>
    http.put<Order>(`/orders/${id}`, { status }),
};

export default OrderService;
