
const { formatINR } = window.ShopUtils;

let order;

try {
    order = JSON.parse(localStorage.getItem("lastOrder") || "null");
} catch {
    order = null;
}

if (!order || !order.orderId || !Array.isArray(order.items) ||
    order.items.length === 0) {
    document.querySelector(".success-container").innerHTML = `
        <section class="success-card">
            <h1>No completed demo order found</h1>
            <p class="success-message">
                Please add products to your cart and complete the demo
                checkout first.
            </p>
            <div class="success-actions" style="margin-top: 24px;">
                <a class="primary-button" href="products.html">
                    Browse Products
                </a>
                <a class="back-link" href="index.html">Back to Home</a>
            </div>
        </section>
    `;
} else {
    document.getElementById("orderId").textContent = order.orderId;

    document.getElementById("orderDate").textContent =
        new Date(order.createdAt).toLocaleString("en-IN");

    document.getElementById("successItems").innerHTML =
        order.items.map(item => `
            <div class="success-item">
                <span>${item.name} × ${item.qty}</span>
                <strong>₹${formatINR(item.price * item.qty)}</strong>
            </div>
        `).join("");

    document.getElementById("successSubtotal").textContent =
        formatINR(order.subtotal);

    document.getElementById("successDiscount").textContent =
        formatINR(order.discount);

    document.getElementById("successTotal").textContent =
        formatINR(order.total);

    const address = order.address;

    document.getElementById("successAddress").textContent =
        `${address.name}, ${address.address}, ${address.city}, ` +
        `${address.state} - ${address.pincode}. Mobile: ${address.mobile}`;

    document.getElementById("successPayment").textContent =
        order.paymentMethod;
}
