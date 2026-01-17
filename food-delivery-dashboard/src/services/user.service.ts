import http from "./http";
import type { UpdateProfileRequest, GetProfileResponse } from "../types/api";

const UserService = {
  getProfile: () => http.get<GetProfileResponse>("/users/profile"),
  updateProfile: (data: UpdateProfileRequest) =>
    http.post<GetProfileResponse>("/users/profile", data),
};
export default UserService;
