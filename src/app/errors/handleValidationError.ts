import mongoose from "mongoose";
import { IErrorSources, IGenericErrorResponse } from "../interface/error";

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errorSources: IErrorSources[] = Object.values(err.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  return {
    statusCode: 400,
    message: "Validation error",
    errorSources,
  };
};

export default handleValidationError;
