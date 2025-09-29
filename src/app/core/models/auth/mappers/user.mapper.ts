import { LoginResponse } from "../login-response.model";
import { User } from "../user.model";

export class UserMapper {
  static fromLoginResponse(res: LoginResponse): User {
    return new User(res.user.id, res.user.name, res.user.role);
  }
}