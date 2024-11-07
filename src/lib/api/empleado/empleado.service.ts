import { api } from "../../api";
import { PaginationResponse } from "../../definitions";
import { mapObjectToQueryStringParams } from "../../utils";
import { CreateEmpleadoDto, EmpleadoDto, EmpleadoFilter } from "./empleado.types";

const tempHostUrl = "http://localhost:9091/";

export const getEmpleadoById = async (id: number, accessToken: string) => {
  return await api<EmpleadoDto>(
    "empleado/" + id,
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

export const getAllEmpleados = async (
  accessToken: string,
  filter?: EmpleadoFilter
) => {
  const query = mapObjectToQueryStringParams(filter);
  return await api<PaginationResponse<EmpleadoDto>>(
    `empleado?${query}`,
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


export const deleteEmpleadoById = async (id: number, accessToken: string) => {
  return await api<EmpleadoDto>(
    "empleado/" + id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
    tempHostUrl
  );
};

export const createEmpleado = async (empleado:CreateEmpleadoDto, accessToken:string) => {
  return await api<EmpleadoDto>(
    "empleado",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(empleado)
    },
    tempHostUrl
  );
}

export const updateEmpleado = async (empleado:CreateEmpleadoDto, accessToken:string) => {
  return await api<EmpleadoDto>(
    "empleado",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(empleado)
    },
    tempHostUrl
  );
}