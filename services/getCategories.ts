const API_URL = process.env.EXPO_PUBLIC_BASE_URL

export async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    const data = await response.json();

    return data.data 
  } catch (error) {
    console.log(error);
  }
}