const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function getLoggedUserOrders(userId:string) {
  try {
    const res = await fetch(`${API_URL}/orders/user/${userId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}