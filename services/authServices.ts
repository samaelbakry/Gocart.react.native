import { LoginFormData, SignupFormData } from "@/schemas/authschema";

const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function signupFn(signupData: SignupFormData) {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "post",
    body: JSON.stringify(signupData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Register failed");
  }
  return data;
}

export async function loginFn(loginData: LoginFormData) {
  const res = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });

  const data = await res.json();
  console.log(data)

  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}
