exports.verifyAdmin = (req, res, next) => {
    try {
        if (!req.auth.role) {
            res.status(403).json({ success: false, message: "Invalid token" })
            return;
        }
        if (req.auth.role !== "admin") {
            res.status(401).json({ success: false, message: "Unauthorised" })
            return;
        } else next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" })
        return;
    }
};