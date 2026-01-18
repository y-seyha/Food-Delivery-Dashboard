import type { CreateOrderRequest, CreateOrderResponse } from "../types/api";
import type { Order } from "../types/order";
import http from "./http";

const OrderService = {
  getAll: () => http.get<Order[]>("/orders"), // directly array
  create: (data: CreateOrderRequest) =>
    http.post<CreateOrderResponse>("/orders", data),
};

export default OrderService;
