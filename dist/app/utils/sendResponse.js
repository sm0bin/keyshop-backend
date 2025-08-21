"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, { success, statusCode, message, data }) => {
    const responseData = {
        success,
        statusCode,
        message,
    };
    if (data) {
        responseData.data = data;
    }
    res.status(statusCode).json(responseData);
};
exports.default = sendResponse;
