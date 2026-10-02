import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access denied. Authentication required." });
        }

        const token = authHeader.split(" ")[1];

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment");
            return res.status(500).json({ message: "Server misconfiguration." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach the decoded payload (usually contains `id`) so controllers can access `req.user.id`
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token." });
    }
};

export default userAuth;