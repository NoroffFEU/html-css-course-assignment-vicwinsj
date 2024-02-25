export function createCart() {
  const cart = localStorage.getItem("cart");
  if (!cart) {
    localStorage.setItem("cart", JSON.stringify([]));
  }
}

export function getCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart;
}

export function addToCart(product) {
  const cart = getCart();
  const itemIndex = cart.findIndex(function (currentJacket) {
    if (product.id === currentJacket.id) {
      return true;
    }
    return false;
  });
  if (itemIndex === -1) {
    cart.push({ ...product, quantity: 1 });
  } else {
    cart[itemIndex].quantity += 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function removeFromCart(product) {
  const cart = getCart();
  const productToRemove = product.id;

  const productIndex = cart.findIndex((currentItem) => {
    if (currentItem.id === productToRemove) {
      return true;
    }
    return false;
  });

  if (cart[productIndex].quantity > 1) {
    cart[productIndex].quantity -= 1;
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    const confirmed = confirm(
      "Are you sure you want to remove item from cart?"
    );
    if (confirmed) {
      const updatedCart = cart.filter((_, index) => {
        if (productIndex === index) {
          return false;
        }
        return true;
      });
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  }
}

export function clearCart() {
  const cart = getCart();
  const emptiedCart = [];
  localStorage.setItem("cart", JSON.stringify(emptiedCart));
  return cart;
}

export function clearCartConfirmation() {
  const confirmed = confirm("Are you sure you want to empty cart?");
  if (confirmed) {
    clearCart();
  }
}

export function calculateCartTotal(cart) {
  let total = 0;
  cart.forEach((product) => {
    total += product.price * product.quantity;
  });
  return total;
}
