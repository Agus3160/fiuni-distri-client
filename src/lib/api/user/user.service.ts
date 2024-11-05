import { api } from "../../api";
import { ApiResponse, PaginationResponse } from "../../definitions";
import { mapObjectToQueryStringParams } from "../../utils";
import { UserDto, UserFilter } from "./user.types";

const tempHostUrl = "http://localhost:9091/";

export const getAllUsers = async (
  accessToken: string,
  filter: UserFilter
): Promise<ApiResponse<PaginationResponse<UserDto>>> => {
  const query = mapObjectToQueryStringParams(filter);
  return await api<PaginationResponse<UserDto>>("user?" + query, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }, tempHostUrl);
};

export const getUserById = async (id: number, accessToken: string) => {
  return await api<UserDto>("user/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }, tempHostUrl);
}

export const createUser = async (user: UserDto, accessToken: string) => {
  return await api<UserDto>("user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(user),
  }, tempHostUrl);
};

export const updateUser = async (id: number, user: UserDto, accessToken: string) => {
  return await api<UserDto>("user/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(user),
  }, tempHostUrl);
};

export const deleteUserById = async (id: number, accessToken: string) => {
  return await api<UserDto>("user/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }, tempHostUrl);
};