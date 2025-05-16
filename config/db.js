require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4'
});

// Skip connection test during Jest global teardown
if (process.env.NODE_ENV !== 'test_teardown') {
  pool.getConnection()
    .then(conn => {
      console.log('✅ MySQL connection established');
      conn.release();
    })
    .catch(err => {
      console.error('❌ MySQL connection failed:', err.message);
      if (process.env.NODE_ENV !== 'test') process.exit(1);
    });
}

module.exports = {
  pool,
  execute: async (sql, params) => {
    const [rows] = await pool.execute(sql, params);
    return rows;
  }
};
