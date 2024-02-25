import { getProducts } from "./utils/doFetch.mjs";
import loader from "./utils/loader.mjs";
import { productUrl } from "./common/common.mjs";

function generateCarousel(product) {
  const productContainer = document.createElement("div");
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
  const price = document.createElement("p");
  price.className = "small-font";
  price.innerText = `$ ${product.price}`;
  price.onclick = function () {
    productUrl(product);
  };
  productContainer.append(productLink, img, title, price);
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
  // loader.show();
  const products = await getProducts();
  displayCarousel(products);
  // loader.hide();
}

async function main() {
  await renderCarousel();
}

main();

export default { generateCarousel, displayCarousel, renderCarousel, main };
