const API_URL = process.env.EXPO_PUBLIC_BASE_URL;

export async function forgetPassFn(email: string) {
  const res = await fetch(`${API_URL}/auth/forgotPasswords`, {
    method: "post",
    body: JSON.stringify({ email }),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed");
  }
  
  return data;
}

export async function verifyResetCodefn(resetCode: string) {
  const res = await fetch(`${API_URL}/auth/verifyResetCode`, {
    method: "post",
    body: JSON.stringify({ resetCode }),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed");
  }
  
  return data;
}

export async function resetPasswordfn(email: string , newPassword:string) {
  const res = await fetch(`${API_URL}/auth/resetPassword`, {
    method: "put",
    body: JSON.stringify({ email , newPassword }),
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed");
  }
  
  return data;
}
