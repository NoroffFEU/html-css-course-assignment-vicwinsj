import { RAINY_DAYS_ENDPOINT } from "./common/constants.mjs";
import { addToCart } from "./utils/cart.mjs";

async function getProduct() {
  try {
    let url = new URLSearchParams(window.location.search);
    let id = url.get("id");
    const response = await fetch(`${RAINY_DAYS_ENDPOINT}/${id}`);
    const product = await response.json();
    return product.data;
  } catch (error) {
    console.error("Fetching error:", error.message);
  }
}

async function updatePageTitle() {
  const product = await getProduct();
  document.title = `${product.title} | Rainy Days`;
}

async function renderImage() {
  const product = await getProduct();
  const imageContainer = document.getElementById("product-image");
  let productImage = document.createElement("img");
  productImage.src = product.image.url;
  imageContainer.appendChild(productImage);
}

async function renderTitle() {
  const product = await getProduct();
  const heading = document.getElementById("product-heading");
  heading.innerText = product.title;
}

async function renderPrice() {
  const product = await getProduct();
  const price = document.getElementById("price");
  price.innerText = `$ ${product.price}`;
}

async function renderColor() {
  const product = await getProduct();
  const colorBox = document.getElementById("color-box");
  let color = product.baseColor;
  colorBox.style.backgroundColor = color;
  const colorText = document.getElementById("color-text");
  colorText.innerText = color;
}

async function renderDescription() {
  const product = await getProduct();
  const description = document.getElementById("description");
  description.innerText = product.description;
}

async function addButtons() {
  const product = await getProduct();
  const buyButton = document.getElementById("buy-btn");
  buyButton.addEventListener("click", () => {
    addToCart(product);
  });
  const addToCartButton = document.getElementById("add-btn");
  addToCartButton.addEventListener("click", () => {
    addToCart(product);
  });
}

async function renderContent() {
  updatePageTitle();
  renderImage();
  renderTitle();
  renderPrice();
  renderColor();
  renderDescription();
  addButtons();
}

renderContent();
