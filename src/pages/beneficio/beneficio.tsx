// Beneficio.tsx
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { BeneficioDto, BeneficioFilter } from "../../lib/api/beneficio/beneficio.types";
import { getAllBeneficios as getBeneficios } from "../../lib/api/beneficio/beneficio.service";
import { useAuth } from "../../context/auth/useContext";
import Loading from "../Loading";
import CommonsFilterBar from "../../components/global/CommonsFilterBar";
import { mapUrlSearchParamsToObject } from "../../lib/utils";
import Pagination from "../../components/global/Pagination";
import { PaginationResponse } from "../../lib/definitions";
import BasicSearchBar from "../../components/global/BasicSearchBar";
import { PlusCircle } from "lucide-react";
import BeneficioList from "../../components/beneficio/BeneficioList";

export default function Beneficio() {
  const { isAuth } = useAuth();
  const [params] = useSearchParams();
  const [paginationBeneficio, setPaginationBeneficio] =
    useState<PaginationResponse<BeneficioDto> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const session = isAuth();

  useEffect(() => {
    const fetchBeneficios = async () => {
      const beneficioFilterObj: BeneficioFilter = mapUrlSearchParamsToObject(params);
      const { data, message, success } = await getBeneficios(
        session!.accessToken,
        beneficioFilterObj
      );
      if (!success || !data) {
        alert(message);
      } else {
        setPaginationBeneficio(data);
        setIsLoading(false);
      }
    };
    fetchBeneficios();
  }, [session]);

  if (isLoading) return <Loading />;

  if (!paginationBeneficio)
    return <div className="text-danger">Error obteniendo beneficios</div>;

  return (
    <div className="w-100 py-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Beneficios</h2>
          <Link
            to="/beneficio/create"
            className="d-flex gap-2 align-items-center flex-row btn btn-primary"
          >
            <p className="m-0">Crear</p>
            <PlusCircle size={20} className="text-white" />
          </Link>
        </div>
        <BasicSearchBar
          paramKey="nombre"
          placeholder="Buscar por nombre de beneficio..."
        />
        <CommonsFilterBar />
        <BeneficioList beneficios={paginationBeneficio} setBeneficios={setPaginationBeneficio} />
      </div>
      <Pagination page={paginationBeneficio.page} />
    </div>
  );
}
