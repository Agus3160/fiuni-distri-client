import { PlusCircle } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import VacanteList from "../../components/Vacante/VacanteList";
import { useAuth } from "../../context/auth/useContext";
import { useEffect, useState } from "react";
import { PaginationResponse2 } from "../../lib/definitions";
import { VacanteDto, VacanteFilter } from "../../lib/api/Vacante/vacante.types";
import { mapUrlSearchParamsToObject } from "../../lib/utils";
import Loading from "../Loading";
import { getVacantes } from "../../lib/api/Vacante/Vacante.service";

export default function Vacante() {
  const { isAuth } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [paginationVacante, setPaginationVacante] = useState<PaginationResponse2<VacanteDto> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const session = isAuth();

  useEffect(() => {
    if (!session) {
      navigate("/login"); 
      return;
    }

    const getVacantesByIdEffect = async () => {
      try {
        const vacanteFilterObj: VacanteFilter = mapUrlSearchParamsToObject(params);

        const { data, message, success } = await getVacantes(
          session!.accessToken,
          vacanteFilterObj
        );

        if (!success || !data) {
          alert(message);
        } else {
          setPaginationVacante(data);
          setIsLoading(false);
        }
      } catch (error) {
        alert("Hubo un problema al obtener las vacantes.");
        setIsLoading(false);
      }
    };

    getVacantesByIdEffect();
  }, [params, session, navigate]);

  if (isLoading) return <Loading />;

  if (!paginationVacante)
    return <div className="text-danger">Error obteniendo vacantes</div>;

  return (
    <div className="w-100 pt-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Vacantes</h2>
          <Link
            to="/vacantes/create"
            className="d-flex gap-2 align-items-center flex-row btn btn-primary"
          >
            <p className="m-0">Crear</p>
            <PlusCircle size={20} className="text-white" />
          </Link>
        </div>
        <VacanteList vacantes={paginationVacante} setVacantes={setPaginationVacante} />
      </div>
    </div>
  );
}
