// main.js

// Example functions for frontend logic

// Function to fetch product categories
async function fetchProductCategories() {
    try {
        const response = await fetch('http://localhost:3005/api/product-categories');
        if (!response.ok) {
            throw new Error('Failed to fetch product categories');
        }

        const data = await response.json();
        console.log('Product Categories:', data);
        // Update HTML components with the fetched data
    } catch (error) {
        console.error('Error fetching product categories:', error);
    }
}

// Function to fetch products and populate the product dropdown
async function fetchProductsAndPopulateDropdown() {
    try {
        const response = await fetch('http://localhost:3005/api/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();
        const productSelect = document.getElementById('productSelect');

        // Clear existing options
        productSelect.innerHTML = '';

        // Populate dropdown with product options
        products.forEach((product) => {
            const option = document.createElement('option');
            option.value = product.id;
            option.text = product.name;
            productSelect.add(option);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to add a new product category
async function addProductCategory() {
    try {
        const categoryName = document.getElementById('categoryName').value;
        const response = await fetch('http://localhost:3005/api/product-categories', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: categoryName }),
        });

        if (!response.ok) {
            throw new Error('Failed to add product category');
        }

        const newCategory = await response.json();
        console.log('New Product Category:', newCategory);
        // Update HTML components or perform other actions
        refreshDropdowns(); // Refresh dropdowns after adding a new category
    } catch (error) {
        console.error('Error adding product category:', error);
    }
}

// Function to add a new GST rate
async function addGSTRate() {
    try {
        const categoryId = document.getElementById('categorySelect').value;
        const gstRate = document.getElementById('gstRate').value;
        const response = await fetch('http://localhost:3005/api/gst-rates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productCategoryId: categoryId, rate: gstRate }),
        });

        if (!response.ok) {
            throw new Error('Failed to add GST rate');
        }

        const newGSTRate = await response.json();
        console.log('New GST Rate:', newGSTRate);
        // Update HTML components or perform other actions
    } catch (error) {
        console.error('Error adding GST rate:', error);
    }
}

// Function to add a new product
async function addProduct() {
    try {
        const productName = document.getElementById('productName').value;
        const categoryId = document.getElementById('categorySelect').value;
        const productPrice = document.getElementById('productPrice').value;
        const response = await fetch('http://localhost:3005/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: productName, productCategoryId: categoryId, price: productPrice }),
        });

        if (!response.ok) {
            throw new Error('Failed to add product');
        }

        const newProduct = await response.json();
        console.log('New Product:', newProduct);
        // Update HTML components or perform other actions
        refreshDropdowns(); // Refresh dropdowns after adding a new product
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

// Function to add a new sale
async function addSale() {
    try {
        const productId = document.getElementById('productSelect').value;
        const quantity = document.getElementById('quantity').value;
        const response = await fetch('http://localhost:3005/api/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: productId, quantity: quantity }),
        });

        if (!response.ok) {
            throw new Error('Failed to add sale');
        }

        const newSale = await response.json();
        console.log('New Sale:', newSale);
        // Update HTML components or perform other actions
    } catch (error) {
        console.error('Error adding sale:', error);
    }
}

// Function to fetch products and populate the product dropdown
async function fetchProductsAndPopulateDropdown() {
    try {
        const response = await fetch('http://localhost:3005/api/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();
        const productSelect = document.getElementById('productSelect');

        if (!productSelect) {
            console.error('Product dropdown element not found.');
            return;
        }

        // Clear existing options
        productSelect.innerHTML = '';

        // Populate dropdown with product options
        products.forEach((product) => {
            const option = document.createElement('option');
            option.value = product.id;
            option.text = product.name;
            productSelect.add(option);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to refresh product and category dropdowns
async function refreshDropdowns() {
    await fetchProductsAndPopulateDropdown();
}

// Function to initialize the application
async function initializeApp() {
    // Fetch and display initial data
    await refreshDropdowns();
    fetchAndDisplayGSTRates();
    fetchAndDisplayProducts();
    fetchAndDisplaySales();
}

// Initialize the application when the page loads
window.onload = initializeApp;

// Function to fetch and display GST rates
async function fetchAndDisplayGSTRates() {
    try {
        const response = await fetch('http://localhost:3005/api/gst-rates');
        if (!response.ok) {
            throw new Error('Failed to fetch GST rates');
        }

        const gstRates = await response.json();
        const gstRatesList = document.getElementById('gstRatesList');

        // Clear existing content
        gstRatesList.innerHTML = '<h3>GST Rates:</h3>';

        // Display GST rates
        gstRates.forEach((rate) => {
            gstRatesList.innerHTML += `<p>Category: ${rate.productCategoryId}, Rate: ${rate.rate}%</p>`;
        });
    } catch (error) {
        console.error('Error fetching GST rates:', error);
    }
}

// Function to fetch and display products
async function fetchAndDisplayProducts() {
    try {
        const response = await fetch('http://localhost:3005/api/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();
        const productsList = document.getElementById('productsList');

        // Clear existing content
        productsList.innerHTML = '<h3>Products:</h3>';

        // Display products
        products.forEach((product) => {
            productsList.innerHTML += `<p>Name: ${product.name}, Category: ${product.productCategoryId}, Price: ${product.price}</p>`;
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Function to fetch and display sales
async function fetchAndDisplaySales() {
    try {
        const response = await fetch('http://localhost:3005/api/sales');
        if (!response.ok) {
            throw new Error('Failed to fetch sales');
        }

        const sales = await response.json();
        const salesList = document.getElementById('salesList');

        // Clear existing content
        salesList.innerHTML = '<h3>Sales:</h3>';

        // Display sales
        sales.forEach((sale) => {
            salesList.innerHTML += `<p>Product: ${sale.productId}, Quantity: ${sale.quantity}</p>`;
        });
    } catch (error) {
        console.error('Error fetching sales:', error);
    }
}


