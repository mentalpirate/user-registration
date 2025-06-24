const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for handling user registration
router.post('/submit', userController.registerUser);

module.exports = router;