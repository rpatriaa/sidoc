const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Apply authentication middleware to all user routes
router.use(authMiddleware);

router.get('', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;