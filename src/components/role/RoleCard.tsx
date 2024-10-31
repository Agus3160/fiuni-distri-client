import { RoleDto } from "../../lib/api/rol/rol.types";

type Props = {
  role: RoleDto;
};

const RoleCard = ({ role }: Props) => {
  return (
    <div className="d-flex flex-column shadow bg-light-subtle rounded p-3">
      <h2 className="m-0">{role.rol}</h2>
      <hr className="h-1"></hr>
      <p className="text-xs text-secondary text-end">
        Created at: {new Date(role.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default RoleCard;
