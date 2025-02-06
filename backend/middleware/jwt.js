const jwt = require("jsonwebtoken");

exports.validateToken = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ success: false, message: "Missing token" });
            return;
        }
        token = token.replace("Bearer ", "")
        const payload = jwt.decode(token);
        if (!payload) {
            res.status(403).json({ success: false, message: "Token is invalid" });
            return;
        }
        const { id } = payload;
        req.auth = id;
        next();

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" })
        return;
    }
};
