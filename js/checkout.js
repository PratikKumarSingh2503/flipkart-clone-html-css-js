const { getCart, getTotals, formatINR } = window.ShopUtils;

const summary = document.getElementById("summary");
const continueButton = document.getElementById("continueButton");

function renderSummary() {
    const cart = getCart();
    summary.innerHTML = "";

    if (cart.length === 0) {
        summary.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add products before checking out.</p>
                <a href="products.html">Browse Products</a>
            </div>
        `;

        document.getElementById("subtotal").textContent = "0";
        document.getElementById("discount").textContent = "0";
        document.getElementById("total").textContent = "0";
        continueButton.disabled = true;
        return;
    }

    cart.forEach(item => {
        summary.innerHTML += `
            <p class="summary-item">
                <span>${item.name} × ${item.qty}</span>
                <strong>₹${formatINR(item.price * item.qty)}</strong>
            </p>
        `;
    });

    const totals = getTotals(cart);

    document.getElementById("subtotal").textContent =
        formatINR(totals.subtotal);
    document.getElementById("discount").textContent =
        formatINR(totals.discount);
    document.getElementById("total").textContent =
        formatINR(totals.grandTotal);

    continueButton.disabled = false;
}

function saveAddress() {
    // Validate the cart again when the button is clicked.
    if (getCart().length === 0) {
        alert("Your cart is empty. Please add a product first.");
        window.location.href = "cart.html";
        return;
    }

    const customer = {
        name: document.getElementById("name").value.trim(),
        mobile: document.getElementById("mobile").value.trim(),
        address: document.getElementById("address").value.trim(),
        city: document.getElementById("city").value.trim(),
        state: document.getElementById("state").value.trim(),
        pincode: document.getElementById("pincode").value.trim()
    };

    if (Object.values(customer).some(value => !value)) {
        alert("Please fill in all address fields.");
        return;
    }

    if (!/^[6-9]\d{9}$/.test(customer.mobile)) {
        alert("Enter a valid 10-digit Indian mobile number.");
        return;
    }

    if (!/^\d{6}$/.test(customer.pincode)) {
        alert("Enter a valid 6-digit pincode.");
        return;
    }

    localStorage.setItem("address", JSON.stringify(customer));
    window.location.href = "payment.html";
}

renderSummary();