import { UserRole } from './enums/user-role.enum';
import { User } from './user.model';

export class Session {
  constructor(public user: User, public accessToken: string, public refreshToken?: string) {}

  toJSON(): any {
    return {
      user: { ...this.user },
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    };
  }

  static fromJSON(json: any): Session {
    return new Session(
      new User(json.user.id, json.user.name, json.user.role),
      json.accessToken,
      json.refreshToken
    );
  }

  isSeller(): boolean {
    return this.user.role === UserRole.Seller;
  }

  isAdmin(): boolean {
    return this.user.role === UserRole.Admin;
  }

  isManager(): boolean {
    return this.user.role === UserRole.Manager;
  }
}
