import mongoose from "mongoose";
import { IErrorSources, IGenericErrorResponse } from "../interface/error";

const handleCastError = (
  err: mongoose.Error.CastError
): IGenericErrorResponse => {
  const errorSources: IErrorSources[] = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode: 400,
    message: "Invalid data",
    errorSources,
  };
};

export default handleCastError;
