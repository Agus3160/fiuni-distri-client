import { VacanteDetalleDto } from "../../lib/api/Vacante/vacanteDetalle.types";
import { PaginationResponse2 } from "../../lib/definitions";
import VacanteDetalleCard from "./VacanteDetalleCard";


type Props = {
    vacantesDetalles: PaginationResponse2<VacanteDetalleDto>;
    setVacantesDetalles: (data: PaginationResponse2<VacanteDetalleDto>) => void;
}

const VacanteDetalleList = ({ vacantesDetalles, setVacantesDetalles}: Props) =>{
    if(vacantesDetalles.content.length === 0) return <p>No se han encontrados detalles de la Vacante</p>

    return (
        <>
            {vacantesDetalles.content.map((vd) => {
                return (
                    <VacanteDetalleCard
                    key={vd.id}
                    vacanteDetalle={vd}
                    paginationVacanteDetalle={vacantesDetalles}
                    setPaginationVacanteDetalle={setVacantesDetalles}
                    />
                );
            })}
        </>
    )
};

export default VacanteDetalleList;