export interface IUser {
  name: string;
  lastName: string;
  email: string;
  id: number;
  role: UserRole;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  STANDARD = 'STANDARD',
}
