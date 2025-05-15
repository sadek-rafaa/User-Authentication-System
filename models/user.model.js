const bcrypt = require('bcryptjs');
const { pool } = require('../config/db');
const { v4: uuidv4 } = require('uuid');

// SALT_ROUNDS should be high enough to be secure but not too slow (12 is current NIST recommendation)
const SALT_ROUNDS = process.env.NODE_ENV === 'production' ? 12 : 10;

class User {
  /**
   * Creates a new user in the database
   * @param {Object} userData - { email, password, firstName, lastName }
   * @returns {Promise<Object>} Created user (without password)
   */
  static async create({ email, password, firstName, lastName }) {
    const verificationToken = uuidv4();
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    
    const [result] = await pool.execute(
      `INSERT INTO users 
       (email, password_hash, first_name, last_name, verification_token) 
       VALUES (?, ?, ?, ?, ?)`,
      [email, passwordHash, firstName, lastName, verificationToken]
    );

    return this.findById(result.insertId);
  }

  /**
   * Finds user by ID (without sensitive data)
   * @param {number} id 
   * @returns {Promise<Object|null>} User object or null
   */
  static async findById(id) {
    const [users] = await pool.execute(
      `SELECT 
        id, email, first_name as firstName, 
        last_name as lastName, is_verified as isVerified,
        created_at as createdAt, updated_at as updatedAt
       FROM users WHERE id = ?`,
      [id]
    );
    return users[0] || null;
  }

  // Additional methods...
  /**
 * Finds user by email (for authentication)
 * @param {string} email 
 * @returns {Promise<Object|null>} User with password_hash
 */
static async findByEmail(email) {
  const [users] = await pool.execute(
    `SELECT * FROM users WHERE email = ?`,
    [email]
  );
  return users[0] || null;
}

/**
 * Verifies user password
 * @param {string} candidatePassword 
 * @param {string} passwordHash 
 * @returns {Promise<boolean>}
 */
static async verifyPassword(candidatePassword, passwordHash) {
  return bcrypt.compare(candidatePassword, passwordHash);
}

/**
 * Generates password reset token
 * @param {string} email 
 * @returns {Promise<string>} Reset token
 */
static async generatePasswordResetToken(email) {
  const resetToken = uuidv4();
  const expiresAt = new Date(Date.now() + 3600000); // 1 hour expiration
  
  await pool.execute(
    `UPDATE users 
     SET reset_token = ?, reset_token_expires = ?
     WHERE email = ?`,
    [resetToken, expiresAt, email]
  );
  
  return resetToken;
}
}

module.exports = User;