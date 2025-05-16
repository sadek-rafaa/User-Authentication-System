process.env.NODE_ENV = 'test_teardown';

const { pool } = require('../config/db');

module.exports = async () => {
  try {
    await pool.end();
    console.log('✅ Global teardown: DB pool closed');
  } catch (err) {
    if (!err.message.includes('Pool is closed')) {
      console.error('❌ Global teardown error:', err.message);
    }
  }
};
