// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3005;

app.use(bodyParser.json());
app.use(cors());

let productCategories = [];
let gstRates = [];
let products = [];
let sales = [];


app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});


app.get('/api/product-categories', (req, res) => {
    res.json(productCategories);
});

app.post('/api/product-categories', (req, res) => {
    const newCategory = req.body;
    productCategories.push(newCategory);
    res.json(newCategory);
});


app.get('/api/gst-rates', (req, res) => {
    res.json(gstRates);
});

app.post('/api/gst-rates', (req, res) => {
    const newGSTRate = req.body;
    gstRates.push(newGSTRate);
    res.json(newGSTRate);
});


app.get('/api/products', (req, res) => {
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.json(newProduct);
});


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


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

