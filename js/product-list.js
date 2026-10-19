import { products } from "./product-data.js";

function viewProduct(id) {
  localStorage.setItem("productId", String(id));
  window.location.href = "product.html";
}

function renderProductCard(product) {
  return `
    <article class="product-card">
      <div class="product-badge">${product.badge}</div>
      <img src="${product.image}" alt="${product.name}" class="product-image" />
      <h3 class="product-title">${product.name}</h3>
      <div class="product-rating">
        <span class="stars">&#9733;&#9733;&#9733;&#9733;&#9734;</span>
        <span class="rating-count">${product.rating}</span>
      </div>
      <div class="product-price">
        <span class="current-price">&#8377;${product.price.toLocaleString("en-IN")}</span>
        <span class="original-price">&#8377;${product.originalPrice.toLocaleString("en-IN")}</span>
        <span class="discount">${product.discount}</span>
      </div>
      <div class="product-description">${product.description}</div>
      <button class="view-details-button" type="button" data-product-id="${product.id}">
        View Details
      </button>
    </article>`;
}

function connectProductDetails(container) {
  container.addEventListener("click", (event) => {
    const button = event.target.closest("[data-product-id]");
    if (button) viewProduct(button.dataset.productId);
  });
}

function renderHomeSections(container) {
  const sections = [...new Set(products.map((product) => product.section))];

  container.innerHTML = sections.map((section) => `
    <section class="product-section">
      <div class="section-header">
        <h2 class="section-title">${section}</h2>
        <a href="products.html" class="view-all">View All</a>
      </div>
      <div class="product-scroll-container">
        ${products.filter((product) => product.section === section).map(renderProductCard).join("")}
      </div>
    </section>`).join("");

  connectProductDetails(container);
}

function matchesCategory(product, category) {
  if (category.toLowerCase() === "all") return true;
  if (category.toLowerCase() === "top offers") {
    return product.section === "Today's Top Offers";
  }
  return product.category.toLowerCase() === category.toLowerCase();
}

function renderCatalog(container) {
  const query = new URLSearchParams(window.location.search);
  const category = query.get("category") || "All";
  const search = query.get("search") || "";

  const visibleProducts = products.filter((product) => {
    const matchesSearch = `${product.name} ${product.description} ${product.category}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory(product, category) && matchesSearch;
  });

  const title = document.getElementById("catalogTitle");
  const count = document.getElementById("catalogCount");
  if (title) title.textContent = search ? `Search: ${search}` : category === "All" ? "All Products" : category;
  if (count) count.textContent = `${visibleProducts.length} products`;

  container.innerHTML = visibleProducts.length
    ? visibleProducts.map(renderProductCard).join("")
    : `<div class="catalog-empty">
        <h2>No products found</h2>
        <p>Choose another category or try a different search.</p>
        <a href="products.html">Show all products</a>
      </div>`;

  connectProductDetails(container);
}

const homeContainer = document.getElementById("home-products");
if (homeContainer) renderHomeSections(homeContainer);

const catalogContainer = document.getElementById("products");
if (catalogContainer) renderCatalog(catalogContainer);
