export interface ICreateUser extends Document {
  email: string;
  name: string;
  password: string;
}

export interface IUser extends ICreateUser {
  uId: string;
  photo: string;
  role: "superAdmin" | "admin" | "user";
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  status: "active" | "blocked";
  isDeleted: boolean;
}
