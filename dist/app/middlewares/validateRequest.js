"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const validateRequest = (schema) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield schema.parseAsync({
            body: req.body,
        });
        next();
    }));
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
exports.default = validateRequest;
