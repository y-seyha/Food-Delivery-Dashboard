import http from "./http";
import type {
  UpdateProfileRequest,
  GetProfileResponse,
  GetUsersResponse,
} from "../types/api";
import type { User } from "../types/user";

const UserService = {
  getProfile: () => http.get<GetProfileResponse>("/users/profile"),
  updateProfile: (data: UpdateProfileRequest) =>
    http.post<GetProfileResponse>("/users/profile", data),

  // Admin-only routes
  getAll: () => http.get<GetUsersResponse>("/users"),
  update: (id: string, data: Partial<User>) => http.put(`/users/${id}`, data),
  delete: (id: string) => http.delete(`/users/${id}`),
};

export default UserService;
