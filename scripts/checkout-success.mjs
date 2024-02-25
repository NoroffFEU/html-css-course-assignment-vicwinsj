import { getCart, calculateCartTotal, clearCart } from "./utils/cart.mjs";

function checkoutSuccessText() {
  const cart = getCart();
  const paymentConfirmation = document.getElementById("amount-paid");
  paymentConfirmation.innerText = `You've successfully paid $ ${calculateCartTotal(
    cart
  )}!`;
}

function createOrderSummary(product) {
  const orderSummaryDiv = document.createElement("order-summary-div");
  const productTitle = document.createElement("p");
  productTitle.textContent = product.title;
  const productQuantity = document.createElement("span");
  productQuantity.className = "bold";
  productQuantity.textContent = " x " + product.quantity;
  productTitle.appendChild(productQuantity);
  orderSummaryDiv.append(productTitle);
  return orderSummaryDiv;
}

function displayOrderSummary() {
  const orderSummaryContainer = document.getElementById("order-summary");
  const cart = getCart();
  cart.forEach(function (product) {
    const orderContent = createOrderSummary(product);
    orderSummaryContainer.appendChild(orderContent);
  });
}

function main() {
  checkoutSuccessText();
  displayOrderSummary();
  clearCart();
}

main();
