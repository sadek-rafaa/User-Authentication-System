const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateRegisterInput, validateLoginInput } = require('../utils/validators');

const register = async (req, res) => {
  // 1. Input Validation
  const { error } = validateRegisterInput(req.body);
  if (error) return res.status(400).json({ errors: error.details });

  try {
    // 2. Check for existing user
    const existingUser = await User.findByEmail(req.body.email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    // 3. Create user
    const user = await User.create(req.body);

    // 4. Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // 5. Respond (excluding sensitive data)
    res.status(201).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      token
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const login = async (req, res) => {
  // 1. Validate input
  const { error } = validateLoginInput(req.body);
  if (error) return res.status(400).json({ errors: error.details });

  try {
    // 2. Find user
    const user = await User.findByEmail(req.body.email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    // 3. Verify password
    const validPassword = await User.verifyPassword(req.body.password, user.password_hash);
    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    // 4. Generate JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // 5. Respond
    res.json({
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { register, login };



// controllers/auth.controller.js
// exports.register = async (req, res) => {
//   try {
//     const { email, password, firstName, lastName } = req.body;
//     if (!email || !password || !firstName || !lastName) {
//       return res.status(400).json({ message: 'Missing fields' });
//     }
//     // Stub response for testing
//     return res.status(201).json({ message: 'User registered' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
