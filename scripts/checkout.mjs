import {
  getCart,
  removeFromCart,
  calculateCartTotal,
  clearCartConfirmation,
  addToCart,
} from "./utils/cart.mjs";

import { formatCurrency } from "./utils/formatCurrency.mjs";

let isClearCartButton = false;
let isEmptyText = false;

function createCartSummary(product) {
  const productContainer = document.createElement("div");
  productContainer.id = "cart-summary--product";

  const imageContainer = document.createElement("div");
  imageContainer.className = "cart-product-image";
  const productImage = document.createElement("img");
  productImage.src = product.image.url;

  const productInfo = document.createElement("div");
  productInfo.className = "cart-summary--product--letters";

  const productInfoDiv = document.createElement("div");
  productInfoDiv.id = "product-info-div";

  const productTitle = document.createElement("p");
  productTitle.textContent = product.title;

  const productQuantity = document.createElement("span");
  productQuantity.className = "bold";
  productQuantity.textContent = " x " + product.quantity;

  const productSize = document.createElement("p");
  productSize.textContent = "Size:";

  const actualSize = document.createElement("span");
  actualSize.textContent = " N/A";
  actualSize.className = "bold";

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "adjust-quantity";

  const increaseButton = document.createElement("button");
  increaseButton.classList = "cta quantity-btn";
  increaseButton.textContent = "+";
  increaseButton.addEventListener("click", () => {
    addToCart(product);
    renderCheckoutPage();
  });

  const decreaseButton = document.createElement("button");
  decreaseButton.classList = "cta quantity-btn";
  decreaseButton.textContent = "-";
  decreaseButton.addEventListener("click", () => {
    removeFromCart(product);
    renderCheckoutPage();
  });

  const productPrice = document.createElement("p");
  productPrice.classList = "bold";
  productPrice.textContent =
    "$ " + formatCurrency(product.price * product.quantity);

  productContainer.append(imageContainer, productInfo, productPrice);
  imageContainer.appendChild(productImage);
  productInfo.appendChild(productInfoDiv);
  productInfoDiv.append(productTitle, productSize, buttonDiv);
  productTitle.appendChild(productQuantity);
  productSize.appendChild(actualSize);
  buttonDiv.append(increaseButton, decreaseButton);
  return productContainer;
}

function displayCartContent() {
  const productContainer = document.getElementById("cart-summary--products");
  productContainer.textContent = "";
  const totalTextContainer = document.getElementById("cart-total-text");
  const totalAmountContainer = document.getElementById("cart-total");
  const cart = getCart();

  cart.forEach(function (product) {
    const productContent = createCartSummary(product);
    productContainer.appendChild(productContent);
  });

  const emptyText = document.createElement("p");
  emptyText.textContent = "Cart is empty!";

  const clearCartButton = document.createElement("button");
  clearCartButton.classList = "clearbutton cta medium-font";
  clearCartButton.textContent = "Clear cart";
  clearCartButton.addEventListener("click", () => {
    clearCartConfirmation();
    renderCheckoutPage();
  });

  const total = calculateCartTotal(cart);
  const vatAmount = document.getElementById("vat");
  vatAmount.textContent = "$ " + formatCurrency(total * 0.25);
  const totalAmount = document.getElementById("total");
  totalAmount.textContent = "$ " + formatCurrency(total);

  if (!(cart.length === 0) && !isClearCartButton) {
    totalTextContainer.appendChild(clearCartButton);
    isClearCartButton = true;
  } else if (cart.length === 0 && !isEmptyText) {
    productContainer.appendChild(emptyText);
    isEmptyText = true;
  }

  const orderButton = document.getElementById("cta--cart");
  orderButton.addEventListener("click", () => {
    if (cart.length !== 0) location.href = "checkout-success.html";
    else alert("Cart is empty!");
  });

  totalAmountContainer.append(vatAmount, totalAmount);
}

async function renderCheckoutPage() {
  displayCartContent();
}

function main() {
  renderCheckoutPage();
}

main();
