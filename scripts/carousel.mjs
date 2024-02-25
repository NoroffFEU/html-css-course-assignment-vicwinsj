import { getProducts } from "./utils/doFetch.mjs";
import loader from "./utils/loader.mjs";
import { productUrl } from "./common/common.mjs";

function generateCarousel(product) {
  const productContainer = document.createElement("div");
  productContainer.className = "carousel-product";
  const productLink = document.createElement("a");
  const img = document.createElement("img");
  img.src = product.image.url;
  img.onclick = function () {
    productUrl(product);
  };
  const title = document.createElement("p");
  title.className = "product-name medium-font";
  title.innerText = product.title;
  title.onclick = function () {
    productUrl(product);
  };

  const priceContainer = document.createElement("div");
  priceContainer.classList = "prices";

  const price = document.createElement("p");
  price.id = "prices-p";
  price.className = "small-font";
  price.innerText = `$ ${product.price}`;
  price.onclick = function () {
    productUrl(product);
  };

  const discountedPrice = document.createElement("p");
  discountedPrice.id = "prices-p";
  discountedPrice.classList = "discount bold small-font";
  discountedPrice.innerText = `$ ${product.discountedPrice}`;
  discountedPrice.onclick = function () {
    productUrl(product);
  };

  if (product.onSale) {
    price.style.textDecoration = "line-through";
  } else {
    discountedPrice.innerText = "";
  }

  priceContainer.append(price, discountedPrice);

  productContainer.append(productLink, img, title, priceContainer);
  return productContainer;
}

function displayCarousel(products) {
  const carousel = document.getElementById("carousel");
  products.forEach((product) => {
    const generatedCarousel = generateCarousel(product);
    carousel.appendChild(generatedCarousel);
  });
}

async function renderCarousel() {
  loader.show();
  const products = await getProducts();
  displayCarousel(products);
  loader.hide();
}

async function main() {
  await renderCarousel();
}

main();

export default { generateCarousel, displayCarousel, renderCarousel, main };
