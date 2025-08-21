"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const extractedMatch = match && match[1];
    const errorSources = [
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
exports.default = handleDuplicateError;
