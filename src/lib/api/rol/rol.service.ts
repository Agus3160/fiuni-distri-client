import { api } from "../../api";
import { API_HOST_URL, PaginationResponse } from "../../definitions";
import { mapObjectToQueryStringParams } from "../../utils";
import { CreateRoleType, RoleDto, RoleFilter } from "./rol.types";

const tempHostUrl = API_HOST_URL;

export const getRolById = async (id: number, accessToken: string) => {
  return await api<RoleDto>(
    "role/" + id,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
    tempHostUrl
  );
};

export const getRoles = async (accessToken: string, filter?: RoleFilter) => {
  const query = mapObjectToQueryStringParams(filter);
  return await api<PaginationResponse<RoleDto>>(
    `role?${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
    tempHostUrl
  );
};

export const createRol = async (rol: CreateRoleType, accessToken: string) => {
  return await api<RoleDto>(
    "role",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(rol),
    },
    tempHostUrl
  );
}

export const deleteRolById = async (id: number, accessToken: string) => {
  return await api<RoleDto>(
    "role/" + id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
    tempHostUrl
  );
}


export const updateRolById = async (id: number, rol: RoleDto, accessToken: string) => {
  return await api<RoleDto>(
    "role/" + id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(rol),
    },
    tempHostUrl
  );
}