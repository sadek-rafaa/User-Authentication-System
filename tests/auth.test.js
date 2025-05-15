const request = require('supertest');
const app = require('../app');
const { pool } = require('../config/db');

describe('Auth API', () => {
  beforeAll(async () => {
    await pool.execute('TRUNCATE TABLE users');
  });

  afterAll(async () => {
    await pool.end();
  });

  const testUser = {
    email: `test-${Date.now()}@example.com`,
    password: 'SecurePass123!',
    firstName: 'Test',
    lastName: 'User'
  };

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
  });
});