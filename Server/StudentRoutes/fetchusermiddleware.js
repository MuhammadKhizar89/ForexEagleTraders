const jwt = require('jsonwebtoken');
const JWT_SECRET = 'forex123';
function verifyToken(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Please provide a token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.userId = data.id; // Extract user ID from the JWT payload and attach it to the request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }
}

module.exports = verifyToken;
