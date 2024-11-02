import { Bounce, ToastContainerProps } from "react-toastify";
import { z } from "zod";

//*********************  API CONFIG **************************
export const API_HOST_URL = import.meta.env.VITE_API_HOST_URL;

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  errors: string[] | null;
  httpStatus: number;
  timeStamp: string;
}

export interface PageProps {
  size: number;
  number: number;
  totalElements: number;
  totalPages: number;
}

export interface PaginationResponse<T> {
  content: T[];
  page: PageProps;
}

export interface BaseFilter {
  page?: number;
  size?: number;
  "include-deleted"?: boolean;
  "start-date"?: string;
  "end-date"?: string;
}

export const baseDtoSchema = z.object({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullable(),
})
export type BaseDto = z.infer<typeof baseDtoSchema>;


//********************* ROLES CONFIG **************************
export const roles = ["ADMIN", "USER"] as const;
export type RoleType = (typeof roles)[number];


//*******************  TOASTIFY CONFIG ************************ 
export const toastConfig: ToastContainerProps = {
  position: "top-right",
  autoClose: 3000,
  limit: 3,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: false,
  pauseOnHover: true,
  theme: "dark",
  transition: Bounce,
};
