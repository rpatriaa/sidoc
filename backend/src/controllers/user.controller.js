const userService = require('../services/user.service');
const response = require('../utils/response');

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        return response.success(res, users);
    } catch (err) {
        next(err);
    }
}

const getUser = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return response.error(res, 'User not found', 404);
        }
        return response.success(res, user);
    } catch (err) {
        next(err);
    }
}

const createUser = async (req, res, next) => {
    try {
        const newUser = await userService.createUser(req.body);
        return response.success(res, newUser, 'User created', 201);
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    try {
        await userService.updateUser(req.params.id, req.body);
        return response.success(res, null, 'User updated');
    } catch (err) {
        next(err);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        return response.success(res, null, 'User deleted');
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}