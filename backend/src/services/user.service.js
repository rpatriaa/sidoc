const db = require('../utils/database');

const getAllUsers = async () => {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
}

const getUserById = async (id) => {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}

const createUser = async ({ name, email, password, role }) => {
    const [result] = await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role]);
    return { id: result.insertId, name, email};
}

const updateUser = async (id, { name, email }) => {
    await db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
}

const deleteUser = async (id) => {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
}

const findUserByEmail = async (email) => {
    const [rows] =await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    findUserByEmail,
}