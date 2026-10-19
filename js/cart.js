const { getCart, saveCart, getTotals, formatINR } = window.ShopUtils;

let cart = getCart();

const cartItems = document.getElementById("cartItems");

function displayCart() {
    cart = getCart();
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <h2>Your cart is empty</h2>
                <p>Add products before proceeding to checkout.</p>
                <a href="products.html">Explore Products</a>
            </div>
        `;
    }

    cart.forEach((item, index) => {
        cartItems.innerHTML += `
            <div class="cart-card">
                <img src="${item.image}" alt="${item.name}">

                <div class="cart-info">
                    <h2>${item.name}</h2>
                    <h3>₹${formatINR(item.price)}</h3>

                    <div class="qty">
                        <button onclick="decrease(${index})">−</button>
                        <span>${item.qty}</span>
                        <button onclick="increase(${index})">+</button>
                    </div>

                    <button class="remove" onclick="removeItem(${index})">
                        Remove
                    </button>
                </div>
            </div>
        `;
    });

    saveCart(cart);

    const totals = getTotals(cart);
    const totalQuantity = cart.reduce((sum, item) => sum + item.qty, 0);

    document.getElementById("totalItems").textContent = totalQuantity;
    document.getElementById("totalPrice").textContent =
        formatINR(totals.subtotal);
    document.getElementById("discount").textContent =
        `-₹${formatINR(totals.discount)}`;
    document.getElementById("grandTotal").textContent =
        formatINR(totals.grandTotal);

    document.getElementById("checkoutButton").disabled = cart.length === 0;
}

function increase(index) {
    if (!cart[index]) return;
    cart[index].qty++;
    saveCart(cart);
    displayCart();
}

function decrease(index) {
    if (!cart[index]) return;

    if (cart[index].qty > 1) {
        cart[index].qty--;
        saveCart(cart);
        displayCart();
    }
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart(cart);
    displayCart();
}

function checkout() {
    if (getCart().length === 0) {
        alert("Your cart is empty. Please add a product first.");
        return;
    }

    window.location.href = "checkout.html";
}

displayCart();