
export type NavLink = {
  url: string
  name: string
  auth: "auth" | "no-auth" | "both"
}

export const navLinks: NavLink[] = [
  {
    url:"signup",
    name:"Signup",
    auth:"no-auth"
  },
  {
    url:"login",
    name:"Login",
    auth:"no-auth"
  },
  {
    url:"about",
    name:"About",
    auth:"both"
  }
]