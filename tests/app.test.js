const request = require('supertest');
const app = require('../src/app');

// ── HEALTH CHECK TESTS ──
describe('Health Check', () => {
    
    test('GET / should return API running message', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Costco Retail API is running!');
    });

});

// ── PRODUCT TESTS ──
describe('Products', () => {

    test('GET /products should return all products', async () => {
        const response = await request(app).get('/products');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(5);
    });

    test('GET /products/1 should return Kirkland Olive Oil', async () => {
        const response = await request(app).get('/products/1');
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Kirkland Olive Oil');
    });

    test('GET /products/999 should return 404', async () => {
        const response = await request(app).get('/products/999');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Product not found');
    });

    test('GET /products/category/grocery should return grocery items', async () => {
        const response = await request(app).get('/products/category/grocery');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

});

// ── CART TESTS ──
describe('Shopping Cart', () => {

    test('GET /cart should return empty cart initially', async () => {
        const response = await request(app).get('/cart');
        expect(response.status).toBe(200);
        expect(response.body.itemCount).toBe(0);
    });

    test('POST /cart should add item to cart', async () => {
        const response = await request(app)
            .post('/cart')
            .send({ productId: 1, quantity: 2 });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Added to cart!');
    });

    test('POST /cart with invalid product should return 404', async () => {
        const response = await request(app)
            .post('/cart')
            .send({ productId: 999, quantity: 1 });
        expect(response.status).toBe(404);
    });

    test('DELETE /cart should clear the cart', async () => {
        const response = await request(app).delete('/cart');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Cart cleared!');
    });

});