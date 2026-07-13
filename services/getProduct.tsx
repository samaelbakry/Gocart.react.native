
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

    console.log(data.data)
    return data.data 
  } catch (error) {
    console.log(error);
  }
}