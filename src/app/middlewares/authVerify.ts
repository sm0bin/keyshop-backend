// middlewares/authVerify.ts
import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errors/AppError";
import config from "../config";
import { IUser, TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const authVerify = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Authorization header is missing"
      );
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token format");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Token is missing");
    }

    const decoded = (await jwt.verify(
      token,
      config.jwtSecret as string
    )) as JwtPayload;

    const { id, role } = decoded;

    const user = await User.findOne({ id });

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    if (requiredRoles && !requiredRoles.includes(user.role)) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "You have no access to this route"
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default authVerify;
