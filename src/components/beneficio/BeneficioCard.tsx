import { Edit, Trash2 } from "lucide-react";
import { BeneficioDto } from "../../lib/api/beneficio/beneficio.types";  // Cambio a BeneficioDto
import { Link } from "react-router-dom";
import { deleteBeneficioById } from "../../lib/api/beneficio/beneficio.service"; // Cambié a la función de Beneficio
import { useAuth } from "../../context/auth/useContext";
import { toast } from "react-toastify";
import { PaginationResponse } from "../../lib/definitions";

type Props = {
  beneficio: BeneficioDto;  // Cambio de role a beneficio
  paginationBeneficio: PaginationResponse<BeneficioDto>;  // Cambio a BeneficioDto
  setPaginationBeneficio: (data: PaginationResponse<BeneficioDto>) => void; // Cambié el nombre a setPaginationBeneficio
};

const BeneficioCard = ({ beneficio, setPaginationBeneficio, paginationBeneficio }: Props) => {
  const { session } = useAuth();

  const handleDelete = async (id: number) => {
    const { success, message } = await deleteBeneficioById(id, session!.accessToken);
    if (success) {
      toast.success(message);
      setPaginationBeneficio({
        ...paginationBeneficio,
        content: paginationBeneficio.content.filter((beneficio) => beneficio.id !== id),
      });
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="d-flex flex-column shadow bg-light-subtle rounded p-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="m-0">{beneficio.nombre}</h3>  
        <div className="d-flex align-items-center gap-2">
          <Link
            title="Editar beneficio"
            to={`/beneficio/update/${beneficio.id}`}  
            className="btn btn-primary"
          >
            <Edit />
          </Link>
          <button
            onClick={async () => await handleDelete(beneficio.id)}  // Cambio a beneficio.id
            title="Eliminar beneficio"
            type="button"
            className="btn btn-danger"
          >
            <Trash2 />
          </button>
        </div>
      </div>
      <hr className="h-1"></hr>
      <p className="text-xs text-secondary text-end">
        Activo: {beneficio.activo ? 'Sí' : 'No'} 
      </p>
      <p className="text-xs text-secondary text-end">
        Fecha de inicio: {new Date(beneficio.fecha_inicio).toLocaleString()} 
      </p>
      {beneficio.fecha_fin && 
      <p className="text-xs text-secondary text-end">
        Fecha de fin: {new Date(beneficio.fecha_fin).toLocaleString()} 
      </p>}
      <p className="text-xs text-secondary text-end">
        Porcentaje de sueldo: {beneficio.porcentaje_de_sueldo}% 
      </p>
    </div>
  );
};

export default BeneficioCard;
