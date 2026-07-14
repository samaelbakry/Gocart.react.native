const API_URL = process.env.EXPO_PUBLIC_BASE_URL

export async function getAllProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();

    return data.data 
  } catch (error) {
    console.log(error);
  }
}

export async function getSpecificProduct(id:string) {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    const data = await response.json();
    return data.data 
  } catch (error) {
    console.log(error);
  }
}

export async function getBrands() {
  try {
    const response = await fetch(`${API_URL}/brands`);
    const data = await response.json();

    return data.data 
  } catch (error) {
    console.log(error);
  }
}

export async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    const data = await response.json();

    return data.data 
  } catch (error) {
    console.log(error);
  }
}