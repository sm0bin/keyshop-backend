export interface IUserLogin {
  email: string;
  password: string;
}

export interface IChangePassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface IResetPassword {
  token: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IRefreshToken {
  refreshToken: string;
}
