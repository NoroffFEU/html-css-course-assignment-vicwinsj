export function productUrl(product) {
  const productUrl = `/product.html?id=${product.id}`;
  window.location.href = productUrl;
}
