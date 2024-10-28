import { ApiResponse, API_HOST_URL } from "./definitions";

export const api = async <T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> => {
  const response = await fetch(`${API_HOST_URL}${url}`, options);
  const data = await response.json();
  return data as ApiResponse<T>;
};