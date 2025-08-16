import { ZodError, ZodIssue } from "zod";
import { IErrorSources, IGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): IGenericErrorResponse => {
  const errorSources: IErrorSources[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: String(issue?.path[issue.path.length - 1]),
      message: issue.message,
    };
  });

  return {
    statusCode: 400,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodError;
