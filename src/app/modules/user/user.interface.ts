export interface IUser {
  uId: string;
  email: string;
  password: string;
  name: string;
  photo: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  role: "superAdmin" | "admin" | "user";
  status: "active" | "blocked";
  isDeleted: boolean;
}
