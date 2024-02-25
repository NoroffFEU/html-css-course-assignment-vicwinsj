import { getProducts } from "./utils/doFetch.mjs";
import { addToCart, createCart } from "./utils/cart.mjs";
import loader from "./utils/loader.mjs";
import { productUrl } from "./common/common.mjs";

const femaleFilteringButton = document.getElementById("filter-btn--women");
const maleFilteringButton = document.getElementById("filter-btn--men");
const resetFilteringButton = document.getElementById("filter-btn--reset");

let chosenGender = "";

femaleFilteringButton.addEventListener("click", () => {
  chosenGender = "Female";
  if (chosenGender === "Female") {
    resetFilteringButton.classList = "cta";
    femaleFilteringButton.classList = "cta-blue cta-blue-chosen";
    maleFilteringButton.classList = "cta-blue";
  } else femaleFilteringButton.classList = "cta-blue";
  renderStore();
});
maleFilteringButton.addEventListener("click", () => {
  chosenGender = "Male";
  if (chosenGender === "Male") {
    resetFilteringButton.classList = "cta";
    maleFilteringButton.classList = "cta-blue cta-blue-chosen";
    femaleFilteringButton.classList = "cta-blue";
  } else maleFilteringButton.classList = "cta-blue";
  renderStore();
});
resetFilteringButton.addEventListener("click", () => {
  chosenGender = "";
  if (chosenGender === "") {
    resetFilteringButton.classList = "cta cta-chosen";
    maleFilteringButton.classList = "cta-blue";
    femaleFilteringButton.classList = "cta-blue";
  } else resetFilteringButton.classList = "cta";
  renderStore();
});

function generateProducts(product) {
  const productContainer = document.createElement("div");
  productContainer.className = "jackets";
  const productLink = document.createElement("a");
  const img = document.createElement("img");
  img.src = product.image.url;
  img.onclick = function () {
    productUrl(product);
  };
  const title = document.createElement("h2");
  title.className = "product-name medium-font";
  title.innerText = product.title;
  title.onclick = function () {
    productUrl(product);
  };

  const priceContainer = document.createElement("div");
  priceContainer.className = "prices";

  const price = document.createElement("p");
  price.id = "prices-p";
  price.className = "small-font";
  price.innerText = `$ ${product.price}`;
  price.onclick = function () {
    productUrl(product);
  };

  const discountedPrice = document.createElement("p");
  discountedPrice.id = "prices-p";
  discountedPrice.className = "small-font bold discount";
  discountedPrice.innerText = `$ ${product.discountedPrice}`;
  discountedPrice.onclick = function () {
    productUrl(product);
  };

  if (product.onSale) {
    price.style.textDecoration = "line-through";
  } else {
    discountedPrice.innerText = "";
  }

  const cta = document.createElement("button");
  cta.className = "cta cta-small cta-products";
  cta.innerText = "Add to cart";
  cta.addEventListener("click", () => {
    addToCart(product);
  });
  priceContainer.append(price, discountedPrice);
  productContainer.append(productLink, img, title, priceContainer, cta);
  return productContainer;
}

function displayProducts(products) {
  const listOfProducts = document.getElementById("store");
  listOfProducts.textContent = "";
  products
    .filter((product) => {
      if (product.gender === chosenGender || chosenGender === "") {
        return true;
      }
    })
    .forEach((product) => {
      const generatedProducts = generateProducts(product);
      listOfProducts.appendChild(generatedProducts);
    });
}

async function renderStore() {
  loader.show();
  const products = await getProducts();
  displayProducts(products);
  if (chosenGender === "") {
    resetFilteringButton.classList = "cta cta-chosen";
  }
  loader.hide();
}

async function main() {
  createCart();
  await renderStore();
}

main();
