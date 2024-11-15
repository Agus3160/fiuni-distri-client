import { api } from "../../api";
import { PaginationResponse2 } from "../../definitions";
import { CreateVacanteDetalleType, VacanteDetalleDto } from "./vacanteDetalle.types";




const tempHostUrl ="http://localhost:9092/";

export const getVacanteDetalles = async (accessToken: string, vacante_id: number) => {
    return await api<PaginationResponse2<VacanteDetalleDto>>(
        `vacantes/${vacante_id}/aplicacionVacante`,
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

export const createVacanteDetalle = async (vacanteDetalle: CreateVacanteDetalleType, id_cabecera: number, accessToken: string) => {
    return await api<VacanteDetalleDto>(
        `vacantes/${id_cabecera}/aplicacionVacante`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(vacanteDetalle),
        },
        tempHostUrl
    );
};

export const updateVacanteDetalle = async (id: number,vacanteDetalle: VacanteDetalleDto, id_cabecera: number, accessToken: string) => {
    return await api<VacanteDetalleDto>(
        `/vacantes/${id_cabecera}/aplicacionVacante/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-type": "applicacion/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(vacanteDetalle),
        },
        tempHostUrl
    );
};

export const deleteVacanteDetalleById = async (id: number, id_cabecera: number, accessToken: string) => {
    return await api<VacanteDetalleDto>(
        `/vacantes/${id_cabecera}/aplicacionVacante/${id}`,
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


export const getVacanteDetalleById = async (id_cabecera: number, id:number, accessToken: string) => {
    return await api<VacanteDetalleDto>(
        `vacantes/${id_cabecera}/aplicacionVacante/${id}`,
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