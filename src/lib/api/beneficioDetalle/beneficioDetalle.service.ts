import { api } from "../../api";
import { PaginationResponse } from "../../definitions";
import { mapObjectToQueryStringParams } from "../../utils";
import { CreateBeneficioDetalleDto, BeneficioDetalleDto, BeneficioDetalleFilter } from "./beneficioDetalle.types";

const tempHostUrl = "http://localhost:9091/";

// Obtener un BeneficioDetalle por ID
export const getBeneficioDetalleById = async (id: number, accessToken: string) => {
  return await api<BeneficioDetalleDto>(
    "beneficio-detalle/" + id,
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

// Obtener todos los BeneficioDetalle con filtro opcional
export const getAllBeneficioDetalles = async (
  accessToken: string,
  filter?: BeneficioDetalleFilter
) => {
  const query = mapObjectToQueryStringParams(filter);
  return await api<PaginationResponse<BeneficioDetalleDto>>(
    `beneficio-detalle?${query}`,
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

// Eliminar un BeneficioDetalle por ID
export const deleteBeneficioDetalleById = async (id: number, accessToken: string) => {
  return await api<BeneficioDetalleDto>(
    "beneficio-detalle/" + id,
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

// Crear un nuevo BeneficioDetalle
export const createBeneficioDetalle = async (beneficioDetalle: CreateBeneficioDetalleDto, accessToken: string) => {
  return await api<BeneficioDetalleDto>(
    "beneficio-detalle",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(beneficioDetalle)
    },
    tempHostUrl
  );
};

// Actualizar un BeneficioDetalle por ID
export const updateBeneficioDetalleById = async (id: number, beneficioDetalle: CreateBeneficioDetalleDto, accessToken: string) => {
  return await api<BeneficioDetalleDto>(
    "beneficio-detalle/" + id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(beneficioDetalle)
    },
    tempHostUrl
  );
};
