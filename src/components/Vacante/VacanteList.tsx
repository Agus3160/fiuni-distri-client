import { VacanteDto } from "../../lib/api/Vacante/vacante.types";
import { PaginationResponse2 } from "../../lib/definitions";
import VacanteCard from "./VacanteCard";

type Props = {
  vacantes: PaginationResponse2<VacanteDto>;
  setVacantes: (data: PaginationResponse2<VacanteDto>) => void;
}

const VacanteList = ({ vacantes, setVacantes }: Props) => {

  if (vacantes.content.length === 0) return <p>No se han encontrado Vacantes</p>;

  return (
    <>
      {vacantes.content.map((v) => {
        return (
          <VacanteCard
            key={v.id}
            vacante={v}
            paginationVacante={vacantes}
            setPaginationVacante={setVacantes}
          />
        );
      })}
    </>
  );
};

export default VacanteList;