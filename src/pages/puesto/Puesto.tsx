import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { PuestoDto, PuestoFilter } from '../../lib/api/puesto/puesto.types';
import { getPuestos } from "../../lib/api/puesto/puesto.service";
import { useAuth } from "../../context/auth/useContext";
import Loading from "../Loading";
import CommonsFilterBar from "../../components/global/CommonsFilterBar";
import { mapUrlSearchParamsToObject } from "../../lib/utils";
import { PaginationResponse2 } from "../../lib/definitions";
import BasicSearchBar from "../../components/global/BasicSearchBar";
import { PlusCircle } from "lucide-react";
import PuestoList from "../../components/puesto/PuestoList";


export default function Puesto(){
    const { isAuth } = useAuth();

    const navigate = useNavigate();``
    const [params] = useSearchParams();
    const [paginationPuesto, setPaginationPuesto] = 
      useState<PaginationResponse2<PuestoDto> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const session = isAuth();

    useEffect(() => {
        const getPuestoByIDEffect = async () => {
          const puestoFilterObj: PuestoFilter = mapUrlSearchParamsToObject(params);
          const { data, message, success } = await getPuestos(
            session!.accessToken,
            puestoFilterObj
          );

          

          if (!success || !data) {
            alert(message);
          } else {
            setPaginationPuesto(data);
            setIsLoading(false);
          }
        };
        getPuestoByIDEffect();
    }, [session, navigate]);

    if (isLoading) return <Loading />;

    if (!paginationPuesto) 
      return <div className="text-danger">Error obteniendo puestos</div>;

    return (
        <div className="w-100 pt-5 h-full bg-dark">
          <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Puestos</h2>
              <Link
                to="/puestos/create"
                className="d-flex gap-2 align-items-center flex-row btn btn-primary"
              >
                <p className="m-0">Crear</p>
                <PlusCircle size={20} className="text-white" />
              </Link>
            </div>
            <BasicSearchBar
              paramKey="buscar"
              placeholder="Buscar por nombre de puesto..."
            />
            <CommonsFilterBar />
            
            <PuestoList puestos={paginationPuesto} setPuestos={setPaginationPuesto}/>
          </div>
        </div>
      );

}