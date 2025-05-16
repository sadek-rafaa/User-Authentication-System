// const request = require('supertest');
// const app = require('../app');
// const { pool } = require('../config/db');

// let server;

// beforeAll(async () => {
//   server = app.listen(3001, () => {
//     console.log('✅ Test server running on port 3001...');
//   });
// });

// afterAll(async () => {
//   await pool.end();
//   await new Promise((resolve, reject) => {
//     server.close(err => {
//       if (err) return reject(err);
//       console.log('✅ Closing MySQL connection and stopping server...');
//       resolve();
//     });
//   });
// });

// describe('Auth API', () => {
//   it('should register a new user', async () => {
//     const response = await request(server)
//       .post('/api/auth/register')
//       .send({
//         email: `test-${Date.now()}@example.com`,
//         password: 'SecurePass123!',
//         firstName: 'Test',
//         lastName: 'User'
//       });
//     expect(response.statusCode).toBe(201);
//   });
// });


const request = require('supertest');
const app = require('../app');
const { pool } = require('../config/db');

afterAll(async () => {
  await pool.end(); // Close DB connection pool
});

describe('Auth API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: `test-${Date.now()}@example.com`,
        password: 'SecurePass123!',
        firstName: 'Test',
        lastName: 'User'
      });
    expect(response.statusCode).toBe(201);
  });
});
