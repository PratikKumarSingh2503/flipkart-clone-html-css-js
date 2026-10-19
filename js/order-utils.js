// Shared cart and pricing utilities.
window.ShopUtils = (() => {
    const CART_KEY = "cart";
    const DISCOUNT_THRESHOLD = 2000;
    const DISCOUNT_AMOUNT = 500;

    function getCart() {
        try {
            const cart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");

            if (!Array.isArray(cart)) return [];

            return cart.map(item => ({
                ...item,
                price: Number(item.price) || 0,
                qty: Math.max(1, Number.parseInt(item.qty, 10) || 1)
            }));
        } catch {
            return [];
        }
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        window.dispatchEvent(new Event("cart:updated"));
    }

    function getTotals(cart = getCart()) {
        const subtotal = cart.reduce(
            (sum, item) => sum + item.price * item.qty,
            0
        );

        const discount =
            subtotal >= DISCOUNT_THRESHOLD ? DISCOUNT_AMOUNT : 0;

        const delivery = 0;
        const grandTotal = subtotal - discount + delivery;

        return { subtotal, discount, delivery, grandTotal };
    }

    function formatINR(amount) {
        return Number(amount).toLocaleString("en-IN", {
            maximumFractionDigits: 2
        });
    }

    return { getCart, saveCart, getTotals, formatINR };
})();
