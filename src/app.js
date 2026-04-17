const express = require('express');
const app = express();

app.use(express.json());

// ── PRODUCT CATALOG ──
const products = [
    { id: 1, name: "Kirkland Olive Oil", price: 15.99, category: "Grocery", stock: 150 },
    { id: 2, name: "Kirkland Chicken", price: 22.99, category: "Meat", stock: 80 },
    { id: 3, name: "Samsung TV 55inch", price: 499.99, category: "Electronics", stock: 25 },
    { id: 4, name: "Kirkland Water 40pk", price: 4.99, category: "Grocery", stock: 300 },
    { id: 5, name: "Nike Shoes", price: 89.99, category: "Clothing", stock: 60 },
];

// ── SHOPPING CART ──
let cart = [];

// ── ROUTES ──

// Health check
app.get('/', (req, res) => {
    res.json({ 
        message: "Costco Retail API is running!",
        version: "1.0.0"
    });
});

// Get all products
app.get('/products', (req, res) => {
    res.json(products);
});

// Get product by ID
app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
});

// Get products by category
app.get('/products/category/:category', (req, res) => {
    const filtered = products.filter(
        p => p.category.toLowerCase() === req.params.category.toLowerCase()
    );
    res.json(filtered);
});

// Get cart
app.get('/cart', (req, res) => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    res.json({ 
        items: cart, 
        total: total.toFixed(2),
        itemCount: cart.length
    });
});

// Add to cart
app.post('/cart', (req, res) => {
    const { productId, quantity } = req.body;
    const product = products.find(p => p.id === productId);
    
    if (!product) {
        return res.status(404).json({ error: "Product not found" });
    }

    const existingItem = cart.find(item => item.productId === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            productId,
            name: product.name,
            price: product.price,
            quantity
        });
    }
    res.json({ message: "Added to cart!", cart });
});

// Remove from cart
app.delete('/cart/:productId', (req, res) => {
    cart = cart.filter(item => item.productId !== parseInt(req.params.productId));
    res.json({ message: "Removed from cart!", cart });
});

// Clear cart
app.delete('/cart', (req, res) => {
    cart = [];
    res.json({ message: "Cart cleared!" });
});

module.exports = app;