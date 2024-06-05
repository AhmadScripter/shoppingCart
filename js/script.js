
let cartCount = 0;

// Function to toggle the display of the cart
function toggleDisplay() {
    var element = document.querySelector('.right-container');
    if (window.getComputedStyle(element).display === 'none') {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

// Product list
let productList = [
    {
        id: 1,
        product_image: 'product-5.jpg',
        product_name: 'Branded Shoes',
        product_price: 50
    },
    {
        id: 2,
        product_image: 'product-6.jpg',
        product_name: 'Black Printed T-Shirt',
        product_price: 60
    },
    {
        id: 3,
        product_image: 'product-7.jpg',
        product_name: 'Socks',
        product_price: 10
    },
    {
        id: 4,
        product_image: 'product-8.jpg',
        product_name: 'Fossil Black Watch',
        product_price: 65
    },
    {
        id: 5,
        product_image: 'product-9.jpg',
        product_name: 'RoadSter Black Watch',
        product_price: 40
    },
    {
        id: 6,
        product_image: 'product-10.jpg',
        product_name: 'Black Joggers',
        product_price: 60
    },
    {
        id: 7,
        product_image: 'product-11.jpg',
        product_name: 'Grey Joggers',
        product_price: 70
    },
    {
        id: 8,
        product_image: 'product-12.jpg',
        product_name: 'Black Trouser',
        product_price: 40
    },
];

let productContainer = document.querySelector('.product-content');

function pushProductList() {
    productList.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add("product-box");
        newDiv.innerHTML = `
            <div class="product-image">
                <img src="images/${value.product_image}" alt="${value.product_name}">
            </div>
            <div class="product-desc">
                <h4 class="product-list">${value.product_name}</h4>
                <p class="price">$ ${value.product_price}.00</p>
            </div>
            <button class="add-cart" onclick="addToCart(${key})">
                Add to cart
            </button>
        `;
        productContainer.appendChild(newDiv);
    });
}

pushProductList();

let cartList = [];

// Add items to cart list
function addToCart(key) {
    if (cartList[key] == null) {
        cartList[key] = JSON.parse(JSON.stringify(productList[key]));
        cartList[key].quantity = 1; // Default value of quantity when item is added to cart
    } else {
        cartList[key].quantity += 1;
    }
    cartCount++;
    updateCartCount();
    reloadCart();
}

// Update the cart item count
function updateCartCount() {
    document.querySelector('.cart-icon span').innerText = cartCount;
}

// Reload cart content
function reloadCart() {
    const cartContent = document.querySelector('.cart-content');
    cartContent.innerHTML = '';
    let totalPrice = 0;
    cartList.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.product_price * value.quantity;

            var cartShopBox = document.createElement('div');
            cartShopBox.classList.add('cart-box');

            cartShopBox.innerHTML = `
                <img class="cart-img" src="images/${value.product_image}" alt="${value.product_name}">
                <div class="detail-box">
                    <div class="cart-product-title">${value.product_name}</div>
                    <div class="cart-price">$${(value.product_price * value.quantity).toFixed(2)}</div>
                    <div class="product-quantity">
                        <button onclick="changeQuantity(${key}, ${value.quantity - 1})"><i class="fa-solid fa-minus"></i></button>
                        <div class="count-quantity">${value.quantity}</div>
                        <button onclick="changeQuantity(${key}, ${value.quantity + 1})"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>
                <i class="fa-solid fa-trash-can cart-remove" onclick="removeCartItem(event, ${key})"></i>
            `;
            // Add the item data to cart list and show it
            cartContent.appendChild(cartShopBox);
        }
    });
    // Change the total price of all items in the cart
    document.getElementsByClassName('total-price')[0].innerText = "$" + totalPrice.toFixed(2);
}

// Remove items from cart list
window.removeCartItem = function(event, key) {
    var buttonClicked = event.target;
    var item = cartList[key];
    if (item) {
        cartCount -= item.quantity;
        cartList[key] = null;
        updateCartCount();
        reloadCart();
    }
}

// Change quantity and price of each item
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        cartCount -= cartList[key].quantity;
        cartList[key] = null;
    } else {
        cartCount += (quantity - cartList[key].quantity);
        cartList[key].quantity = quantity;
        cartList[key].product_price = productList[key].product_price;
    }
    updateCartCount();
    reloadCart();
}

// Buy Button Function
document.getElementsByClassName('btn-buy')[0].addEventListener('click', () => {
    alert('buy successfully');
    // Delete the item display in the cart
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    // Set cart list to empty
    cartList = [];
    cartCount = 0;
    updateCartCount();
    // Set total price to default
    document.getElementsByClassName('total-price')[0].innerText = "$" + 0;
});
