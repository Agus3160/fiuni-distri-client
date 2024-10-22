import { Session } from "./definitions";

export const authLogin = (email: string, password: string) => {
  console.log(email, password);
  return new Promise<Session>((resolve) => {
    setTimeout(() => {
      resolve({ email, token: "123456" });
    }, 1000);
  });
}