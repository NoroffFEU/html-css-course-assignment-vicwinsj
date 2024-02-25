import { RAINY_DAYS_ENDPOINT } from "../common/constants.mjs";

export async function getProducts() {
  try {
    const response = await fetch(`${RAINY_DAYS_ENDPOINT}`);
    const productsResponse = await response.json();
    const products = productsResponse.data;
    return products;
  } catch (error) {
    console.error("Fetching error:", error.message);
  }
}
