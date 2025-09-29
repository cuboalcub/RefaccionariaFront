import { UserRole } from "./enums/user-role.enum";

export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    name: string;
    role: UserRole;
  };
}