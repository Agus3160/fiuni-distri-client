import { api } from "../../api";
import { PaginationResponse } from "../../definitions";
import { mapObjectToQueryStringParams } from "../../utils";
import { EvaluacionDetalleDtoType } from "../evaluacion-detalle/evaluacion-detalle.types";
import {
  CreateEvaluacionType,
  EditEvaluacionDto,
  EvaluacionDtoType,
  EvaluacionFilter,
  EvaluacionWithShortDetallesType,
} from "./evaluacion.types";

const tempHostUrl = "http://localhost:9095/";

export const getAllEvaluaciones = async (
  filter: EvaluacionFilter,
  accessToken: string
) => {
  const query = mapObjectToQueryStringParams(filter);
  return await api<PaginationResponse<EvaluacionDtoType>>(
    "evaluacion?" + query,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
    tempHostUrl
  );
};

export const editEvaluacionById = async (id: number, evaluacion: EditEvaluacionDto, accessToken: string) => {
  
  return await api<null>(
    "evaluacion/" + id,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evaluacion),
    },
    tempHostUrl
  );

}

export const deleteEvaluacionById = async (id: number, accessToken: string) => {
  return await api<null>(
    "evaluacion/" + id,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
    tempHostUrl
  );
}

export const getEvaluacionById = async (id: number, accessToken: string) => {
  return await api<EvaluacionWithShortDetallesType>(
    "evaluacion/" + id,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
    tempHostUrl
  );
};

export const createEvaluacion = async (
  evaluacion: CreateEvaluacionType,
  accessToken: string
) => {
  return await api<null>(
    "evaluacion/detalle",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...evaluacion,
        criterios: evaluacion.criterios.map((c) => c.criterio),
      }),
    },
    tempHostUrl
  );
};

export const getEvaluacionDetalleById = async (
  id: number,
  accessToken: string
) => {
  return await api<EvaluacionDetalleDtoType>(
    "evaluacion-detalle/" + id,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
    tempHostUrl
  );
};

export const updateEvalucacionDetalleById = async (
  id: number,
  detalle: EvaluacionDetalleDtoType,
  accessToken: string
) => {
  return await api<EvaluacionDetalleDtoType>(
    "evaluacion-detalle/" + id,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(detalle),
    },
    tempHostUrl
  );
};

export const getEvaluacionDetallesByEvaluacionId = async (
  id: number,
  accessToken: string
) => {
  return await api<PaginationResponse<EvaluacionDetalleDtoType>>(
    "evaluacion-detalle?evaluacion_id=" + id,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
    tempHostUrl
  );
};


export const deleteEvaluacionDetalleById = async (
  id: number,
  accessToken: string
) => {
  return await api<EvaluacionDetalleDtoType>(
    "evaluacion-detalle/" + id,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    },
    tempHostUrl
  );
};