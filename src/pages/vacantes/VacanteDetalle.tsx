import { ChevronLeft, PlusCircle } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth/useContext";
import { useEffect, useState } from "react";
import { VacanteDetalleDto } from "../../lib/api/Vacante/vacanteDetalle.types";
import { PaginationResponse2 } from "../../lib/definitions";
import { VacanteDto } from "../../lib/api/Vacante/vacante.types";
import { getVacanteById } from "../../lib/api/Vacante/Vacante.service";
import Loading from "../Loading";
import { getVacanteDetalles } from "../../lib/api/Vacante/VacanteDetalle.service";
import VacanteDetalleList from "../../components/Vacante/VacanteDetalleList";



export default function VacanteDetalle() {
  const { isAuth } = useAuth();
  const navigate = useNavigate(); 
  const { id } = useParams<{id: string}>()
  
  const [vacante, setVacante] = useState<VacanteDto>();
  const [paginationVacanteDetalle, setPaginationVacanteDetalle] = useState<PaginationResponse2<VacanteDetalleDto> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ isLoadingVacante, setIsLoadingVacante] = useState(true);
  const session = isAuth();
  
  useEffect(() => {
  if (!id || Number.isNaN(parseInt(id))) {
    navigate("/vacantes"); 
    return;
  }

  const getVacanteByIdEffect = async () => {
    try{
      const {data, message, success} = await getVacanteById(parseInt(id), session!.accessToken);
      
      if(!success || !data){
        alert(message);
      }else{
        setVacante(data);
        setIsLoading(false);
        setIsLoadingVacante(false);
      }
    }
    catch(error){
      alert("Hubo un problema al obtener la vacante.");
      setIsLoading(false);
      setIsLoadingVacante(false)
    }
  };

    getVacanteByIdEffect();
}, [id, session, navigate]);

useEffect(() => {
  if(isLoadingVacante) return;
  const getVacantesDetallesEffect = async () => {
    try{
      const { data, message, success} = await getVacanteDetalles(
        session!.accessToken,
        vacante!.id
      );
      if (!success || !data){
        alert(message);
      }else{
        setPaginationVacanteDetalle(data);
        setIsLoading(false);
      }
    }catch(error){
      alert("Hubo un problema al obtener los detalles");
      setIsLoading(false);
    }
  
  };
  getVacantesDetallesEffect();
}, [isLoadingVacante]);

  if (isLoading) return <Loading/>;

  if (!paginationVacanteDetalle)
    return <div className="text-danger">Error obteniendo detalles de la vacante</div>;
  
  return (
    <div className="w-100 pt-5 h-full bg-dark">
      <div className="container h-100 d-flex gap-3 flex-column justify-content-center ">
        <div className="d-flex justify-content-between align-items-center">
          <Link to={"/vacantes"}>
            <ChevronLeft />
          </Link>
          <h3>Detalles de la vacante: {vacante?.descripcion}</h3>
          <Link
            to={`/vacantes/${id}/detalles/create`}
            className="d-flex gap-2 align-items-center flex-row btn btn-primary"
          >
            <p className="m-0">Crear</p>
            <PlusCircle size={20} className="text-white" />
          </Link>
        </div>
        <VacanteDetalleList vacantesDetalles={paginationVacanteDetalle} setVacantesDetalles={setPaginationVacanteDetalle}/>
      </div>
    </div>
)}