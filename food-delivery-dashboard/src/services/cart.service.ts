import type { GetCartResponse, UpdateCartResponse } from "../types/api";
import http from "./http";

const CartService = {
  get: () => http.get<GetCartResponse>("/cart"),
  update: (items: { foodId: string; quantity: number }[]) =>
    http.put<UpdateCartResponse>("/cart", { items }),
  clear: () => http.delete("/cart"),
};

export default CartService;
