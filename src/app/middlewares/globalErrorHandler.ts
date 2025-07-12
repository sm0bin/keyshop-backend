import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import config from "../config";
import { IErrorSources } from "../interface/error";
import AppError from "../errors/AppError";
import handleZodError from "../errors/handleZodError";
import handleDuplicateError from "../errors/handleDuplicateError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";

const handleError = (err: any, handler: Function) => {
  const { statusCode, message, errorSources } = handler(err);

  return { statusCode, message, errorSources };
};

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal server error";

  let errorSources: IErrorSources[] = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  if (err instanceof ZodError) {
    ({ statusCode, message, errorSources } = handleError(err, handleZodError));
  } else if (err.name === "ValidationError") {
    ({ statusCode, message, errorSources } = handleError(
      err,
      handleValidationError
    ));
  } else if (err.name === "CastError") {
    ({ statusCode, message, errorSources } = handleError(err, handleCastError));
  } else if (err.code === 11000) {
    ({ statusCode, message, errorSources } = handleError(
      err,
      handleDuplicateError
    ));
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }

  return res.status(statusCode).json({
    status: false,
    statusCode,
    message,
    errorSources,
    stack: config.nodeEnv === "development" ? err.stack : undefined,
  });
};

export default globalErrorHandler;
