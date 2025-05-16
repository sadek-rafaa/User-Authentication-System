const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller'); // ✅ This must exist

router.get('/profile', userController.getProfile); // ✅ This must be a real function

module.exports = router;
