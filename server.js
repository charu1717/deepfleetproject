// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3005;

app.use(bodyParser.json());
app.use(cors());
// Dummy in-memory data
let productCategories = [];
let gstRates = [];
let products = [];
let sales = [];

// Default route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Routes for Product Categories
app.get('/api/product-categories', (req, res) => {
    res.json(productCategories);
});

app.post('/api/product-categories', (req, res) => {
    const newCategory = req.body;
    productCategories.push(newCategory);
    res.json(newCategory);
});

// Routes for GST Rates
app.get('/api/gst-rates', (req, res) => {
    res.json(gstRates);
});

app.post('/api/gst-rates', (req, res) => {
    const newGSTRate = req.body;
    gstRates.push(newGSTRate);
    res.json(newGSTRate);
});

// Routes for Products
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.json(newProduct);
});

// Routes for Sales
app.get('/api/sales', (req, res) => {
    res.json(sales);
});

app.post('/api/sales', (req, res) => {
    const newSale = req.body;
    // Calculate total price (dummy logic)
    const product = products.find((p) => p.id === newSale.productId);
    const gstRate = gstRates.find((rate) => rate.productCategoryId === product.productCategoryId);
    newSale.totalPrice = product.price + (product.price * gstRate.rate) / 100;
    sales.push(newSale);
    res.json(newSale);
});

// Server listening on PORT
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

