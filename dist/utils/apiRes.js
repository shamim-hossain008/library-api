"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
const success = (message, data = null) => ({
    success: true,
    message,
    data,
});
exports.success = success;
const error = (message, err = {}) => ({
    success: false,
    message,
    error: err,
});
exports.error = error;
