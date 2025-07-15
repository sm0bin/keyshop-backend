export interface ICreateUser extends Document {
  email: string;
  name: string;
  password: string;
}

export interface IUser extends ICreateUser {
  id: string;
  photo: string;
  role: "superAdmin" | "admin" | "user";
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  status: "active" | "blocked";
  resetToken?: string | null;
  isDeleted: boolean;
}
