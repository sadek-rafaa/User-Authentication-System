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

  it('should login a user', async () => {
    // First register
    const testUser = {
      email: `test-${Date.now()}@example.com`,
      password: 'SecurePass123!',
      firstName: 'Test',
      lastName: 'User'
    };
    
    await request(app).post('/api/auth/register').send(testUser);

    // Then login
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should reject invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toBe(401);
  });
});
