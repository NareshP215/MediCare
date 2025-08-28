import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler, { errorMiddleware } from "../middlewares/errorMiddleware.js";
import { Appointment } from "../models/appointmentSchema.js";
import { User } from "../models/userSchema.js";
import { sendAppointmentStatusEmail } from "../utils/emailService.js";

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
    const { firstName, lastName, email, phone, pincode, dob, gender, appointment_date, department, docter_firstName, docter_lastName, hasVisited, address } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
        return next(new ErrorHandler("Please Fill Full Form!", 400));
    }

    if (!firstName || !lastName || !email || !phone || !pincode || !dob || !gender || !appointment_date || !department || !docter_firstName || !docter_lastName || !address) {
        return next(new ErrorHandler("Please Fill Full Form", 400));
    }

    const isConflict = await User.find({
        firstName: docter_firstName,
        lastName: docter_lastName,
        role: "Docter",
        docterDepartment: department,
    });

    if (isConflict.length === 0) {
        return next(new ErrorHandler("Docter not found!", 404));
    }

    if (isConflict.length > 1) {
        return next(new ErrorHandler("Docters Conflict! Please Contect Through Email or Phone!", 404));
    }

    const docterId = isConflict[0]._id;
    const patientId = req.user._id;
    const appointment = await Appointment.create({
        firstName, lastName, email, phone, pincode, dob, gender, appointment_date, department, docter: {
            firstName: docter_firstName,
            lastName: docter_lastName
        },
        hasVisited,
        address,
        docterId,
        patientId,
    });

    // Send confirmation email for new appointment
    try {
        const emailResult = await sendAppointmentStatusEmail(appointment, "Pending");
        if (emailResult.success) {
            console.log(`Confirmation email sent successfully for new appointment ${appointment._id}`);
        } else {
            console.error(`Failed to send confirmation email for appointment ${appointment._id}:`, emailResult.error);
        }
    } catch (emailError) {
        console.error('Error sending confirmation email:', emailError);
        // Don't fail the request if email fails, just log the error
    }

    res.status(200).json({
        success: true,
        message: "Appointment Sent Successfully!",
        appointment
    });

});

export const getAllAppointement = catchAsyncErrors(async (req, res, next) => {
    const appointments = await Appointment.find().sort({createdAt: -1}).populate('docterId', 'firstName lastName').populate('patientId', 'firstName lastName');

    res.status(200).json({
        success: true,
        appointments,
    });
});

export const updateAppointementStatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);

    if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
    }

    // Store the old status to check if it changed
    const oldStatus = appointment.status;
    
    // Update the appointment
    appointment = await Appointment.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    // Check if status was updated and send email if it changed
    if (req.body.status && req.body.status !== oldStatus) {
        try {
            // Send email notification
            const emailResult = await sendAppointmentStatusEmail(appointment, req.body.status);
            
            if (emailResult.success) {
                console.log(`Email sent successfully for appointment ${id} status update to ${req.body.status}`);
            } else {
                console.error(`Failed to send email for appointment ${id}:`, emailResult.error);
            }
        } catch (emailError) {
            console.error('Error sending status update email:', emailError);
            // Don't fail the request if email fails, just log the error
        }
    }

    res.status(200).json({
        success: true,
        message: "Appointement Status Updated!",
        appointment,
    })
});


export const deleteAppointement = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    let appointment = await Appointment.findById(id);

    if (!appointment) {
        return next(new ErrorHandler("Appointment not found!", 404));
    }
    await appointment.deleteOne();
    res.status(200).json({
        success: true,
        message: "Appointement Deleted!",
    })
});