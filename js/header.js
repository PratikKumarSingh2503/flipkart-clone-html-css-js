function updateCartBadge() {
  const badge = document.querySelector(".cart-count");
  if (!badge) return;

  let cart = [];
  try {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (Array.isArray(savedCart)) cart = savedCart;
  } catch {
    cart = [];
  }

  const count = cart.reduce((total, item) => total + Math.max(1, Number(item.qty) || 1), 0);
  if (badge.textContent !== String(count)) badge.textContent = count;
  badge.setAttribute("aria-label", `${count} items in cart`);
}

function connectHeaderSearch() {
  const input = document.querySelector(".search-input");
  if (!input) return;

  const form = input.closest("form");
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!input.value.trim()) return;
    window.location.href = `products.html?search=${encodeURIComponent(input.value.trim())}`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const placeholder = document.getElementById("header-placeholder");

  const initializeHeader = () => {
    updateCartBadge();
    connectHeaderSearch();
  };

  if (placeholder) {
    fetch("component/header.html")
      .then((response) => {
        if (!response.ok) throw new Error("Header could not be loaded.");
        return response.text();
      })
      .then((html) => {
        placeholder.innerHTML = html;
        initializeHeader();
      })
      .catch((error) => console.error(error));
  } else {
    initializeHeader();
  }

  window.addEventListener("cart:updated", updateCartBadge);
  window.addEventListener("storage", updateCartBadge);
  new MutationObserver(updateCartBadge).observe(document.body, { childList: true, subtree: true });
});
