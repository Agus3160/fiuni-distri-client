import { Edit, Trash2 } from "lucide-react";
import { RoleDto } from "../../lib/api/rol/rol.types";
import { Link } from "react-router-dom";
import { deleteRolById } from "../../lib/api/rol/rol.service";
import { useAuth } from "../../context/auth/useContext";
import { toast } from "react-toastify";
import { PaginationResponse } from "../../lib/definitions";

type Props = {
  role: RoleDto;
  paginationRole: PaginationResponse<RoleDto>;
  setPaginationRole: (data: PaginationResponse<RoleDto>) => void;
};

const RoleCard = ({ role, setPaginationRole, paginationRole }: Props) => {
  const { session } = useAuth();

  const handleDelete = async (id: number) => {
    const { success, message } = await deleteRolById(id, session!.accessToken);
    if (success) {
      toast.success(message);
      setPaginationRole({
        ...paginationRole,
        content: paginationRole.content.filter((rol) => rol.id !== id),
      });
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="d-flex flex-column shadow bg-light-subtle rounded p-3">
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="m-0">{role.rol}</h3>
        <div className="d-flex align-items-center gap-2">
          <Link
            title="Editar rol"
            to={`/role/update/${role.id}`}
            className="btn btn-primary"
          >
            <Edit />
          </Link>
          <button
            onClick={async () => await handleDelete(role.id)}
            title="Eliminar rol"
            type="button"
            className="btn btn-danger"
          >
            <Trash2 />
          </button>
        </div>
      </div>
      <hr className="h-1"></hr>
      <p className="text-xs text-secondary text-end">
        Created at: {new Date(role.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default RoleCard;
