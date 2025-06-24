const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to fetch all registered users
router.get('/view', userController.getAllUsers);

module.exports = router;