import http from "./http";
import type { UpdateProfileRequest, GetProfileResponse } from "../types/api";
import type { User } from "../types/user";

const UserService = {
  getProfile: () => http.get<GetProfileResponse>("/users/profile"),
  updateProfile: (data: UpdateProfileRequest) =>
    http.post<GetProfileResponse>("/users/profile", data),

  // New: fetch all users
  getAll: () => http.get<{ data: User[] }>("/users"),
};

export default UserService;
