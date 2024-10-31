import { api } from "../../api";
import { PaginationResponse } from "../../definitions";
import { mapObjectToQueryStringParams } from "../../utils";
import { RoleDto, RoleFilter } from "./rol.types";

const tempHostUrl = "http://localhost:9091/";

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
