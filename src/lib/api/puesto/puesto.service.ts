import { api } from "../../api";
import { PaginationResponse2 } from "../../definitions";
import { CreatePuestoType, PuestoDto, PuestoFilter, UpdatePuestoType } from "./puesto.types";

const tempHostUrl = "http://localhost:9091/";

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
  return await api<PaginationResponse2<PuestoDto>>(
    `puestos`,
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


export const updatePuestoById = async (id: number, puesto: UpdatePuestoType, accessToken: string) => {
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
  