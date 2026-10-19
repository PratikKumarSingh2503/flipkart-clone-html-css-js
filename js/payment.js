
const { getCart, getTotals, formatINR } = window.ShopUtils;

const cart = getCart();
let address;

try {
    address = JSON.parse(localStorage.getItem("address") || "null");
} catch {
    address = null;
}

// Do not allow payment without a cart and address.
if (cart.length === 0) {
    alert("Your cart is empty. Please add a product first.");
    window.location.replace("products.html");
} else if (!address || !address.name || !address.mobile ||
           !address.address || !address.city || !address.state ||
           !address.pincode) {
    alert("Please enter your delivery address first.");
    window.location.replace("checkout.html");
} else {
    renderPaymentSummary();
}

function renderPaymentSummary() {
    const totals = getTotals(cart);
    const itemsContainer = document.getElementById("paymentItems");

    itemsContainer.innerHTML = cart.map(item => `
        <div class="payment-item">
            <span>${item.name} × ${item.qty}</span>
            <strong>₹${formatINR(item.price * item.qty)}</strong>
        </div>
    `).join("");

    document.getElementById("paymentSubtotal").textContent =
        formatINR(totals.subtotal);

    document.getElementById("paymentDiscount").textContent =
        formatINR(totals.discount);

    document.getElementById("paymentTotal").textContent =
        formatINR(totals.grandTotal);

    document.getElementById("deliveryAddress").textContent =
        `${address.name}, ${address.address}, ${address.city}, ` +
        `${address.state} - ${address.pincode}. Mobile: ${address.mobile}`;
}

document.getElementById("paymentForm").addEventListener("submit", event => {
    event.preventDefault();

    // Recheck immediately before placing the demo order.
    const currentCart = getCart();

    if (currentCart.length === 0) {
        alert("Your cart is empty. Please add products first.");
        window.location.href = "products.html";
        return;
    }

    let currentAddress;

    try {
        currentAddress = JSON.parse(localStorage.getItem("address") || "null");
    } catch {
        currentAddress = null;
    }

    if (!currentAddress || !currentAddress.name ||
        !currentAddress.address || !currentAddress.pincode) {
        alert("Your delivery address is missing. Please enter it again.");
        window.location.href = "checkout.html";
        return;
    }

    const selectedMethod = document.querySelector(
        'input[name="paymentMethod"]:checked'
    );

    if (!selectedMethod) {
        alert("Please select a payment method.");
        return;
    }

    const totals = getTotals(currentCart);

    const order = {
        orderId: `FK${Date.now().toString().slice(-8)}`,
        createdAt: new Date().toISOString(),
        items: currentCart,
        address: currentAddress,
        paymentMethod: selectedMethod.value,
        subtotal: totals.subtotal,
        discount: totals.discount,
        delivery: totals.delivery,
        total: totals.grandTotal,
        status: "Demo order placed"
    };

    try {
        // Save the order before clearing the cart.
        localStorage.setItem("lastOrder", JSON.stringify(order));
        localStorage.removeItem("cart");

        window.location.href = "success.html";
    } catch (error) {
        alert("Could not save your demo order. Please try again.");
        console.error("Order storage failed:", error);
    }
});
