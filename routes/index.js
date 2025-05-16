const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes'); // ✅ Must exist

router.use('/auth', authRoutes);
router.use('/users', userRoutes); // ✅ e.g., /api/users/profile

module.exports = router;
