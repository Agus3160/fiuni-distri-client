import { RoleType } from "../../lib/definitions"

export type NavLink = {
  url: string
  name: string
  auth: "auth" | "no-auth" | "both"
  role?: RoleType
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
    url:"puestos",
    name:"Puestos",
    auth:"auth",
    role:"USER"
  },
  {
    url:"empleado",
    name:"Empleados",
    auth:"auth",
    role:"USER"
  },
  {
    url:"user",
    name:"User",
    auth:"auth",
    role:"USER"
  },
  {
    url:"role",
    name:"Role",
    auth:"auth",
    role:"USER"
  },
  {
    url:"beneficio",
    name:"Beneficio",
    auth:"auth",
    //role:"USER"
  },
  {
    url:"about",
    name:"About",
    auth:"both"
  }
]