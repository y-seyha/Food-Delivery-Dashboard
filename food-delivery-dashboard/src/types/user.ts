export interface Address {
  street: string;
  city: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  profileImage: string;
  address: Address;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
}
