import type {
  CreateOrderRequest,
  CreateOrderResponse,
  GetOrderResponse,
} from "../types/api";
import http from "./http";

const OrderService = {
  getAll: () => http.get<GetOrderResponse>("/orders"),
  create: (data: CreateOrderRequest) =>
    http.post<CreateOrderResponse>("/orders", data),
};

export default OrderService;
