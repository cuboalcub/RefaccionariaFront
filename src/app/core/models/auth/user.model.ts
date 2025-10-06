export class User {
  constructor(
    public readonly id: string,
    public readonly idBranch: string,
    public readonly name: string,
    public readonly password: string,
    public readonly isSuperUser: boolean,
    public readonly isAdmin: boolean,
  ) {}
}
