import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { Checkup } from "../models/checkupSchema.js";
import { sendCheckupEmail } from "../utils/emailService.js";

export const sendCheckup = catchAsyncErrors(async (req, res, next) => {

    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    const { fullName, gender, age, phone, email, symptoms, aiPrediction } = req.body;

    if (!fullName || !gender || !age || !phone || !email || !symptoms) {
        return next(new ErrorHandler("Please fill the full form!", 400));
    }

    const checkup = await Checkup.create({ fullName, gender, age, phone, email, symptoms });

    // Send confirmation email for checkup request with AI prediction data
    try {
        const emailResult = await sendCheckupEmail(checkup, aiPrediction);
        if (emailResult.success) {
            console.log(`Checkup confirmation email sent successfully for ${checkup.fullName}`);
        } else {
            console.error(`Failed to send checkup confirmation email for ${checkup.fullName}:`, emailResult.error);
        }
    } catch (emailError) {
        console.error('Error sending checkup confirmation email:', emailError);
        // Don't fail the request if email fails, just log the error
    }

    return res.status(200).json({
        success: true,
        message: "Message sent successfully!",
    });
});


export const getAllCheckup = catchAsyncErrors(async (req, res, next) => {
    const checkup = await Checkup.find();
    res.status(200).json({
        success: true,
        checkup,
    })
});