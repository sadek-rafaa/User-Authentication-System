const { pool } = require('../config/db');

module.exports = async () => {
  try {
    // Verify connection
    const conn = await pool.getConnection();
    await conn.query('TRUNCATE TABLE users');
    conn.release();
    console.log('✅ Test setup completed');
  } catch (err) {
    console.error('❌ Test setup failed:', err.message);
    throw err; // This will fail the tests if setup fails
  }
};