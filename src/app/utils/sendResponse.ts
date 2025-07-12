import { Response } from "express";

interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data?: T;
}

const sendResponse = <T>(
  res: Response,
  { success, statusCode, message, data }: IResponse<T>
) => {
  const responseData: IResponse<T> = {
    success,
    statusCode,
    message,
  };

  if (data) {
    responseData.data = data;
  }

  res.status(statusCode).json(responseData);
};

export default sendResponse;
