const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getUsers } = require('../controllers/auth.controller.js');
const authenticateToken = require('../middleware/authenticateToken.js');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', authenticateToken, getUsers)


module.exports = router;