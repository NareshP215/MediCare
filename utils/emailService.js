import nodemailer from 'nodemailer';

// Create transporter with fallback values
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER || "prajapatinaresh2152006@gmail.com",
        pass: process.env.EMAIL_PASSWORD || "mtqx ahmc jelr aubj",
    }
});



// Email template for appointment status update
const createStatusUpdateEmail = (appointment, newStatus) => {
    const statusMessages = {
        'Accepted': 'Your appointment has been accepted and confirmed.',
        'Rejected': 'Your appointment has been rejected.',
        'Pending': 'Your appointment is currently pending review.'
    };

    return {
        subject: `Appointment Status Update - ${newStatus}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
                <div style="background: white; padding: 25px; border-radius: 8px; margin: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="https://res.cloudinary.com/dnjbouwbl/image/upload/v1755485555/3_skjav7.png" alt="Medicare Logo" style="height: 60px; margin-bottom: 10px;" />
                        <h2 style="color: #4a5568; font-size: 28px; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">MediCare</h2>
                    </div>
                    <hr style="border: 2px solid #e2e8f0; margin: 20px 0; border-radius: 1px;">
                    
                    <h3 style="color: #2d3748; font-size: 22px; margin-bottom: 15px;">Dear ${appointment.firstName} ${appointment.lastName},</h3>
                    
                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">We hope this email finds you well. This is to inform you about an update regarding your appointment.</p>
                    
                    <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4299e1;">
                        <h4 style="color: #2d3748; margin-top: 0; font-size: 18px; margin-bottom: 15px;">📋 Appointment Details:</h4>
                        <p style="color: #4a5568; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Date:</strong> <span style="color: #2d3748;">${appointment.appointment_date}</span></p>
                        <p style="color: #4a5568; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Department:</strong> <span style="color: #2d3748;">${appointment.department}</span></p>
                        <p style="color: #4a5568; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Doctor:</strong> <span style="color: #2d3748;">Dr. ${appointment.docter.firstName} ${appointment.docter.lastName}</span></p>
                        <p style="color: #4a5568; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Status:</strong> <span style="color: ${newStatus === 'Accepted' ? '#38a169' : newStatus === 'Rejected' ? '#e53e3e' : '#d69e2e'}; font-weight: bold; font-size: 16px; padding: 4px 12px; background: ${newStatus === 'Accepted' ? '#f0fff4' : newStatus === 'Rejected' ? '#fed7d7' : '#fef5e7'}; border-radius: 20px; border: 2px solid ${newStatus === 'Accepted' ? '#38a169' : newStatus === 'Rejected' ? '#e53e3e' : '#d69e2e'}; display: inline-block;">${newStatus}</span></p>
                    </div>
                    
                    <p style="color: #2d3748; font-size: 16px; line-height: 1.6; font-weight: 500;">${statusMessages[newStatus]}</p>
                    
                    ${newStatus === 'Accepted' ? `
                    <div style="background: linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%); padding: 18px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #38a169;">
                        <p style="color: #2d3748; font-size: 16px; margin-bottom: 12px; font-weight: 500;">Please arrive 15 minutes before your scheduled appointment time. Don't forget to bring:</p>
                        <ul style="color: #2d3748; font-size: 15px; line-height: 1.8;">
                            <li style="margin: 8px 0;">Valid ID proof</li>
                            <li style="margin: 8px 0;">Previous medical records (if any)</li>
                            <li style="margin: 8px 0;">List of current medications</li>
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${newStatus === 'Rejected' ? `
                    <div style="background: linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%); padding: 18px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #e53e3e;">
                        <p style="color: #2d3748; font-size: 16px; font-weight: 500;">If you have any questions about this decision or would like to reschedule, please contact us.</p>
                    </div>
                    ` : ''}
                    
                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">If you have any questions or need to make changes to your appointment, please don't hesitate to contact us.</p>
                    
                    <div style="background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4299e1;">
                        <h4 style="color: #2d3748; margin-top: 0; font-size: 18px; margin-bottom: 15px;"> Contact Information:</h4>
                        <p style="color: #4a5568; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Phone:</strong> <span style="color: #2d3748;">+91 999-999-9999</span></p>
                        <p style="color: #4a5568; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Email:</strong> <span style="color: #2d3748;">info@medicare.com</span></p>
                        <p style="color: #4a5568; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Address:</strong> <span style="color: #2d3748;">Ahmedabad, Gujarat</span></p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <img src="https://res.cloudinary.com/dnjbouwbl/image/upload/v1755485555/3_skjav7.png" alt="Medicare Logo" style="height: 40px; margin-bottom: 15px; opacity: 0.8;" />
                        <p style="color: #718096; font-size: 16px; margin: 0; font-style: italic;">
                            Thank you for choosing MediCare. We look forward to serving you.
                        </p>
                    </div>
                    
                    <hr style="border: 2px solid #e2e8f0; margin: 20px 0; border-radius: 1px;">
                    <p style="color: #a0aec0; font-size: 12px; text-align: center; font-style: italic;">
                        This is an automated email. Please do not reply to this message.
                    </p>
                </div>
            </div>
        `
    };
};

// Function to send email
export const sendEmail = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER || "prajapatinaresh2152006@gmail.com",
            to: to,
            subject: subject,
            html: html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: error.message };
    }
};

// Function to send appointment status update email
export const sendAppointmentStatusEmail = async (appointment, newStatus) => {
    try {
        const emailContent = createStatusUpdateEmail(appointment, newStatus);
        const result = await sendEmail(
            appointment.email,
            emailContent.subject,
            emailContent.html
        );
        return result;
    } catch (error) {
        console.error('Error sending appointment status email:', error);
        return { success: false, error: error.message };
    }
};

// Email template for checkup confirmation
const createCheckupEmail = (checkup, aiPrediction) => {
    return {
        subject: "Checkup Request & AI Analysis Results - MediCare",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 10px;">
                <div style="background: white; padding: 25px; border-radius: 8px; margin: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <img src="https://res.cloudinary.com/dnjbouwbl/image/upload/v1755485555/3_skjav7.png" alt="Medicare Logo" style="height: 60px; margin-bottom: 10px;" />
                        <h2 style="color: #4a5568; font-size: 28px; margin: 0; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">MediCare</h2>
                    </div>
                    <hr style="border: 2px solid #e2e8f0; margin: 20px 0; border-radius: 1px;">
                    
                    <h3 style="color: #2d3748; font-size: 22px; margin-bottom: 15px;">Dear ${checkup.fullName},</h3>
                    
                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">Thank you for submitting your checkup request. We have received your symptoms and our AI system has analyzed them to provide preliminary insights.</p>
                    
                    <div style="background: linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4299e1;">
                        <h4 style="color: #2d3748; margin-top: 0; font-size: 18px; margin-bottom: 15px;">📋 Checkup Request Details:</h4>
                        <p style="color: #4a5568; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Full Name:</strong> <span style="color: #2d3748;">${checkup.fullName}</span></p>
                        <p style="color: #4a5568; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Gender:</strong> <span style="color: #2d3748;">${checkup.gender}</span></p>
                        <p style="color: #4a5568; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Age:</strong> <span style="color: #2d3748;">${checkup.age} years</span></p>
                        <p style="color: #4a5568; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Phone:</strong> <span style="color: #2d3748;">${checkup.phone}</span></p>
                        <p style="color: #4a5568; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Symptoms:</strong> <span style="color: #2d3748;">${checkup.symptoms}</span></p>
                    </div>
                    
                    ${aiPrediction ? `
                    <div style="background: linear-gradient(135deg, #fef5e7 0%, #fed7aa 100%); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #d69e2e;">
                        <h4 style="color: #2d3748; margin-top: 0; font-size: 18px; margin-bottom: 15px;">🤖 AI Analysis Results:</h4>
                        
                        ${aiPrediction.disease ? `
                        <div style="margin-bottom: 15px;">
                            <p style="color: #2d3748; margin: 8px 0; font-size: 15px;"><strong style="color: #d69e2e;">Possible Condition:</strong> <span style="color: #2d3748; font-weight: 600;">${aiPrediction.disease}</span></p>
                        </div>
                        ` : ''}
                        
                        ${aiPrediction.description ? `
                        <div style="margin-bottom: 15px;">
                            <p style="color: #2d3748; margin: 8px 0; font-size: 15px;"><strong style="color: #d69e2e;">Description:</strong> <span style="color: #2d3748;">${aiPrediction.description}</span></p>
                        </div>
                        ` : ''}
                        
                        ${aiPrediction.medications && aiPrediction.medications.length > 0 ? `
                        <div style="margin-bottom: 15px;">
                            <p style="color: #2d3748; margin: 8px 0; font-size: 15px;"><strong style="color: #d69e2e;">Recommended Medications:</strong></p>
                            <ul style="color: #2d3748; font-size: 14px; line-height: 1.6; margin: 5px 0; padding-left: 20px;">
                                ${aiPrediction.medications.map(med => `<li style="margin: 3px 0;">${med}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                        
                        ${aiPrediction.precautions && aiPrediction.precautions.length > 0 ? `
                        <div style="margin-bottom: 15px;">
                            <p style="color: #2d3748; margin: 8px 0; font-size: 15px;"><strong style="color: #d69e2e;">Precautions:</strong></p>
                            <ul style="color: #2d3748; font-size: 14px; line-height: 1.6; margin: 5px 0; padding-left: 20px;">
                                ${aiPrediction.precautions.map(prec => `<li style="margin: 3px 0;">${prec}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                        
                        ${aiPrediction.diet && aiPrediction.diet.length > 0 ? `
                        <div style="margin-bottom: 15px;">
                            <p style="color: #2d3748; margin: 8px 0; font-size: 15px;"><strong style="color: #d69e2e;">Dietary Recommendations:</strong></p>
                            <ul style="color: #2d3748; font-size: 14px; line-height: 1.6; margin: 5px 0; padding-left: 20px;">
                                ${aiPrediction.diet.map(food => `<li style="margin: 3px 0;">${food}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                        
                        ${aiPrediction.workout && aiPrediction.workout.length > 0 ? `
                        <div style="margin-bottom: 15px;">
                            <p style="color: #2d3748; margin: 8px 0; font-size: 15px;"><strong style="color: #d69e2e;">Lifestyle & Care Recommendations:</strong></p>
                            <ul style="color: #2d3748; font-size: 14px; line-height: 1.6; margin: 5px 0; padding-left: 20px;">
                                ${aiPrediction.workout.map(item => `<li style="margin: 3px 0;">${item}</li>`).join('')}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                    ` : ''}
                    
                    <div style="background: linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%); padding: 18px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #38a169;">
                        <h4 style="color: #2d3748; margin-top: 0; font-size: 18px; margin-bottom: 15px;">What Happens Next?</h4>
                        <ul style="color: #2d3748; font-size: 15px; line-height: 1.8;">
                            <li style="margin: 8px 0;">Our medical team will review your symptoms and AI analysis</li>
                            <li style="margin: 8px 0;">You'll receive a call within 24-48 hours</li>
                            <li style="margin: 8px 0;">We'll schedule a consultation if needed</li>
                            <li style="margin: 8px 0;">Professional medical advice will be provided</li>
                        </ul>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #fed7d7 0%, #feb2b2 100%); padding: 18px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #e53e3e;">
                        <h4 style="color: #2d3748; margin-top: 0; font-size: 18px; margin-bottom: 15px;">⚠️ Important Notes:</h4>
                        <ul style="color: #2d3748; font-size: 15px; line-height: 1.8;">
                            <li style="margin: 8px 0;">If symptoms are severe, please visit emergency room</li>
                            <li style="margin: 8px 0;">Keep your phone accessible for our call</li>
                            <li style="margin: 8px 0;">Don't stop any current medications without consulting</li>
                            <li style="margin: 8px 0;">AI analysis is for preliminary guidance only - consult healthcare professionals</li>
                        </ul>
                    </div>
                    
                    <p style="color: #4a5568; font-size: 16px; line-height: 1.6;">If you have any urgent concerns or if your symptoms worsen, please don't hesitate to contact us immediately.</p>
                    
                    <div style="background: linear-gradient(135deg, #edf2f7 0%, #e2e8f0 100%); padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4299e1;">
                        <h4 style="color: #2d3748; margin-top: 0; font-size: 18px; margin-bottom: 15px;"> Contact Information:</h4>
                        <p style="color: #4a5568; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Phone:</strong> <span style="color: #2d3748;">+91 999-999-9999</span></p>
                        <p style="color: #4a5568; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Email:</strong> <span style="color: #2d3748;">info@medicare.com</span></p>
                        <p style="color: #2d3748; margin: 8px 0; font-size: 15px;"><strong style="color: #2b6cb0;">Address:</strong> <span style="color: #2d3748;">Ahmedabad, Gujarat</span></p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px;">
                        <img src="https://res.cloudinary.com/dnjbouwbl/image/upload/v1755485555/3_skjav7.png" alt="Medicare Logo" style="height: 40px; margin-bottom: 15px; opacity: 0.8;" />
                        <p style="color: #718096; font-size: 16px; margin: 0; font-style: italic;">
                            Thank you for choosing MediCare. We're here to help you feel better.
                        </p>
                    </div>
                    
                    <hr style="border: 2px solid #e2e8f0; margin: 20px 0; border-radius: 1px;">
                    <p style="color: #a0aec0; font-size: 12px; text-align: center; font-style: italic;">
                        This is an automated email. Please do not reply to this message.
                    </p>
                </div>
            </div>
        `
    };
};

// Function to send checkup confirmation email
export const sendCheckupEmail = async (checkup, aiPrediction) => {
    try {
        const emailContent = createCheckupEmail(checkup, aiPrediction);
        const result = await sendEmail(
            checkup.email,
            emailContent.subject,
            emailContent.html
        );
        return result;
    } catch (error) {
        console.error('Error sending checkup email:', error);
        return { success: false, error: error.message };
    }
};

export default transporter;
