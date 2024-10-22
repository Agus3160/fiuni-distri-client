
export type NavLink = {
  url: string
  name: string
  auth: "auth" | "no-auth" | "both"
}

export const navLinks: NavLink[] = [
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