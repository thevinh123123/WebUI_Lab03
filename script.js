$(document).ready(function() {
    $('fetchProducts').click(function(){ // Tải sản phẩm khi trang được tải
        $(this).hide();
    });
});

// Danh sách sản phẩm
let products = [];

// Giỏ hàng (lấy từ Local Storage, Session Storage hoặc Cookies)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Hàm lọc sản phẩm theo giá
function filterProductsByPrice(minPrice, maxPrice) {
    const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
    displayFilteredProducts(filteredProducts);
}

// Hàm hiển thị danh sách sản phẩm đã lọc
function displayFilteredProducts(filteredProducts) {
    const productList = document.getElementById('products');
    productList.innerHTML = '';

    filteredProducts.forEach(product => {
        // Tạo các phần tử HTML và hiển thị sản phẩm
    });
}

// Hàm lọc sản phẩm theo tên
function filterProductsByName(keyword) {
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));
    displayFilteredProducts(filteredProducts);
}

//Thêm sản phẩm vào giỏ hàng
function addToCart(productId) {
    const productToAdd = products.find(product => product.id === productId);
    if (productToAdd) {
        cart.push(productToAdd);
        saveCartToLocalStorage();
        updateCartUI();
    }
}

//Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {
    cart = cart.filter(product => product.id !== productId);
    saveCartToLocalStorage();
    updateCartUI();
}

//Sửa số lượng sản phẩm trong giỏ hàng
function updateCartItemQuantity(productId, quantity) {
    const productToUpdate = cart.find(product => product.id === productId);
    if (productToUpdate) {
        productToUpdate.quantity = quantity;
        saveCartToLocalStorage();
        updateCartUI();
    }
}

//Sử dụng Local Storage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
        cart = JSON.parse(cartData);
        updateCartUI();
    }
}

// Hàm gọi API và hiển thị sản phẩm trên trang chủ
async function fetchProductsFromAPI() {
    try {
        const response = await fetch('URL_API_PRODUCTS');
        const data = await response.json();
        displayProducts(data);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
