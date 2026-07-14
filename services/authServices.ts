import { LoginFormData, SignupFormData } from "@/schemas/authschema";

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function signupFn(signupData: SignupFormData) {
  try {
    const res = await fetch(`${API_URL}/auth/signup`, {
      method: "post",
      body: JSON.stringify(signupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function loginFn(loginData: LoginFormData) {
  try {
    const res = await fetch(`${API_URL}/auth/signin`, {
      method: "post",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
