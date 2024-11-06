import { Edit, Trash2 } from "lucide-react";
import { PuestoDto } from "../../lib/api/puesto/puesto.types";
import { Link } from "react-router-dom";
import { deletePuestoById } from "../../lib/api/puesto/puesto.service";
import { useAuth } from "../../context/auth/useContext";
import { toast } from "react-toastify";
import { PaginationResponse2 } from "../../lib/definitions";

type Props = {
    puesto: PuestoDto;
    paginationPuesto: PaginationResponse2<PuestoDto>;
    setPaginationPuesto: (data: PaginationResponse2<PuestoDto>) => void;
}

const PuestoCard = ({ puesto, setPaginationPuesto, paginationPuesto }: Props) => {
  const { session } = useAuth();

  const handleDelete = async (id: number) =>{
    const { success, message } = await deletePuestoById(id, session!.accessToken);
    if(success){
      toast.success(message);
      setPaginationPuesto({
        ...paginationPuesto,
        content: paginationPuesto.content.filter((p) => p.id !== id),
      });
    } else {
      toast.error(message);
    }
  };
  return (
    <div className="d-flex flex-column shadow bg-light-subtle rounded p-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="m-0">{puesto.nombre}</h3>
        <h3 className="m-0">{puesto.sueldo}</h3>
        <div className="d-flex align-items-center gap-2">
          <Link
            title="Editar Puesto"
            to={`/puestos/${puesto.id}/update`}
            className="btn btn-primary"
          >
            <Edit />
          </Link>
          <button
            onClick={async () => await handleDelete(puesto.id)}
            title="Eliminar Puesto"
            type="button"
            className="btn btn-danger"
          >
            <Trash2 />
          </button>
        </div>
      </div>
      <hr className="h-1"></hr>
      <p className="text-xs text-secondary text-end">
        Created at: {new Date(puesto.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default PuestoCard;