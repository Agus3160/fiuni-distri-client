import { api } from "../../api";
import { API_HOST_URL, PaginationResponse2 } from "../../definitions";
import { mapObjectToQueryStringParams } from "../../utils";
import { CreatePuestoType, PuestoDto, PuestoFilter } from "./puesto.types";

const tempHostUrl = API_HOST_URL;

export const getPuestoById = async (id: number, accessToken: string) => {
  return await api<PuestoDto>(
    `puestos/${id}`,
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

export const getPuestos = async (accessToken: string, filter?: PuestoFilter) => {
  const query = mapObjectToQueryStringParams(filter);
  return await api<PaginationResponse2<PuestoDto>>(
    `puestos/${query}`,
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


export const createPuesto = async (puesto: CreatePuestoType, accessToken: string) => {
  return await api<PuestoDto>(
    "puestos",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(puesto),
    },
    tempHostUrl
  );
}

export const deletePuestoById = async (id: number, accessToken: string) => {
  return await api<PuestoDto>(
    "puestos/" + id,
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


export const updatePuestoById = async (id: number, puesto: PuestoDto, accessToken: string) => {
  return await api<PuestoDto>(
    `puestos/${id}/update`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(puesto),
    },
    tempHostUrl
  );
}
  