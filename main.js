
async function fetchProductCategories() {
    try {
        const response = await fetch('http://localhost:3005/api/product-categories');
        if (!response.ok) {
            throw new Error('Failed to fetch product categories');
        }

        const data = await response.json();
        console.log('Product Categories:', data);
        
    } catch (error) {
        console.error('Error fetching product categories:', error);
    }
}


async function fetchProductsAndPopulateDropdown() {
    try {
        const response = await fetch('http://localhost:3005/api/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();
        const productSelect = document.getElementById('productSelect');

  
        productSelect.innerHTML = '';

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
        
        refreshDropdowns(); 
    } catch (error) {
        console.error('Error adding product category:', error);
    }
}

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
        
    } catch (error) {
        console.error('Error adding GST rate:', error);
    }
}

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
        
        refreshDropdowns();
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

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
        
    } catch (error) {
        console.error('Error adding sale:', error);
    }
}


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


        productSelect.innerHTML = '';

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


async function refreshDropdowns() {
    await fetchProductsAndPopulateDropdown();
}

async function initializeApp() {

    await refreshDropdowns();
    fetchAndDisplayGSTRates();
    fetchAndDisplayProducts();
    fetchAndDisplaySales();
}


window.onload = initializeApp;

async function fetchAndDisplayGSTRates() {
    try {
        const response = await fetch('http://localhost:3005/api/gst-rates');
        if (!response.ok) {
            throw new Error('Failed to fetch GST rates');
        }

        const gstRates = await response.json();
        const gstRatesList = document.getElementById('gstRatesList');


        gstRatesList.innerHTML = '<h3>GST Rates:</h3>';

        gstRates.forEach((rate) => {
            gstRatesList.innerHTML += `<p>Category: ${rate.productCategoryId}, Rate: ${rate.rate}%</p>`;
        });
    } catch (error) {
        console.error('Error fetching GST rates:', error);
    }
}

async function fetchAndDisplayProducts() {
    try {
        const response = await fetch('http://localhost:3005/api/products');
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const products = await response.json();
        const productsList = document.getElementById('productsList');


        productsList.innerHTML = '<h3>Products:</h3>';

       
        products.forEach((product) => {
            productsList.innerHTML += `<p>Name: ${product.name}, Category: ${product.productCategoryId}, Price: ${product.price}</p>`;
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

async function fetchAndDisplaySales() {
    try {
        const response = await fetch('http://localhost:3005/api/sales');
        if (!response.ok) {
            throw new Error('Failed to fetch sales');
        }

        const sales = await response.json();
        const salesList = document.getElementById('salesList');

        
        salesList.innerHTML = '<h3>Sales:</h3>';

       
        sales.forEach((sale) => {
            salesList.innerHTML += `<p>Product: ${sale.productId}, Quantity: ${sale.quantity}</p>`;
        });
    } catch (error) {
        console.error('Error fetching sales:', error);
    }
}


