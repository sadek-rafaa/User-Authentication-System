const { pool } = require('../config/db');

module.exports = async () => {
  console.log('Global test teardown running...');
  await pool.end();
};