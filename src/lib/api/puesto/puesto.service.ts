import { api } from "../../api";
import { PaginationResponse } from "../../definitions";
import { mapObjectToQueryStringParams } from "../../utils";
import { createPuestoType, PuestoDto, PuestoFilter } from "./puesto.types";

const tempHostUrl = "http://localhost:9091/";

export const getPuestoById = async (id: number, accessToken: string) => {
    return await api<PuestoDto>(
      "puestos/" + id,
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
    return await api<PaginationResponse<PuestoDto>>(
      `puestos?${query}`,
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


  export const createPuesto = async (puesto: createPuestoType, accessToken: string) => {
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
  