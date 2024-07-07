"use server";

import { signIn, signOut } from "@/config/nextAuth";

export async function login(provider: any) {
  await signIn(provider, { redirectTo: "/user" });
}
export async function performLogin(values: {
  email: string;
  password: string;
}) {
  try {
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    return result;
  } catch (error: any) {
    console.error("Login error:", error.message);
    throw error.message;
  }
}

export async function logOut() {
  await signOut().then(() => {
    window.location.href = "/user";
    window.location.reload();
  });
}
