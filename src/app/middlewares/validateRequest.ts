import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodError } from "zod";
import catchAsync from "../utils/catchAsync";

const validateRequest = (schema: ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
    });

    next();
  });
};

// const validateRequest = (schema: ZodObject<any, any>) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.parseAsync({
//         body: req.body,
//         // Uncomment the line below if you want to validate query parameters as well
//         // query: req.query,
//       });

//       next();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         // Log the validation error to console
//         console.log("Validation Error:", error);

//         // Get specific validation error messages
//         // const errorMessages = error.errors.map(
//         //   (err) => `${err.path.join(".")}: ${err.message}`
//         // );

//         // Format and send validation errors
//         return res.status(400).json({
//           success: false,
//           // message: `Validation failed - ${errorMessages.join(", ")}`,
//           // errors: error.errors.map((err) => ({
//           //   path: err.path.join("."),
//           //   message: err.message,
//           // })),
//         });
//       }

//       // Pass other errors to the global error handler
//       next(error);
//     }
//   };
// };

export default validateRequest;
