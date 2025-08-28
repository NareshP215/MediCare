import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHanlder from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const isAdminAuthnticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.adminToken;
    if (!token) {
        return next(new ErrorHanlder("Admin Not Authenticated!", 400));
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);

    if (req.user.role !== "Admin") {
        return next(new ErrorHanlder(`${req.user.role} not authorized for this resources!`, 403));
    }
    next();
});


export const isPatientAuthnticated = catchAsyncErrors(async (req, res, next) => {
    const token = req.cookies.patientToken;
    if (!token) {
        return next(new ErrorHanlder("Login Is Required!", 400));
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decode.id);

    if (req.user.role !== "Patient") {
        return next(new ErrorHanlder(`${req.user.role} not authorized for this resources!`, 403));
    }
    next();
});
