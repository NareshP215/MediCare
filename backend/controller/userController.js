import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary"

export const patientRegister = catchAsyncErrors(async (req, res, next) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const { firstName, lastName, email, phone, password, gender, dob, pincode, role } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !pincode || !role) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User Already Registered!", 400));
    }

    user = await User.create({ firstName, lastName, email, phone, password, gender, dob, pincode, role });
    generateToken(user, "User Registerd!", 200, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {

    const { email, password, confirmPassword, role } = req.body;
    if (!email || !password || !confirmPassword || !role) {
        return next(new ErrorHandler("Please Provide All Details!", 400));
    }
    if (password !== confirmPassword) {
        return next(new ErrorHandler("Password And Confirm Password Do not Match!", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid Password Or Email!", 400));
    }

    const isPasswordMatchd = await user.comparePassword(password);
    if (!isPasswordMatchd) {
        return next(new ErrorHandler("Invalid Password Or Email!", 400));
    }

    if (role !== user.role) {
        return next(new ErrorHandler("User With This Role Not Found!", 400));
    }
    generateToken(user, "User Logged In Successfully!", 200, res);
});

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const { firstName, lastName, email, phone, password, gender, dob, pincode } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !pincode) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const isRegistered = await User.findOne({ email });

    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} with this email already exists!`, 400));
    }

    const admin = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        pincode,
        role: "Admin"
    });

    res.status(200).json({
        success: true,
        message: "New Admin Registered!"
    });
});

export const getAllDocter = catchAsyncErrors(async (req, res, next) => {
    const docters = await User.find({ role: "Docter" });
    res.status(200).json({
        success: true,
        docters
    });
});


export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user
    })
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
    res.status(200)
        .cookie("adminToken", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: "none",
            secure: true
        })
        .json({
            success: true,
            message: "Admin Log Out Successfully!"
        });
});

export const logoutPatient = catchAsyncErrors(async (req, res, next) => {
    res.status(200)
        .cookie("patientToken", "", {
            httpOnly: true,
            expires: new Date(Date.now())
        })
        .json({
            success: true,
            message: "Patient Log Out Successfully!"
        });
});

export const addNewDocter = catchAsyncErrors(async (req, res, next) => {


    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Docter Image Required!", 400));
    }

    const { docAvatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp", "image/jpg"];
    if (!allowedFormats.includes(docAvatar.mimetype)) {
        return next(new ErrorHandler("File Format Not Supported!", 400));
    }

    const { firstName, lastName, email, phone, password, gender, dob, pincode, docterDepartment } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !gender || !dob || !pincode || !docterDepartment) {
        return next(new ErrorHandler("Please Provide Full Details!", 400));
    }

    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
        return next(new ErrorHandler(`${isRegistered.role} already registerd with this email!F`, 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(docAvatar.tempFilePath);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
        console.log("Cloudinary Error", cloudinaryResponse.error || "Unkown Cloudinary Error");
    }


    const doctor = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        pincode,
        docterDepartment,
        role: "Docter",
        docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url
        }
    });

    res.status(200).json({
        success: true,
        message: "New Docter Registered!",
        doctor
    });

});