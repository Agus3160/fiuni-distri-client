import { api } from "../../api";
import { API_HOST_URL, PaginationResponse2 } from "../../definitions";
import { mapObjectToQueryStringParams } from "../../utils";
import { CreateVacanteType, VacanteDto, VacanteFilter } from "./vacante.types";


const tempHostUrl = API_HOST_URL;


export const deleteVacanteById = async(id: number, accessToken: string) =>{
    return await api<VacanteDto>(
        "vacantes/" + id,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "aplication/json",
                Authorization: `Bearer ${accessToken}`,
            },
        },
        tempHostUrl
    );
};

export const getVacantes = async (accessToken: string, filter?: VacanteFilter) => {
    const query = mapObjectToQueryStringParams(filter);
    return await api<PaginationResponse2<VacanteDto>>(
        `vacantes/${query}`,
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

export const updateVacanteById = async (id: number, vacante: VacanteDto, accessToken: string) => {
    return await api<VacanteDto>(
        `vacantes/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(vacante),
        },
        tempHostUrl
    );
};

export const createVacante = async (vacante: CreateVacanteType, accessToken: string) => {
    return await api<VacanteDto>(
        "vacantes",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(vacante),
        },
        tempHostUrl
    );
};


export const getVacanteById = async (id: number, accessToken: string) => {
    return await api<VacanteDto>(
        `vacantes/${id}`,
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