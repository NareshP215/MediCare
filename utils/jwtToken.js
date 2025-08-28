export const generateToken = (user, message, statuscode, res) => {
    const token = user.generateJsonWebToken();
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken"
    res.status(statuscode)
        .cookie(cookieName, token, {
            httpOnly: true,
            expires: new Date(Date.now() + process.env.COOKIE_JWT_EXPIRE * 24 * 60 * 60 * 1000)
        })
        .json({
            success: true,
            message,
            user,
            token
        })
}