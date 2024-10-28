export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  errors: string[] | null;
  httpStatus: number;
  timeStamp: string;
}

export const API_HOST_URL = import.meta.env.VITE_API_HOST_URL;