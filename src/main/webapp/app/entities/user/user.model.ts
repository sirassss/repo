export interface IUser {
  id?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
}

export class User implements IUser {
  constructor(public id: number | null, public firstName?: string | null, public lastName?: string | null, public email?: string | null) {}
}

export function getUserIdentifier(user: IUser): number | null | undefined {
  return user.id;
}
