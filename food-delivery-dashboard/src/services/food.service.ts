import type { GetFoodResponse } from "../types/api";
import http from "./http";

const FoodService = {
  getAll: () => http.get<GetFoodResponse>("/foods"),
  getById: (id: string) => http.get<GetFoodResponse>(`/foods/${id}`),
};

export default FoodService;
