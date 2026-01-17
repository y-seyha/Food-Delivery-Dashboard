import type { Cart } from "./cart";
import type { ApiResponse } from "./common";
import type { Food } from "./food";
import type { Order } from "./order";
import type { User } from "./user";

export type GetFoodsResponse = ApiResponse<Food[]>;
export type GetFoodResponse = ApiResponse<Food>;

export type GetProfileResponse = ApiResponse<User>;

//Update profile req
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
  profileImage?: string;
  phone?: string;
  address?: {
    street?: string;
    city?: string;
  };
}

export type GetCartResponse = ApiResponse<Cart>;

export type UpdateCartResponse = ApiResponse<Cart>;

export type GetOrderResponse = ApiResponse<Order[]>;

export type CreateOrderRequest = {
  items: { foodId: string; quantity: number }[];
  address: string;
};

export type CreateOrderResponse = ApiResponse<Order>;
