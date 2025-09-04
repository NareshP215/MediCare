export const generateToken = (user, message, statusCode, res) => {
    const token = user.generateJsonWebToken();
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

    res.status(statusCode)
        .cookie(cookieName, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ✅ secure in prod
            sameSite: "None",                              // ✅ cross-domain cookie
            expires: new Date(Date.now() + process.env.COOKIE_JWT_EXPIRE * 24 * 60 * 60 * 1000)
        })
        .json({
            success: true,
            message,
            user,
            token
        });
};
