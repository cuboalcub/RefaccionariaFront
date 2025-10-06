import { LoginResponse } from "../login-response.model";
import { UserRole } from "../enums/user-role.enum";
import { User } from "../user.model";

export class UserMapper {
  static mapFromApi(res: any): LoginResponse {
    return {
      accessToken: res.access,
      refreshToken: res.refresh,
      user: {
        id: String(res.user.id),
        isAdmin: res.user.isadmin,
        isStaff: res.user.isstaff,
      }
    };
  }

  static mapToRole(user: User): UserRole {
    if (user.isSuperUser) return UserRole.Admin;
    if (user.isAdmin) return UserRole.Manager;
    return UserRole.Seller;
  }
}