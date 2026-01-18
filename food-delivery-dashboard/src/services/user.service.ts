import http from "./http";
import type {
  UpdateProfileRequest,
  GetProfileResponse,
  GetUsersResponse,
} from "../types/api";

const UserService = {
  getProfile: () => http.get<GetProfileResponse>("/users/profile"),
  updateProfile: (data: UpdateProfileRequest) =>
    http.post<GetProfileResponse>("/users/profile", data),

  // New: fetch all users
  getAll: () => http.get<GetUsersResponse>("/users"),
};

export default UserService;
