const API_URL = process.env.EXPO_PUBLIC_BASE_URL

export async function getBrands() {
  try {
    const response = await fetch(`${API_URL}/brands`);
    const data = await response.json();

    return data.data 
  } catch (error) {
    console.log(error);
  }
}

export async function getSpecificBrand(id:string) {
  try {
    const response = await fetch(`${API_URL}/brands/${id}`);
    const data = await response.json();
    return data.data 
  } catch (error) {
    console.log(error);
  }
}