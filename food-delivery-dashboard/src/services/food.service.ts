import type { GetFoodResponse, GetFoodsResponse } from "../types/api";
import http from "./http";

const FoodService = {
  getAll: () => http.get<GetFoodsResponse>("/foods"),
  getById: (id: string) => http.get<GetFoodResponse>(`/foods/${id}`),
};

export default FoodService;
