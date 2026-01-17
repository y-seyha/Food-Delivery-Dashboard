import http from "./http";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from "../types/auth";

const AuthService = {
  login: (data: LoginRequest) => http.post<AuthResponse>("/auth/login", data),
  register: (data: RegisterRequest) =>
    http.post<AuthResponse>("/auth/register", data),
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

export default AuthService;
