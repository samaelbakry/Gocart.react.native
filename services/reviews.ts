import { store } from "@/store/store";

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function CreateReview(
  productId: string,
  review: string,
  rating: number,
) {
  const token = store.getState().auth.token;

  if (!token) throw Error("user must be logged in");
  try {
    const res = await fetch(`${API_URL}/products/${productId}/reviews`, {
      method: "post",
      body: JSON.stringify({ review, rating }),
      headers: {
        "Content-type": "application/json",
        token: token,
      },
    });
    const data = await res.json();
    console.log(data , 'reviewsdata')
    return data
  } catch (error) {
    console.log(error);
  }
}


export async function getProductReviews(productId: string) {
  const token = store.getState().auth.token;

  const res = await fetch(`${API_URL}/products/${productId}/reviews`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { token } : {}),
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch reviews");
  }

  return data;
}