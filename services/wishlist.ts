import { store } from "@/store/store";

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function getLoggedUserWishlist() {
  const token = store.getState().auth.token;

  if (!token) throw Error("user not logged in");

  try {
    const res = await fetch(`${API_URL}/wishlist`, {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function addProductToWishlist(productId: string) {
  const token = store.getState().auth.token;

  if (!token) throw Error("user not logged in");

  try {
    const res = await fetch(`${API_URL}/wishlist`, {
      method: "post",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",

        token: token,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function removeUserWishlist(productId: string) {
  const token = store.getState().auth.token;

  if (!token) throw Error("user not logged in");

  try {
    const res = await fetch(`${API_URL}/wishlist/${productId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
