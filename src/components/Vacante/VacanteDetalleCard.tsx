import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth/useContext";
import { VacanteDetalleDto } from "../../lib/api/Vacante/vacanteDetalle.types"
import { PaginationResponse2 } from "../../lib/definitions";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getVacanteById } from "../../lib/api/Vacante/Vacante.service";
import { VacanteDto } from "../../lib/api/Vacante/vacante.types";
import { Edit, Trash2 } from "lucide-react";
import { getEmpleadoById } from "../../lib/api/empleado/empleado.service";
import { deleteVacanteDetalleById } from "../../lib/api/Vacante/VacanteDetalle.service";



type Props = {
    vacanteDetalle: VacanteDetalleDto;
    paginationVacanteDetalle: PaginationResponse2<VacanteDetalleDto>;
    setPaginationVacanteDetalle: (data: PaginationResponse2<VacanteDetalleDto>) => void;
}

const VacanteDetalleCard = ({vacanteDetalle, paginationVacanteDetalle, setPaginationVacanteDetalle}: Props) => {
    const { session } = useAuth();
    const { id } = useParams<{id: string}>();
    const navigate = useNavigate();

    const [vacante, setVacante] = useState<VacanteDto>();

    const [encargado, setEncargado] = useState<string | null>(null);



    const [isLoading, setIsLoading] = useState(true);

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
            }
          }
          catch(error){
            alert("Hubo un problema al obtener la vacante.");
            setIsLoading(false);
          }
        };
      
          getVacanteByIdEffect();
      }, [id, session, navigate]);


  console.log(isLoading);


      useEffect(() => {
        const fetchEncargado = async () => {
          try {
            const { data } = await getEmpleadoById(vacanteDetalle.encargado_id, session!.accessToken);
            if (data) {
              setEncargado(data.nombre); 
            } else {
              setEncargado("Empleado no encontrado.");
            }
          } catch (error) {
            setEncargado("Error al cargar el empleado.");
            toast.error("Error al cargar el empleado.");
          }
        };

        fetchEncargado();
  }, [vacanteDetalle.encargado_id, session]);





    const handleDelete = async (id: number) => {
        const { success, message } = await deleteVacanteDetalleById(id, vacante!.id, session!.accessToken);

        

        if (success){
            toast.success(message);
            setPaginationVacanteDetalle({
                ...paginationVacanteDetalle,
                content: paginationVacanteDetalle.content.filter((v) => v.id != id),
            });
            navigate("/vacantes/" + id + "/detalles")
        } else {
            toast.error(message);
        }
    };

    return (
        <div className="d-flex flex-column shadow bg-light-subtle rounded p-3">
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="m-0">Encargado: {encargado || "Cargando Encargado..."}</h3>
                <div className="d-flex align-items-center gap-2">

                    <Link
                        title="Editar Vacante"
                        to={`/vacantes/${id}/detalles/${vacanteDetalle.id}/update`}
                        className="btn btn-primary"
                    >
                    <Edit />
                    </Link>
                    <button
                        onClick={async () => await handleDelete(vacante!.id)}
                        title="Eliminar Vacante"
                        type="button"
                        className="btn btn-danger"
                    >
                    <Trash2 />
                    </button>
                </div>
            </div>
            <h4 className="m-0">CV: {vacanteDetalle.cv || "Cargando CV..."}</h4>
            <hr className="h-1"></hr>
            <h2>Fue Revisado: {vacanteDetalle.fue_revisado ? 'Si' : 'No'}</h2>
            <p className="text-xs text-secondary text-end">
            Created at: {new Date(vacanteDetalle.createdAt).toLocaleString()}
            </p>
        </div>
    );
};

export default VacanteDetalleCard;