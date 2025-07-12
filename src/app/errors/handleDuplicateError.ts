import { IErrorSources, IGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: any): IGenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);
  const extractedMatch = match && match[1];
  const errorSources: IErrorSources[] = [
    {
      path: "",
      message: `${extractedMatch} already exists.`,
    },
  ];

  return {
    statusCode: 400,
    message: "Duplicate field value entered",
    errorSources,
  };
};

export default handleDuplicateError;
