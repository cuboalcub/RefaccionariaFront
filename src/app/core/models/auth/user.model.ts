import { UserRole } from "./enums/user-role.enum";

export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly role: UserRole
  ) {}
}
