export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  errors: string[] | null;
  httpStatus: number;
  timeStamp: string;
}

export interface BaseDto {
  id: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
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
  "page"?: number;
  "size"?: number;
  "include-deleted"?: boolean;
  "start-date"?: string;
  "end-date"?: string;
}

export const baseFilterInitValues: BaseFilter = {
  "page": 0,
  "size": 10,
  "include-deleted": false,
};

export const API_HOST_URL = import.meta.env.VITE_API_HOST_URL;
