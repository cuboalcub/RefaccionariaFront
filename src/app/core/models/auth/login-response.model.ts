export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: {
    id: string;
    isAdmin: boolean;
    isStaff: boolean;
  };
}