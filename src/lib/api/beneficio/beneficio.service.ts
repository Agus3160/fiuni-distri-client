import { api } from "../../api";
import { API_HOST_URL, PaginationResponse } from "../../definitions";
import { mapObjectToQueryStringParams } from "../../utils";
import { CreateBeneficioDto, BeneficioDto, BeneficioFilter } from "./beneficio.types";

const tempHostUrl = API_HOST_URL;

// Obtener un Beneficio por ID
export const getBeneficioById = async (id: number, accessToken: string) => {
  return await api<BeneficioDto>(
    "beneficio/" + id,
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

// Obtener todos los Beneficios con filtro opcional
export const getAllBeneficios = async (
  accessToken: string,
  filter?: BeneficioFilter
) => {
  const query = mapObjectToQueryStringParams(filter);
  return await api<PaginationResponse<BeneficioDto>>(
    `beneficio?${query}`,
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

// Eliminar un Beneficio por ID
export const deleteBeneficioById = async (id: number, accessToken: string) => {
  return await api<BeneficioDto>(
    "beneficio/" + id,
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

// Crear un nuevo Beneficio
export const createBeneficio = async (beneficio: CreateBeneficioDto, accessToken: string) => {
  return await api<BeneficioDto>(
    "beneficio",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(beneficio)
    },
    tempHostUrl
  );
};

// Actualizar un Beneficio por ID
export const updateBeneficioById = async (id: number, beneficio: CreateBeneficioDto, accessToken: string) => {
  return await api<BeneficioDto>(
    "beneficio/" + id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(beneficio)
    },
    tempHostUrl
  );
};
