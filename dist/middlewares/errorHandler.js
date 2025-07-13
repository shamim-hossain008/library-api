"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const apiRes_1 = require("../utils/apiRes");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(400).json((0, apiRes_1.error)(err.message || "Something went wrong", err));
};
exports.errorHandler = errorHandler;
