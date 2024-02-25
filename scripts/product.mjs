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

async function createProductContent() {
  const product = await getProduct();
  document.title = `${product.title} | Rainy Days`;

  const imageContainer = document.getElementById("product-image");
  const productImage = document.createElement("img");
  productImage.src = product.image.url;
  imageContainer.appendChild(productImage);

  const heading = document.getElementById("product-heading");
  heading.innerText = product.title;

  const price = document.getElementById("price");
  price.innerText = `$ ${product.price}`;

  const discountedPrice = document.getElementById("discounted-price");
  discountedPrice.classList.add = "bold";
  discountedPrice.innerText = `$ ${product.discountedPrice}`;

  const colorBox = document.getElementById("color-box");
  const color = product.baseColor;
  colorBox.style.backgroundColor = color;
  const colorText = document.getElementById("color-text");
  colorText.innerText = color;

  const description = document.getElementById("description");
  description.innerText = product.description;

  const buyButton = document.getElementById("buy-btn");
  buyButton.addEventListener("click", () => {
    addToCart(product);
  });
  const addToCartButton = document.getElementById("add-btn");
  addToCartButton.addEventListener("click", () => {
    addToCart(product);
  });

  if (product.onSale) {
    price.style.textDecoration = "line-through";
  } else {
    discountedPrice.innerText = "";
  }
}

async function renderContent() {
  createProductContent();
}

renderContent();
