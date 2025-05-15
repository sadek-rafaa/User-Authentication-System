const mysql = require('mysql2/promise');
require ('dotenv').config();
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT || 3306,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: '+00:00', // UTC
  decimalNumbers: true, // Prevent decimal-to-string conversion
  namedPlaceholders: true // Enable named parameters
});

// Test connection immediately
pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL connection established');
    conn.release();
  })
  .catch(err => {
    console.error('❌ MySQL connection failed:', err.message);
    process.exit(1); // Fail fast if DB is unreachable
  });

// Remove the process.exit() call and modify exports:
module.exports = {
  pool,
  execute: async (sql, params) => {
    try {
      const [rows] = await pool.execute(sql, params);
      return rows;
    } catch (err) {
      console.error('Database error:', err);
      throw err;
    }
  }
};