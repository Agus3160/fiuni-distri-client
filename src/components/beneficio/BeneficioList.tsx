import { PaginationResponse } from "../../lib/definitions";
import { BeneficioDto } from "../../lib/api/beneficio/beneficio.types";
import BeneficioCard from "./BeneficioCard";

type Props = {
  beneficios: PaginationResponse<BeneficioDto>;
  setBeneficios: (data: PaginationResponse<BeneficioDto>) => void;
};

const BeneficioList = ({ beneficios, setBeneficios }: Props) => {
  if (beneficios.content.length === 0) return <p>No se han encontrado Beneficios</p>;

  return (
    <>
      {beneficios.content.map((beneficio) => (
        <BeneficioCard
          key={beneficio.id}
          beneficio={beneficio}
          paginationBeneficio={beneficios}
          setPaginationBeneficio={setBeneficios}
        />
      ))}
    </>
  );
};

export default BeneficioList;
