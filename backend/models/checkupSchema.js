import mongoose from "mongoose";
import validator from "validator";

const checkupSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full Name is required!"],
        minLength: [6, "Full Name must contain at least 6 characters!"]
    },
    gender: {
        type: String,
        required: [true, "Gender is required!"],
        enum: ["Male", "Female"]
    },
    age: {
        type: Number,
        required: [true, "Age is required!"],
        min: [1, "Age must be at least 1 year!"],
        max: [120, "Age must be below 120 years!"]
    },
    phone: {
        type: String,
        required: [true, "Phone Number is required!"],
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: "Phone Number must contain exactly 10 digits!"
        }
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
        trim: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email!"]
    },
    symptoms: {
        type: String,
        trim: true,
        required: [true, "Symptoms is required!"],
    }
});

export const Checkup = mongoose.model("Checkup", checkupSchema);
