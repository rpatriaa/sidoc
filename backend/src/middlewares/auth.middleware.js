const jwt = require('jsonwebtoken');
const response = require('../utils/response');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader) {
        return response.error(res, 'Unauthorized', 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        return response.error(res, 'Invalid or expired token', 401);
    }
}