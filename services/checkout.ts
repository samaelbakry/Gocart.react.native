import { store } from "@/store/store";
import { ShippingAddress } from "@/types/cart";
import * as Linking from "expo-linking";


const API_URL_V1 = process.env.EXPO_PUBLIC_BASE_URL;
const API_URL_V2 = process.env.EXPO_PUBLIC_BASE_URL_VERSION_2;

export async function addCashOrder(
  cartId: string,
  shippingAddress: ShippingAddress
) {
  const token = store.getState().auth.token;
  if (!token) {
  throw new Error("User is not authenticated");
}

  const response = await fetch(`${API_URL_V2}/orders/${cartId}`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      shippingAddress,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

type VisaShippingAddress = Omit<ShippingAddress, "postalCode">;

export async function addVisaOrder(cartId: string,shippingAddress: VisaShippingAddress) {
  const token = store.getState().auth.token;
  const successUrl = Linking.createURL("/screens/payment")
  if (!token) {
  throw new Error("User is not authenticated");
}

  const response = await fetch(
    `${API_URL_V1}/orders/checkout-session/${cartId}?url=${encodeURIComponent(successUrl)}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}