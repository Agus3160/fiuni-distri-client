import { toast } from "react-toastify";
import { useAuth } from "../../context/auth/useContext";
import { VacanteDto } from "../../lib/api/Vacante/vacante.types"
import { PaginationResponse2 } from "../../lib/definitions";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Trash2, Eye } from "lucide-react";
import { deleteVacanteById } from "../../lib/api/Vacante/Vacante.service";
import { getPuestoById } from "../../lib/api/puesto/puesto.service";
import { useEffect, useState } from "react";


type Props = {
    vacante: VacanteDto;
    paginationVacante: PaginationResponse2<VacanteDto>;
    setPaginationVacante: (data: PaginationResponse2<VacanteDto>) => void;

}

const VacanteCard = ({vacante, setPaginationVacante, paginationVacante }: Props) =>{

  
  const { session } = useAuth();


  const [puestoNombre, setPuestoNombre] = useState<string | null>(null);

  useEffect(() => {
    const fetchPuesto = async () => {
      try {
        const { data } = await getPuestoById(vacante.puesto_id, session!.accessToken);
        if (data) {
          setPuestoNombre(data.nombre); 
        } else {
          setPuestoNombre("Puesto no encontrado");
        }
      } catch (error) {
        setPuestoNombre("Error al cargar puesto");
        toast.error("Error al cargar el puesto.");
      }
    };

    fetchPuesto();
  }, [vacante.puesto_id, session]);





  const handleDelete = async (id: number) =>{
    const { success, message } = await deleteVacanteById(id, session!.accessToken);
    const navigate = useNavigate();
    if(success){
      toast.success(message);
      setPaginationVacante({
        ...paginationVacante,
        content: paginationVacante.content.filter((p) => p.id !== id),
      });
      navigate("/vacantes");
    } else {
      toast.error(message);
    }
  };
    return (
        <div className="d-flex flex-column shadow bg-light-subtle rounded p-3">
            <div className="d-flex justify-content-between align-items-center">
                <h3 className="m-0">{vacante.descripcion}</h3>
                <div className="d-flex align-items-center gap-2">
                    <Link
                        title="Detalles de la vacante"
                        to={`/vacantes/${vacante.id}/detalles`}
                        className="btn btn-info"
                    >
                      <Eye className="text-white"/>
                    </Link>

                    <Link
                        title="Editar Vacante"
                        to={`/vacantes/${vacante.id}/update`}
                        className="btn btn-primary"
                    >
                    <Edit />
                    </Link>
                    <button
                        onClick={async () => await handleDelete(vacante.id)}
                        title="Eliminar Vacante"
                        type="button"
                        className="btn btn-danger"
                    >
                    <Trash2 />
                    </button>
                </div>
            </div>
            <hr className="h-1"></hr>
            <h2>Puesto: {puestoNombre || "Cargando puesto..."}</h2>
            <h5>Disponble: {vacante.esta_disponible ? 'Si' : 'No'}</h5>
            <p className="text-xs text-secondary text-end">
            Created at: {new Date(vacante.createdAt).toLocaleString()}
            </p>
        </div>
  );
};

export default VacanteCard;
