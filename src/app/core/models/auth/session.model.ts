import { LoginResponse } from './login-response.model';

export class Session {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string | null,
    public readonly userId: string,
    public readonly isAdmin: boolean,
    public readonly isStaff: boolean
  ) {}

  hasRole(role: 'admin' | 'staff'): boolean {
    if (role === 'admin') return this.isAdmin;
    if (role === 'staff') return this.isStaff;
    return false;
  }
}
