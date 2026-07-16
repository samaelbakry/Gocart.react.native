import { store } from "@/store/store";

const API_URL = process.env.EXPO_PUBLIC_BASE_URL_VERSION_2;

export async function addProductToCart(productId: string) {
  const token = store.getState().auth.token;
  if (!token) {
    throw Error("user not logged in");
  }
  try {
    const res = await fetch(`${API_URL}/cart`, {
      method: "post",
      body: JSON.stringify({ productId }),
      headers: {
        "Content-Type": "application/json",
        token: token,
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function getLoggedUserCart () {
  const token = store.getState().auth.token;
  if (!token) {
    throw Error("user not logged in");
  }
  try {
    const res = await fetch(`${API_URL}/cart`, {
      method:"get",
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
export async function clearUserCart () {
  const token = store.getState().auth.token;
  if (!token) {
    throw Error("user not logged in");
  }
  try {
    const res = await fetch(`${API_URL}/cart`, {
      method:"delete",
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

export async function updateCartProductQuantity (productId:string , count:number) {
  const token = store.getState().auth.token;
  if (!token) {
    throw Error("user not logged in");
  }
  try {
    const res = await fetch(`${API_URL}/cart/${productId}`, {
      method:"put",
      body:JSON.stringify({"count" : count}),
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
export async function removeProductFromCart(productId:string ) {
  const token = store.getState().auth.token;
  if (!token) {
    throw Error("user not logged in");
  }
  try {
    const res = await fetch(`${API_URL}/cart/${productId}`, {
      method:"delete",
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
