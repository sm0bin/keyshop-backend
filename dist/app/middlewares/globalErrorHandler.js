"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleError = (err, handler) => {
    const { statusCode, message, errorSources } = handler(err);
    return { statusCode, message, errorSources };
};
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Internal server error";
    let errorSources = [
        {
            path: "",
            message: "Something went wrong!",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        ({ statusCode, message, errorSources } = handleError(err, handleZodError_1.default));
    }
    else if (err.name === "ValidationError") {
        ({ statusCode, message, errorSources } = handleError(err, handleValidationError_1.default));
    }
    else if (err.name === "CastError") {
        ({ statusCode, message, errorSources } = handleError(err, handleCastError_1.default));
    }
    else if (err.code === 11000) {
        ({ statusCode, message, errorSources } = handleError(err, handleDuplicateError_1.default));
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        errorSources = [
            {
                path: "",
                message: err.message,
            },
        ];
    }
    else if (err instanceof Error) {
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
        stack: config_1.default.nodeEnv === "development" ? err.stack : undefined,
    });
};
exports.default = globalErrorHandler;
