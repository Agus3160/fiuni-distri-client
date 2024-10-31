import { api } from "../api";
import { LoginType, Session, SignUpType } from "./auth.types";

export const authLogin = async ({ email, password }: LoginType) => {
  return await api<Session>("auth/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
};

export const authSignUp = async ({ email, username, password }: SignUpType) => {
  return await api<null>("auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, username, password }),
  });
};

export const authMe = async (accessToken:string) => {
  return await api<Session>("auth/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
  });
};
