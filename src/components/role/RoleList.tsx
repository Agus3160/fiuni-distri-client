import { PaginationResponse } from "../../lib/definitions";
import { RoleDto } from "../../lib/api/rol/rol.types";
import RoleCard from "./RoleCard";
import { useAuth } from "../../context/auth/useContext";
import { deleteRolById } from "../../lib/api/rol/rol.service";
import { toast } from "react-toastify";

type Props = {
  roles: PaginationResponse<RoleDto>;
  setRoles: (data: PaginationResponse<RoleDto>) => void;
};

const RoleList = ({ roles, setRoles }: Props) => {
  const { session } = useAuth();

  if (roles.content.length === 0) return <p>No se han encontrado Roles</p>;

  const handleDelete = (id: number) => {
    return async () => {
      const { success } = await deleteRolById(id, session!.accessToken);
      if (success) {
        setRoles({
          ...roles,
          content: roles.content.filter((rol) => rol.id !== id),
        });
        toast.success("Rol Eliminado");
      } else {
        toast.error("Error al eliminar el Rol");
      }
    };
  };

  return (
    <>
      {roles.content.map((rol) => (
        <RoleCard key={rol.id} role={rol} handleDelete={handleDelete(rol.id)} />
      ))}
    </>
  );
};

export default RoleList;
