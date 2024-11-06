import { PaginationResponse2 } from "../../lib/definitions";
import { PuestoDto } from "../../lib/api/puesto/puesto.types";
import PuestoCard from "./PuestoCard";

type Props = {
    puestos: PaginationResponse2<PuestoDto>;
    setPuestos: (data: PaginationResponse2<PuestoDto>) => void;
};

const PuestoList = ({puestos, setPuestos }: Props) => {
    if (puestos.content.length === 0) return <p>No se han encontrado Puestos</p>;
    return (
        <>
            {puestos.content.map((p) =>(
                <PuestoCard
                    key={p.id}
                    puesto={p}
                    paginationPuesto={puestos}
                    setPaginationPuesto={setPuestos}  
                />
            ))}
        </>
    );
};

export default PuestoList;
