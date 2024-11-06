import { PaginationResponse } from "../../lib/definitions";
import { RoleDto } from "../../lib/api/rol/rol.types";
import RoleCard from "./RoleCard";

type Props = {
  roles: PaginationResponse<RoleDto>;
  setRoles: (data: PaginationResponse<RoleDto>) => void;
};

const RoleList = ({ roles, setRoles }: Props) => {
  if (roles.content.length === 0) return <p>No se han encontrado Roles</p>;
  return (
    <>
      {roles.content.map((rol) => (
        <RoleCard
          key={rol.id}
          role={rol}
          paginationRole={roles}
          setPaginationRole={setRoles}
        />
      ))}
    </>
  );
};

export default RoleList;
