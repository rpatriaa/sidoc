const bcrypt = require('bcrypt');
const userService = require('./user.service');
const jwt = require('jsonwebtoken');

exports.register = async(payload) => {
    const { name, email, password, role } = payload;

    // cek email sudah terdaftar
    const existingUser = await userService.findUserByEmail(email);
    if(existingUser) {
        throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    return userService.createUser({
        name,
        email,
        password: hashedPassword,
        role: role || 'staff'
    });
}

exports.login = async(email, password) => {
    const user = await userService.findUserByEmail(email);
    if(!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    if(!user.is_active) {
        throw new Error('User account is inactive');
    }

    const token = jwt.sign(
        {id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '10min'}
    );

    return token;
}