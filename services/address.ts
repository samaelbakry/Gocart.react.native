import { store } from "@/store/store";

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function addAddress(name:string , details:string , phone:string , city:string ) {
  const token = store.getState().auth.token;
  if (!token) {
    throw Error("user not logged in");
  }
  try {
    const res = await fetch(`${API_URL}/addresses`, {
      method: "post",
      body: JSON.stringify({ name , details , phone , city }),
      headers: {
        "Content-Type": "application/json",
        token: token,
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    console.log(error);
  }
}

