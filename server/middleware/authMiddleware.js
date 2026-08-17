const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log("[MIDDLEWARE] Authorization header:", req.header("Authorization"));
    console.log("[MIDDLEWARE] Extracted token:", token);
    console.log("[MIDDLEWARE] JWT_SECRET in middleware:", process.env.JWT_SECRET);

    if (!token) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("[MIDDLEWARE] Token verified successfully:", verified);
        req.user = verified;
        next();
    } catch (err) {
        console.log("[MIDDLEWARE] JWT verification error:", err.message);
        res.status(401).json({
            message: "Invalid or expired token."
        });
    }
};