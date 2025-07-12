import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";
import catchAsync from "../utils/catchAsync";

const validateRequest = (schema: ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
      // Uncomment the line below if you want to validate query parameters as well
      // query: req.query,
    });
    next();
    // try {
    // } catch (error) {
    //   // if (error instanceof ZodError) {
    //   //   // Respond with detailed validation errors
    //   //   return res.status(400).json({
    //   //     success: false,
    //   //     message: "Validation error",
    //   //     errors: error.errors.map((err) => ({
    //   //       path: err.path.join("."),
    //   //       message: err.message,
    //   //     })),
    //   //   });
    //   // }
    //   console.log(error);
    //   next(error); // Pass other errors to the global error handler
    // }
  });
};

export default validateRequest;
