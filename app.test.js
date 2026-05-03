const request = require('supertest');
const app = require('./index');

describe('API Endpoints', () => {
  
  test('GET / should return HTML landing page', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Express API Portal');
  });

  test('GET /api/health should return system status', async () => {
    const response = await request(app).get('/api/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'online');
    expect(response.body).toHaveProperty('message', 'System is running smoothly');
  });

  test('GET /api/items should return a list of items', async () => {
    const response = await request(app).get('/api/items');
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  test('GET /api/items/:id should return a specific item', async () => {
    const response = await request(app).get('/api/items/1');
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toHaveProperty('name', 'Antigravity Core');
  });

  test('GET /api/items/:id should return 404 for invalid ID', async () => {
    const response = await request(app).get('/api/items/999');
    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
  });

  test('POST /api/echo should echo back the body', async () => {
    const testData = { message: 'Hello World', value: 42 };
    const response = await request(app)
      .post('/api/echo')
      .send(testData);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.body).toEqual(testData);
  });

  test('GET /api/time should return current server time', async () => {
    const response = await request(app).get('/api/time');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('now');
    expect(response.body).toHaveProperty('timezone');
    expect(response.body).toHaveProperty('unix');
  });

});
