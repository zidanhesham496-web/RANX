export type UserRole = "user" | "admin";

export interface Profile {
  id: string;
  name: string;
  phone_number: string;
  username: string;
  role: UserRole;
  created_at: string;
}