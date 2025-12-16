const { access } = require('fs');
const authService = require('../services/auth.service');
const response = require('../utils/response');

exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);

        return response.success(res, user, 'User registered successfully', 201);
    } catch (error) {
        return response.error(res, error.message, 400);
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);

        return res.status(200).json({
            status: 'success',
            message: 'Login successful',
            data: {
                accessToken: token
            }
        })
    } catch (error) {
        return response.error(res, error.messsage, 401);
    }
} 