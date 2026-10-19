import { products } from "./product-data.js";

function renderProductDetail(container) {
  const selectedProductId = Number(localStorage.getItem("productId"));
  const product = products.find((item) => item.id === selectedProductId);

  if (!product) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Product not found</h2>
        <p>Please select a product from the catalog.</p>
        <a href="products.html">Browse products</a>
      </div>`;
    return;
  }

  container.innerHTML = `
    <article class="product-detail-content">
      <div class="product-detail-image-wrap">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-detail-info">
        <a class="detail-back-link" href="products.html">&larr; Back to products</a>
        <span class="detail-category">${product.category}</span>
        <h1>${product.name}</h1>
        <div class="detail-rating">&#9733; ${product.rating} <span>Customer rating</span></div>
        <div class="detail-price">&#8377;${product.price.toLocaleString("en-IN")}</div>
        <p class="detail-old-price">
          &#8377;${product.originalPrice.toLocaleString("en-IN")}
          <span>${product.discount}</span>
        </p>
        <p class="detail-description">${product.description}</p>
        <button class="detail-add-button" id="addToCartButton" type="button">
          Add to Cart
        </button>
      </div>
    </article>`;

  document.getElementById("addToCartButton").addEventListener("click", () => {
    let cart;
    try {
      cart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (!Array.isArray(cart)) cart = [];
    } catch {
      cart = [];
    }

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.qty = (Number(existingItem.qty) || 1) + 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cart:updated"));
    alert("Product added to cart.");
  });
}

const detailContainer = document.getElementById("detail");
if (detailContainer) renderProductDetail(detailContainer);
